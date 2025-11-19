import styled from "styled-components";

export default function Loading() {
    return (
        <>
            <Loader />
        </>
    );
}

const Loader = styled.div`
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 8px solid #a5a5f5;
    animation: spin-1 0.8s infinite linear alternate,
        spin-2 1.6s infinite linear;

    @keyframes spin-1 {
        0% {
            clip-path: polygon(
                50% 50%,
                0 0,
                50% 0%,
                50% 0%,
                50% 0%,
                50% 0%,
                50% 0%
            );
        }
        12.5% {
            clip-path: polygon(
                50% 50%,
                0 0,
                50% 0%,
                100% 0%,
                100% 0%,
                100% 0%,
                100% 0%
            );
        }
        25% {
            clip-path: polygon(
                50% 50%,
                0 0,
                50% 0%,
                100% 0%,
                100% 100%,
                100% 100%,
                100% 100%
            );
        }
        50% {
            clip-path: polygon(
                50% 50%,
                0 0,
                50% 0%,
                100% 0%,
                100% 100%,
                50% 100%,
                0% 100%
            );
        }
        62.5% {
            clip-path: polygon(
                50% 50%,
                100% 0,
                100% 0%,
                100% 0%,
                100% 100%,
                50% 100%,
                0% 100%
            );
        }
        75% {
            clip-path: polygon(
                50% 50%,
                100% 100%,
                100% 100%,
                100% 100%,
                100% 100%,
                50% 100%,
                0% 100%
            );
        }
        100% {
            clip-path: polygon(
                50% 50%,
                50% 100%,
                50% 100%,
                50% 100%,
                50% 100%,
                50% 100%,
                0% 100%
            );
        }
    }
    @keyframes spin-2 {
        0% {
            transform: scaleY(1) rotate(0deg);
        }
        49.99% {
            transform: scaleY(1) rotate(135deg);
        }
        50% {
            transform: scaleY(-1) rotate(0deg);
        }
        100% {
            transform: scaleY(-1) rotate(-135deg);
        }
    }
`;
