import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import mainImg from "../assets/main.jpg";
import { useEffect } from "react";

export default function Welcome({ setMode }) {
    const navigate = useNavigate();

    useEffect(() => {
        setMode("wally");
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
                <h1>Photo tagging game</h1>
                <fieldset onChange={(e) => setMode(e.target.value)}>
                    <legend>Choose set of characters</legend>

                    <div>
                        <input
                            type="radio"
                            name="mode"
                            id="wally"
                            value="wally"
                            defaultChecked
                        />
                        <label htmlFor="wally">Where's Wally</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name="mode"
                            id="simpsons"
                            value="simpsons"
                        />
                        <label htmlFor="simpsons">Simpsons</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name="mode"
                            id="futurama"
                            value="futurama"
                        />
                        <label htmlFor="futurama">Futurama</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name="mode"
                            id="tmnt"
                            value="tmnt"
                        />
                        <label htmlFor="tmnt">
                            Teenage Mutant Ninja Turtles
                        </label>
                    </div>
                </fieldset>
                <StyledButton type="button" onClick={() => navigate("/game")}>
                    Start
                </StyledButton>
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
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #00000083;
    padding: 2rem;
    border-radius: 10px;
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
