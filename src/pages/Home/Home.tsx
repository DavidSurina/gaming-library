import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import NewsTile from "../../components/NewsTile/NewsTile";
import axios from "axios";

export type ParsedFeedType = {
    link: string;
    title: string;
    author: string;
}

const CORS_PROXY = 'https://corsproxy.io/?';
const gamespotUrl = 'https://www.gamespot.com/feeds/game-news';

function Home() {
    const [loading, setLoading] = useState(false);
    const [feed, setFeed] = useState<ParsedFeedType[]>([]);

    const getRss = async () => {
        await axios({
            method: 'get',
            url: CORS_PROXY + gamespotUrl,
            withCredentials: false,
            headers: {
                "Content-Type": 'text/plain',
            }
        }).then((res) => {
            // const {contents} = res.data;
            // console.log(jsonData);
            const feed = new window.DOMParser().parseFromString(res.data, "text/xml");
            const items = feed.querySelectorAll("item");

            const feedItems = [...items].map((el) => ({
                link: el.querySelector("link")?.innerHTML,
                title: el.querySelector("title")?.innerHTML,
                author: el.querySelector("creator")?.innerHTML,
            }));
            console.log(res)
            console.log(feed)
            console.log(items)
            setFeed(feedItems);
            setFeed(feedItems);
        })
    };

    useEffect(() => {
        setLoading(true)
        getRss();
        setLoading(false);
    }, []);

    return (
        <Container fluid="true" className="vh-100">
            {loading && <LoadingSpinner/>}
            {feed && feed.map((item) => <NewsTile key={`${item.title}tile`} data={item}/>)}
        </Container>
    );
}

export default Home;
