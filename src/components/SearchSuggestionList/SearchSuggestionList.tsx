import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Game } from "../../globals/types/rawgTypes";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./style.scss";

type PropTypes = {
  listData: Array<Game>;
  loading: boolean;
};

function SearchSuggestionList(props: PropTypes) {
  const { listData, loading } = props;

  if (loading)
    return (
      <div className="suggestion_wrapper">
        <LoadingSpinner />
      </div>
    );

  return (
    <ListGroup className="suggestion_wrapper">
      {listData && listData.length ? (
        listData.map((game) => (
          <ListGroupItem key={`${game.name}Suggestion`}>
            <img alt={`${game.name} logo`} src={game.background_image} />
            <div>
              <span>{game.name}</span>
              <span>
                {game.publishers.map((publisher) => publisher.name).join(" ,")}
              </span>
            </div>
          </ListGroupItem>
        ))
      ) : (
        <div>No data</div>
      )}
    </ListGroup>
  );
}

export default SearchSuggestionList;
