import React from 'react';
import PropTypes from 'prop-types';

const ExampleCarouselImage = ({ image, altText }) => {
    return (
        <img
            src={image}
            alt={altText}
            className="d-block w-100"
            style={{ height: '400px', objectFit: 'f' }}
        />
    );
};

ExampleCarouselImage.propTypes = {
    image: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
};

export default ExampleCarouselImage;
