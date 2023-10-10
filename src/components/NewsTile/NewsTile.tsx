import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ParsedFeedType} from "../../pages/Home/Home";

type PropTypes = {
    data: ParsedFeedType;
};

function NewsTile(props: PropTypes) {
    const {data} = props;
    const {link, title, author} = data;

    return (
        <Card>
            <h2>{title}</h2>
            <h4>{author}</h4>
            <div>{}</div>
            <Link to={link}>Go to</Link>
        </Card>
    );
}

export default NewsTile;