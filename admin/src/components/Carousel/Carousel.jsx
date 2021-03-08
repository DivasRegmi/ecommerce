import React from "react";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Carousel = ({ images }) => {

    const Image = images ? images.map((image, index) => {
        const imageURL = `http://localhost:3000/images/product-img/${image || 'productdefault.jpg'}`

        return <div key={index}>
            <img
                alt={image}
                src={imageURL}
            />
        </div>
    }) : <div>
            <img
                alt='default'
                src='http://localhost:3000/images/product-img/productdefault.jpg'
            />
        </div>




    return (
        <ReactCarousel>
            {Image}
        </ReactCarousel>
    );
}

export default Carousel;


