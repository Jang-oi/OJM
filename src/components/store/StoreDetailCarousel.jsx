import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';

const Container = styled.div`
    width: 80%;
    margin: 0 auto; // 가운데 정렬 하려고
    overflow: hidden; // 선을 넘어간 이미지들이 보이지 않게 하기위해
    min-height: 500px;
`;
const CarouselContainer = styled.div`
    width: 100%;
    display: flex; // 가로로 정렬
`;

const Img = styled.img`
    min-width: 100%; // 최소 크기를 정하지 않으면 이미지가 겹침
    height: 500px;
`;

const Button = styled.button`
    position: absolute;
    top: 35%;
    transform: translate(0%, -50%);
    width: 20px;
    height: 36px;

    // 배경 지우고 선 지우고
    background-color: transparent;
    border: 0;
    cursor: pointer;

    ${(props) => {
        return props.prev
            ? css`
                  left: 20%;
              `
            : css`
                  right: 20%;
              `;
    }}
`;

const StoreDetailCarousel = ({ storeImage }) => {
    const imageTotal = storeImage.length - 1;

    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef(null);

    const handlePrevButton = () => {
        if (currentSlide === 0) setCurrentSlide(0);
        else setCurrentSlide(currentSlide - 1);
    };

    const handleNextButton = () => {
        // 더이상 넘어갈 슬라이드가 없을 때 초기화
        if (currentSlide >= imageTotal) setCurrentSlide(0);
        else setCurrentSlide(currentSlide + 1);
    };

    useEffect(() => {
        if (currentSlide >= imageTotal) setCurrentSlide(0);

        slideRef.current.style.transition = 'all 0.5s ease-in-out';
        slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    }, [imageTotal, currentSlide]);

    useEffect(() => {
        setInterval(() => {
            setCurrentSlide((prevValue) => {
                return prevValue + 1;
            });
        }, 2000);
    }, []);

    return (
        <Container>
            <CarouselContainer ref={slideRef}>
                {storeImage.map((imageObj) => {
                    return <Img key={imageObj.number} src={imageObj.url} />;
                })}
            </CarouselContainer>
            <Button onClick={handlePrevButton} prev>
                <RiArrowDropLeftLine size={60} />
            </Button>
            <Button onClick={handleNextButton} next>
                <RiArrowDropRightLine size={60} />
            </Button>
        </Container>
    );
};

export default StoreDetailCarousel;
