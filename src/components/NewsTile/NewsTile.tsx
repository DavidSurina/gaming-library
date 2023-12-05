import React from "react";
import {Card, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ParsedFeedType} from "../../globals/functions/feedApi";
import './style.scss';

type PropTypes = {
    data: ParsedFeedType;
};

function NewsTile(props: PropTypes) {
    const {data} = props;
    const {link, title, author, img, pubDate} = data;
    const cleanedTitle = title?.replace("<![CDATA[", "").replace("]]>", "");
    const locale = window.navigator.language;
    const dateConvert = typeof pubDate === "string" ? Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
        timeStyle: undefined
    }).format(new Date(pubDate)) : '-';

    return (
        <Link to={link || '/home'} target="_blank">
            <Card className="news-tile">
                <div className="news-img_container">
                    <Image src={img || ''} className="news-img"/>
                </div>
                <div className="news-date">{dateConvert}</div>
                <h3 className="news-title">{cleanedTitle}</h3>
                <h5 className="news-author">{author}</h5>
                <div>{}</div>
            </Card>
        </Link>
    );
}

export default NewsTile;