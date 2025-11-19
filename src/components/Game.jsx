import { useRef, useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useFetch from "../hooks/useFetch";
import styled from "styled-components";
import mainImg from "../assets/main.jpg";
import WinnerModal from "./WinnerModal";
import HUD from "./HUD";
import formatTime from "../utils/formatTime";
import BackgroundComponent from "./BackgroundComponent";
import Loading from "./Loading";
const API_URL = import.meta.env.VITE_API_URL;

export default function Game({ mode, timerMode }) {
    const imgRef = useRef(null);
    const [win, setWin] = useState(false);
    const [charactersList, setCharactersList] = useState([]);
    const [foundCharacters, setFoundCharacters] = useState([]);
    const [tooltip, setTooltip] = useState({ x: 0, y: 0, visible: false });
    const [isDragging, setIsDragging] = useState(false);
    const [wrongCharacter, setWrongCharacter] = useState(null);
    const [showWarning, setShowWarning] = useState(false);
    const [time, setTime] = useState(0);
    const [runningTimer, setRunningTimer] = useState(false);
    const {
        data: characters,
        loading,
        error,
    } = useFetch(`${API_URL}/characters`);

    // timer functionality
    useEffect(() => {
        timerMode ? setRunningTimer(true) : setRunningTimer(false);
    }, [timerMode]);

    useEffect(() => {
        let interval;
        if (runningTimer) {
            interval = setInterval(() => {
                setTime((prev) => prev + 10); // update every 10ms
            }, 10);
        }
        return () => clearInterval(interval);
    }, [runningTimer]);

    // populate charactersList based on chosen game mode
    const groups = {
        wally: [0, 1, 2, 3],
        simpsons: [4, 5, 6, 7, 8],
        tmnt: [9, 10, 11, 12],
        futurama: [13, 14, 15],
    };

    useEffect(() => {
        if (characters && groups[mode]) {
            setCharactersList(groups[mode].map((i) => characters[i]));
        }
    }, [mode, characters]);

    // click handling functions
    function checkClick(x, y, maxX, minX, maxY, minY) {
        return x <= maxX && x >= minX && y <= maxY && y >= minY;
    }

    const handleClick = (e) => {
        if (isDragging) {
            return;
        }

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

        setTooltip({ x, y, visible: true });
    };

    const handleTooltipClick = (e, character) => {
        e.stopPropagation();

        const { maxX, minX, maxY, minY } = character;
        if (checkClick(tooltip.x, tooltip.y, maxX, minX, maxY, minY)) {
            setFoundCharacters((prev) =>
                prev.some((fc) => fc.name === character.name) // avoid adding duplicates
                    ? prev
                    : [...prev, character]
            );
        } else {
            setWrongCharacter(character.name); // set clicked character as "wrong" for animation use
            setTimeout(() => setWrongCharacter(null), 500); // clear state
        }
    };

    // finish if all characters found
    useEffect(() => {
        if (
            charactersList.length > 0 &&
            foundCharacters.length === charactersList.length
        ) {
            setWin(true);
            setRunningTimer(false);
        }
    }, [foundCharacters, charactersList]);

    // server loading warning
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWarning(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (loading)
        return (
            <>
                <InfoDiv>
                    <BackgroundComponent />
                    <Loading />
                    {showWarning && (
                        <div>
                            <p>Staring server</p>
                            <p> Might take around 15 seconds</p>
                        </div>
                    )}
                </InfoDiv>
            </>
        );

    if (error) {
        return (
            <>
                <InfoDiv>
                    <BackgroundComponent />
                    <p>Server failure</p>
                    <p>Error: {error}</p>
                    <a href="/">Back</a>
                </InfoDiv>
            </>
        );
    }

    return (
        <>
            <HUD
                characters={charactersList}
                foundCharacters={foundCharacters}
                time={formatTime(time)}
            />
            <Container
                onMouseDown={() => setIsDragging(false)}
                onMouseMove={() => setIsDragging(true)}
                onClick={handleClick}
            >
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
                        {tooltip.visible && (
                            <Tooltip
                                style={{
                                    left: tooltip.x + 50,
                                    top: tooltip.y - 50,
                                }}
                            >
                                {charactersList.map((character, index) => {
                                    // check if character's name present in "foundCharacters" array
                                    // and paint his background green if found
                                    const isFound = foundCharacters.some(
                                        (fc) => fc.name === character.name
                                    );
                                    // check if clicked character is wrong to play shake animation
                                    const isWrong =
                                        wrongCharacter === character.name;
                                    return (
                                        <CharDiv
                                            key={index}
                                            onClick={(e) =>
                                                handleTooltipClick(e, character)
                                            }
                                            $found={isFound}
                                            $wrong={isWrong}
                                        >
                                            <CharName>
                                                {character.name}
                                            </CharName>
                                        </CharDiv>
                                    );
                                })}
                            </Tooltip>
                        )}
                    </TransformComponent>
                </TransformWrapper>
            </Container>
            {win && (
                <WinnerModal time={time} mode={mode} timerMode={timerMode} />
            )}
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

const Tooltip = styled.div`
    background-color: #000000c0;
    position: absolute;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
`;

const CharDiv = styled.div`
    padding: 0.2rem 0.5rem;
    text-align: center;
    border-radius: 5px;
    background-color: ${({ $found }) => ($found ? "#0b721c94" : "transparent")};
    border: ${({ $found }) =>
        $found ? "2px solid #62e478" : "2px solid #ffffff"};
    color: ${({ $found }) => ($found ? "#65ff7f" : "#ffffffd5")};

    transition: all 0.2s;

    &:hover {
        background-color: #575757;
    }

    ${({ $wrong }) =>
        $wrong &&
        `
    animation: shake 0.3s;
    border: 2px solid red;
  `}

    @keyframes shake {
        0% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(-10px);
        }
        50% {
            transform: translateX(10px);
        }
        75% {
            transform: translateX(-5px);
        }
        100% {
            transform: translateX(0);
        }
    }
`;

const CharName = styled.p`
    font-size: 2rem;
`;

const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    text-align: center;

    & a {
        background-color: #a5a5f5;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        text-decoration: none;
        color: black;
    }
`;
