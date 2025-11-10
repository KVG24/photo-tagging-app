import { useRef, useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styled from "styled-components";
import mainImg from "../assets/main.jpg";
import WinnerModal from "./WinnerModal";
import characters from "../data/characters";
import HUD from "./HUD";

export default function Game({ mode }) {
    const imgRef = useRef(null);
    const [win, setWin] = useState(false);
    const [charactersList, setCharactersList] = useState([]);
    const [foundCharacters, setFoundCharacters] = useState([]);

    // populate charactersList based on chosen game mode
    const groups = {
        wally: [0, 1, 2, 3],
        simpsons: [4, 5, 6, 7, 8],
        tmnt: [9, 10, 11, 12],
        futurama: [13, 14, 15],
    };

    useEffect(() => {
        if (groups[mode]) {
            setCharactersList(groups[mode].map((i) => characters[i]));
        }
    }, [mode]);

    // click handling functions
    function checkClick(x, y, maxX, minX, maxY, minY) {
        return x <= maxX && x >= minX && y <= maxY && y >= minY;
    }

    function findClickedCharacter(x, y) {
        for (const c in charactersList) {
            const { maxX, minX, maxY, minY } = charactersList[c];
            if (checkClick(x, y, maxX, minX, maxY, minY)) {
                setFoundCharacters((prev) =>
                    prev.some((fc) => fc.name === charactersList[c].name) // avoid adding duplicates
                        ? prev
                        : [...prev, charactersList[c]]
                );
            }
        }
        return null;
    }

    const handleClick = (e) => {
        const img = imgRef.current;
        if (!img) return;

        const rect = img.getBoundingClientRect(); // get position and size of image

        // get clicked location on the image
        const clickedX = e.clientX - rect.left;
        const clickedY = e.clientY - rect.top;

        // get ratio between natural and displayed image size
        const ratioX = img.naturalWidth / rect.width;
        const ratioY = img.naturalHeight / rect.height;

        // final coordinates of the click in pixels
        const x = Math.round(clickedX * ratioX);
        const y = Math.round(clickedY * ratioY);

        // console.log("Coordinates:", x, y);

        findClickedCharacter(x, y);
    };

    // finish if all characters found
    useEffect(() => {
        if (
            charactersList.length > 0 &&
            foundCharacters.length === charactersList.length
        ) {
            setWin(true);
        }
    }, [foundCharacters, charactersList]);

    return (
        <>
            <HUD
                characters={charactersList}
                foundCharacters={foundCharacters}
            />
            <Container onClick={handleClick}>
                <TransformWrapper
                    initialScale={Math.max(
                        window.innerWidth / 4000,
                        window.innerHeight / 3000
                    )}
                    minScale={0.3}
                    maxScale={5}
                    wheel={{ step: 0.1 }}
                    pinch={{ step: 0.1 }}
                    doubleClick={{ disabled: true }}
                    panning={{ velocityDisabled: true }}
                    centerOnInit={true}
                >
                    <TransformComponent
                        wrapperStyle={{
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <StyledImg
                            ref={imgRef}
                            src={mainImg}
                            alt="Image with cartoon characters"
                            draggable={false}
                        />
                    </TransformComponent>
                </TransformWrapper>
            </Container>
            {win && <WinnerModal />}
        </>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: black;
    cursor: crosshair;
`;

const StyledImg = styled.img`
    width: 4000px;
    height: 3000px;
    object-fit: contain;
    user-select: none;
    cursor: crosshair;
`;
