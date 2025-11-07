import { useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styled from "styled-components";
import mainImg from "../assets/main.jpg";
import WinnerModal from "./WinnerModal";
import characters from "../data/characters";

export default function Game() {
    const imgRef = useRef(null);
    const [win, setWin] = useState(false);

    function checkClick(x, y, character) {
        return (
            x <= character.maxX &&
            x >= character.minX &&
            y <= character.maxY &&
            y >= character.minY
        );
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

        // final coordinated of the click in pixels
        const x = Math.round(clickedX * ratioX);
        const y = Math.round(clickedY * ratioY);

        console.log("Coordinates:", x, y);

        if (checkClick(x, y, characters.wally)) {
            setWin(true);
        }
    };

    return (
        <>
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
`;

const StyledImg = styled.img`
    width: 4000px;
    height: 3000px;
    object-fit: contain;
    user-select: none;
    cursor: crosshair;
`;
