import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ParsedFeedType} from "../../pages/Home/Home";
import './style.scss';

type PropTypes = {
    data: ParsedFeedType;
};

function NewsTile(props: PropTypes) {
    const {data} = props;
    const {link, title, author} = data;
    const cleanedTitle = title.replace("<![CDATA[", "").replace("]]>", "");

    return (
        <Card className="news-tile">
            <h3>{cleanedTitle}</h3>
            <h5>{author}</h5>
            <div>{}</div>
            <Link to={link} target="_blank">Go to</Link>
        </Card>
    );
}

export default NewsTile;