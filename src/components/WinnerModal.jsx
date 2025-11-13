import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";

export default function WinnerModal({ time }) {
    const navigate = useNavigate();

    return ReactDOM.createPortal(
        <Overlay>
            <ModalBox onClick={(e) => e.stopPropagation()}>
                <h2>You have found all characters!</h2>
                {time && (
                    <p>
                        You've made it in <strong>{time}</strong>
                    </p>
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
`;
