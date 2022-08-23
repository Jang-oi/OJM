import React from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
    background: coral;
    width: 100%;
    height: 500px;

    overflow: hidden;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
`;
const StoreDetailCarousel = ({ storeImage }) => {
    console.log(storeImage);

    return (
        <CarouselContainer>
            {storeImage.map((imageObj) => {
                return <Img key={imageObj.number} src={imageObj.url} />;
            })}
        </CarouselContainer>
    );
};

export default StoreDetailCarousel;
