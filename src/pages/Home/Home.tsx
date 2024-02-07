import React, { useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useRssFeed from "../../globals/hooks/useRssFeed";
import NewsTile from "../../components/NewsTile/NewsTile";
import "./style.scss";

function Home() {
  const { data, isLoading, fetchNextPage, isFetching, hasNextPage } =
    useRssFeed();
  const colEndRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!hasNextPage) return;
          if (entry.isIntersecting) {
            // console.log("gets fetched");
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
      <section className="news-container">
        {data?.pages &&
          data.pages.map((pages) => {
            return pages.feedItems.map((item) => {
              return <NewsTile key={`${item.title}tile`} data={item} />;
            });
          })}
        {isLoading || (isFetching && <LoadingSpinner />)}
        {data && <span ref={colEndRef} />}
      </section>
    </Container>
  );
}

export default Home;
