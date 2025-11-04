import { useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styled from "styled-components";
import mainImg from "../assets/main.jpg";

export default function Game() {
    const imgRef = useRef(null);

    const handleClick = (e) => {
        const img = imgRef.current;
        const rect = img.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const scaleX = img.naturalWidth / rect.width;
        const scaleY = img.naturalHeight / rect.height;

        const normalizedX = Math.round(x * scaleX);
        const normalizedY = Math.round(y * scaleY);

        console.log("Coordinates: ", normalizedX, normalizedY);
    };

    return (
        <Container onClick={handleClick}>
            <TransformWrapper>
                <TransformComponent>
                    <StyledImg
                        ref={imgRef}
                        src={mainImg}
                        alt="Image with cartoon characters"
                    />
                </TransformComponent>
            </TransformWrapper>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

const StyledImg = styled.img`
    width: 100%;
    height: 100vh;
    object-fit: contain;
    display: block;
    border: 2px solid black;
`;
