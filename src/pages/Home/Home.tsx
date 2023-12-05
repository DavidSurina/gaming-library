import React, {useEffect, useRef} from "react";
import Container from "react-bootstrap/Container";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import './style.scss';
import useRssFeed from "../../globals/hooks/useRssFeed";
import NewsTile from "../../components/NewsTile/NewsTile";

function Home() {
    const {data, isLoading, fetchNextPage, hasNextPage} = useRssFeed();
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
            }
        );

        if (colEndRef.current && hasNextPage) {
            observer.observe(colEndRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [isLoading, hasNextPage]);

    return (
        <Container fluid="true" className="news-container">
            <section className="left-col"></section>

            <section className="middle-col">
                {data?.pages &&
                    data.pages.map(pages => {
                        return pages.feedItems.map((item) => {
                            return <NewsTile key={`${item.title}tile`} data={item}/>
                        })
                    })}
                {data && <span ref={colEndRef}/>}
            </section>

            <section className="right-col"></section>
            {isLoading && <LoadingSpinner/>}
        </Container>
    );
}

export default Home;
