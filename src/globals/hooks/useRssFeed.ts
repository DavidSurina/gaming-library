import {useState} from "react";
import axios from "axios";

const CORS_PROXY = 'https://corsproxy.io/?';
const ignUrl = 'https://www.ign.com/rss/articles/feed?tags=games';

const useRssFeed = () => {
    const [loading, setLoading] = useState(false);
    const getRss = async () => {
        setLoading(true);
        return await axios({
            method: 'get',
            url: CORS_PROXY + ignUrl,
            withCredentials: false,
            headers: {
                "Content-Type": 'text/plain',
            }
        }).then((res) => {
            const feed = new window.DOMParser().parseFromString(res.data, "text/xml");
            const items = feed.querySelectorAll("item");

            const feedItems = [...items as unknown as Element[]].map((el) => ({
                link: el.querySelector("link")?.innerHTML,
                title: el.querySelector("title")?.innerHTML,
                author: el.querySelector("creator")?.innerHTML,
                pubDate: el.querySelector("pubDate")?.innerHTML,
                description: el.querySelector("description")?.innerHTML,
                img: el.querySelector("content")?.getAttribute('url'),
            }));
            // console.log(res)
            // console.log(feed)
            // console.log(items)
            // console.log(feedItems)
            setLoading(false);
            return feedItems;
        })
    };

    return {getRss, loading};
}

export default useRssFeed;