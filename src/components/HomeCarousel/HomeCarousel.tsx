import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

import { LIBRARY_ROUTE } from "../../MainRoute";
import { Game } from "../../globals/types/rawgTypes";

type PropTypes = {
  data: Array<Game>;
};

function HomeCarousel(props: PropTypes) {
  const { data } = props;
  const [carouselIndex, setCarouselIndex] = useState(0);

  return (
    <Carousel
      fade
      activeIndex={carouselIndex}
      interval={2000}
      onSelect={(newIndex: number) => setCarouselIndex(newIndex)}
      controls={false}
      className="carousel-container"
    >
      {" "}
      {data.map((item) => {
        return (
          <Carousel.Item
            key={`carouselItem${item.id}`}
            style={{
              background: `url(${item.background_image}) no-repeat`,
              backgroundSize: "105%",
            }}
            onClick={() => {}}
          >
            <Link
              to={`${LIBRARY_ROUTE}/${item.slug}`}
              key={`carouselItem${item.id}Link`}
            >
              <Carousel.Caption className="carousel-caption_release">
                <span>{`Release: ${item.released || "-"}`}</span>
              </Carousel.Caption>
              <Carousel.Caption className="carousel-caption_upcoming">
                <h4>Upcoming games</h4>
              </Carousel.Caption>
              <Carousel.Caption className="carousel-caption_name">
                <h3>{item.name}</h3>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default HomeCarousel;
