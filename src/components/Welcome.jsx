import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import mainImg from "../assets/main.jpg";
import { useEffect } from "react";

export default function Welcome({ setMode, setTimerMode }) {
    const navigate = useNavigate();

    useEffect(() => {
        setMode("wally");
        setTimerMode(false);
    }, []);

    return (
        <>
            <Background>
                <BackgroundImg
                    src={mainImg}
                    alt="background image"
                    loading="lazy"
                />
                <Overlay />
            </Background>
            <Container>
                <Menu>
                    <Title>Photo tagging game</Title>
                    <fieldset onChange={(e) => setMode(e.target.value)}>
                        <legend>Choose set of characters</legend>

                        <RadioContainer>
                            <input
                                type="radio"
                                name="mode"
                                id="wally"
                                value="wally"
                                defaultChecked
                            />
                            <label htmlFor="wally">Where's Wally</label>
                        </RadioContainer>

                        <RadioContainer>
                            <input
                                type="radio"
                                name="mode"
                                id="simpsons"
                                value="simpsons"
                            />
                            <label htmlFor="simpsons">Simpsons</label>
                        </RadioContainer>

                        <RadioContainer>
                            <input
                                type="radio"
                                name="mode"
                                id="futurama"
                                value="futurama"
                            />
                            <label htmlFor="futurama">Futurama</label>
                        </RadioContainer>

                        <RadioContainer>
                            <input
                                type="radio"
                                name="mode"
                                id="tmnt"
                                value="tmnt"
                            />
                            <label htmlFor="tmnt">TNMT</label>
                        </RadioContainer>
                    </fieldset>
                    <TimerContainer>
                        <input
                            type="checkbox"
                            name="timerMode"
                            id="timerMode"
                            onChange={(e) => setTimerMode(e.target.checked)}
                        />
                        <label htmlFor="timerMode">Timer</label>
                    </TimerContainer>
                    <StyledButton
                        type="button"
                        onClick={() => navigate("/game")}
                    >
                        Start
                    </StyledButton>
                    <StyledButton
                        type="button"
                        onClick={() => navigate("/leaderboards")}
                    >
                        Leaderboards
                    </StyledButton>
                </Menu>
                <Credits>
                    <p>
                        Game Creator{" "}
                        <a href="http://github.com/KVG24" target="_blank">
                            KVG24
                        </a>
                    </p>
                    <p>
                        Picture creator{" "}
                        <a
                            href="https://www.reddit.com/user/TheCartoonRay/"
                            target="_blank"
                        >
                            u/TheCartoonRay
                        </a>
                    </p>
                    <p>
                        <a
                            href="https://github.com/KVG24/photo-tagging-app"
                            target="_blank"
                        >
                            GitHub
                        </a>{" "}
                        of this page
                    </p>
                </Credits>
            </Container>
        </>
    );
}

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
`;

const BackgroundImg = styled.img`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(8px);
    z-index: -2;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000090;
    z-index: -1;
`;

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #00000083;
    padding: 2rem;
    border-radius: 10px;

    & label {
        font-size: 1.2rem;
    }

    & input[type="radio"] {
        width: 20px;
        height: 20px;
    }

    & input[type="checkbox"] {
        width: 20px;
        height: 20px;
    }
`;

const RadioContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Title = styled.h1`
    text-align: center;

    @media (max-width: 500px) {
        font-size: 1.3rem;
    }
`;

const TimerContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
`;

const StyledButton = styled.button`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #a5a5f5;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-weight: 900;

    &:hover {
        background-color: #58589c;
        color: white;
    }
`;

const Credits = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #a5a5f5;
    color: black;
    padding: 0.5rem;
    border-radius: 5px 5px 0 0;
    font-weight: 500;
    text-align: center;

    & a {
        color: #a5a5f5;
        background-color: #000000;
        text-decoration: none;
        padding: 0 0.5rem 0 0.5rem;

        &:hover {
            color: #ffffff;
        }
    }

    @media (max-width: 550px) {
        font-size: 0.7rem;
    }
`;
