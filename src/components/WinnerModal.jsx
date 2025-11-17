import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import useAPI from "../hooks/useAPI";
import styled from "styled-components";
import formatTime from "../utils/formatTime";

export default function WinnerModal({ time, mode, timerMode }) {
    const { createRecord } = useAPI();
    const navigate = useNavigate();
    const [name, setName] = useState("");

    return ReactDOM.createPortal(
        <Overlay>
            <ModalBox onClick={(e) => e.stopPropagation()}>
                <h2>You have found all characters!</h2>
                {time !== "00:00:00" && (
                    <p>
                        You've made it in <strong>{formatTime(time)}</strong>
                    </p>
                )}
                {timerMode && (
                    <form
                        onSubmit={() => {
                            createRecord({ mode, name, time }), navigate("/");
                        }}
                    >
                        <RecordInput
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Your name here"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <RecordSubmitBtn type="submit">
                            Post your record
                        </RecordSubmitBtn>
                    </form>
                )}

                <RestartButton type="button" onClick={() => navigate("/")}>
                    Restart
                </RestartButton>
            </ModalBox>
        </Overlay>,
        document.body
    );
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`;

const ModalBox = styled.div`
    background: #000000;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const RecordInput = styled.input`
    padding: 0.5rem;
    font-size: 1rem;
    background-color: #272727;
    color: white;
    border: none;
    border-radius: 5px 0 0 5px;
    text-align: center;

    @media (max-width: 400px) {
        font-size: 0.8rem;
        padding: 0.2rem;
        border-radius: 5px;
    }
`;

const RecordSubmitBtn = styled.button`
    border: none;
    border-radius: 0 5px 5px 0;
    padding: 0.5rem;
    font-size: 1rem;
    font-weight: 700;
    background-color: #a5a5f5;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: white;
        color: black;
    }

    @media (max-width: 400px) {
        font-weight: 500;
        font-size: 0.8rem;
        padding: 0.2rem;
        border-radius: 5px;
    }
`;

const RestartButton = styled.button`
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

    @media (max-width: 400px) {
        font-size: 0.8rem;
        padding: 0.2rem 0.5rem;
    }
`;
