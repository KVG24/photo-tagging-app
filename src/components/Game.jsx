import { useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styled from "styled-components";
import mainImg from "../assets/main.jpg";

export default function Game() {
    const imgRef = useRef(null);

    const handleClick = (e) => {
        const img = imgRef.current;
        if (!img) return;

        const rect = img.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const scaleX = img.naturalWidth / rect.width;
        const scaleY = img.naturalHeight / rect.height;

        const normalizedX = Math.round(x * scaleX);
        const normalizedY = Math.round(y * scaleY);

        console.log("Coordinates:", normalizedX, normalizedY);
    };

    return (
        <Container onClick={handleClick}>
            <TransformWrapper
                initialScale={Math.max(
                    window.innerWidth / 4000,
                    window.innerHeight / 3000
                )}
                minScale={0.5}
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
