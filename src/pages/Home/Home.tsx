import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import NewsTile from "../../components/NewsTile/NewsTile";
import './style.scss';
import useRssFeed from "../../globals/hooks/useRssFeed";

export type ParsedFeedType = {
    link: string | undefined;
    title: string | undefined;
    author: string | undefined;
    pubDate: string | undefined;
    description: string | undefined;
    img: string | null | undefined;
}

function Home() {
    const {getRss, loading} = useRssFeed();
    const [feed, setFeed] = useState<ParsedFeedType[]>([]);

    //TODO maybe create a hook out of all this - to get feed/get next page of it/ just to hold most of the logic
    //TODO maybe do it same way as the game library - tanstack infinite query - caching will be easier

    useEffect(() => {
        getRss().then(res => {
            if (res) {
                setFeed(res);
            }
        })
    }, []);

    return (
        <Container fluid="true" className="news-container">
            <section className="left-col"></section>
            <section className="middle-col">
                {feed && feed.map((item) => <NewsTile key={`${item.title}tile`} data={item}/>)}
            </section>
            <section className="right-col"></section>
            {loading && <LoadingSpinner/>}
        </Container>
    );
}

export default Home;
