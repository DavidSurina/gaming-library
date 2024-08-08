import React, { useEffect, useRef, useState } from "react";
import { Carousel, Container, Image } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useRssFeed from "../../globals/hooks/useRssFeed";
import NewsTile from "../../components/NewsTile/NewsTile";

import { RawgApiService } from "../../globals/functions/rawgApi";
import { rawgParams } from "../../globals/constants/rawgParams";
import { GamesResultsType } from "../../globals/types/rawgTypes";
import "./style.scss";

function Home() {
  const { data, isLoading, fetchNextPage, isFetching, hasNextPage } =
    useRssFeed();
  const { getRawgData } = RawgApiService;

  const [carouselIndex, setCarouselIndex] = useState(0);
  const colEndRef = useRef(null);

  const {
    data: upcomingGamesData,
    isLoading: upcomingGamesLoading,
    error,
  } = useQuery<GamesResultsType>({
    queryKey: ["upcoming-games"],
    queryFn: () => getRawgData(`/games?${rawgParams["Upcoming Games"]}`),
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!hasNextPage) return;
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      },
      {
        rootMargin: "0px 0px 400px 0px",
      },
    );

    if (colEndRef.current && hasNextPage) {
      observer.observe(colEndRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isLoading, hasNextPage]);

  return (
    <Container fluid="true" className="home-container">
      <h2>Upcoming games</h2>
      <section className="carousel-section">
        <Carousel
          fade
          activeIndex={carouselIndex}
          interval={2000}
          onSelect={(newIndex: number) => setCarouselIndex(newIndex)}
          controls={false}
          className="carousel-container"
        >
          {" "}
          {upcomingGamesData?.results.map((item) => {
            return (
              <Carousel.Item key={`carouselItem${item.id}`}>
                <div>
                  <Image src={item.background_image} />
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </section>
      <h2>News</h2>
      <section className="news-section">
        {data?.pages &&
          data.pages.map((pages) => {
            return pages.feedItems.map((item) => {
              return <NewsTile key={`${item.title}tile`} data={item} />;
            });
          })}
      </section>
      {isLoading ||
        (isFetching && (
          <div className="loading-spacing">
            <LoadingSpinner />
          </div>
        ))}
      {data && <span ref={colEndRef} />}
    </Container>
  );
}

export default Home;
