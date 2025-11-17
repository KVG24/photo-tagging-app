import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import formatTime from "../utils/formatTime";

export default function HUD({ characters, foundCharacters, time }) {
    const navigate = useNavigate();

    return (
        <>
            <Container>
                <CharContainer>
                    {characters &&
                        characters.map((character, index) => {
                            // check if character's name present in "foundCharacters" array
                            // and paint his background green if found
                            const isFound = foundCharacters.some(
                                (fc) => fc.name === character.name
                            );

                            return (
                                <CharacterDiv key={index} $found={isFound}>
                                    <img
                                        src={`src/assets/characters_png/${character.img}`}
                                        alt={character.name}
                                    />
                                    <p>{character.name}</p>
                                </CharacterDiv>
                            );
                        })}
                </CharContainer>
                {formatTime(time) !== "00:00:00" && (
                    <Timer>{formatTime(time)}</Timer>
                )}
            </Container>
            <RestartBtn onClick={() => navigate("/")}>RESTART</RestartBtn>
        </>
    );
}

const Container = styled.div`
    position: absolute;
    top: 0.2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    background-color: #000000d1;
    border-radius: 10px;
    padding: 0.5rem;
`;

const CharContainer = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const Timer = styled.p`
    text-align: center;
`;

const CharacterDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 0.2rem;
    background-color: ${({ $found }) => ($found ? "#0b721c" : "transparent")};

    & img {
        width: auto;
        height: 60px;
    }

    & p {
        font-size: 0.8rem;
    }
`;

const RestartBtn = styled.button`
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #d63030;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-weight: 900;
    z-index: 5;
    border: 3px solid white;

    &:hover {
        background-color: white;
        color: #d63030;
    }
`;
