import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel, Container, Image } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import NewsTile from "../../components/NewsTile/NewsTile";

import useRssFeed from "../../globals/hooks/useRssFeed";
import { RawgApiService } from "../../globals/functions/rawgApi";
import { rawgParams } from "../../globals/constants/rawgParams";
import { GamesResultsType } from "../../globals/types/rawgTypes";
import { LIBRARY_ROUTE } from "../../MainRoute";

import "./style.scss";

function Home() {
  const {
    data,
    isLoading: isRssLoading,
    isInitialLoading: isRssInitialLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useRssFeed();
  const { getRawgData } = RawgApiService;

  const [carouselIndex, setCarouselIndex] = useState(0);
  const colEndRef = useRef(null);

  const {
    data: upcomingGamesData,
    isLoading: isUpcomingGamesLoading,
    isInitialLoading: isUpcomingGamesInitialLoading,
  } = useQuery<GamesResultsType>({
    queryKey: ["upcoming-games-home"],
    queryFn: () =>
      getRawgData(`/games?page_size=6${rawgParams["Upcoming Games"]}`),
  });

  const isInitialLoading = isRssInitialLoading || isUpcomingGamesInitialLoading;

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
  }, [isRssLoading, hasNextPage]);

  return (
    <Container fluid="true" className="home-container">
      {isInitialLoading ? (
        <LoadingSpinner />
      ) : (
        <Fade>
          <section className="carousel-section">
            {isUpcomingGamesLoading && !isUpcomingGamesInitialLoading ? (
              <LoadingSpinner />
            ) : (
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
                      <Link to={`${LIBRARY_ROUTE}/${item.slug}`}>
                        <Carousel.Caption className="carousel-caption_release">
                          <span>{`Release: ${item.released || "-"}`}</span>
                        </Carousel.Caption>
                        <Carousel.Caption className="carousel-caption_upcoming">
                          <h4>Upcoming games</h4>
                        </Carousel.Caption>
                        <Carousel.Caption className="carousel-caption_name">
                          <h3>{item.name}</h3>
                        </Carousel.Caption>
                        <div>
                          <Image src={item.background_image} />
                        </div>
                      </Link>
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            )}
          </section>
          <h1>IGN News</h1>
          <section className="news-section">
            <Fade>
              {data?.pages &&
                data.pages.map((pages) => {
                  return pages.feedItems.map((item) => {
                    return <NewsTile key={`${item.title}tile`} data={item} />;
                  });
                })}
            </Fade>
          </section>
          {(isRssLoading || isFetching) && !isRssInitialLoading && (
            <div className="loading-spacing">
              <LoadingSpinner />
            </div>
          )}
        </Fade>
      )}
      {data && <span ref={colEndRef} />}
    </Container>
  );
}

export default Home;
