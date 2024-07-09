import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { ChevronRight } from "react-bootstrap-icons";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { GamesResultsType } from "../../globals/types/rawgTypes";
import { LIBRARY_ROUTE } from "../../MainRoute";
import "./style.scss";

type PropTypes = {
  data: GamesResultsType | undefined;
  loading: boolean;
};

function SearchSuggestionList(props: PropTypes) {
  const { data, loading } = props;
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="suggestion_wrapper">
        <LoadingSpinner />
      </div>
    );

  if (!data || data.results.length === 0) {
    return (
      <div className="suggestion_wrapper">
        <span className="text_wrapper">No data</span>
      </div>
    );
  }

  const handleListItemClick = (slug: string) => {
    navigate(`${LIBRARY_ROUTE}/${slug}`);
  };

  // TODO add other image if one from data unavailable
  return (
    <ListGroup className="suggestion_wrapper">
      {data.results &&
        data.results.map((game) => (
          <ListGroupItem
            type="button"
            onClick={() => handleListItemClick(game.slug)}
            key={`${game.name}Suggestion`}
          >
            <div className="img_wrapper">
              <img alt={`${game.name} logo`} src={game.background_image} />
            </div>
            <div className="text_wrapper">
              <span>{game.name}</span>
              <span className="badge_wrapper">
                {game.genres.map((genre) => (
                  <Badge bg="secondary" key={`${genre.name}Badge`}>
                    {genre.name}
                  </Badge>
                ))}
              </span>
            </div>
          </ListGroupItem>
        ))}
      <div className="result-text_row">
        <span>Results: {data.count || "-"}</span>
        {data.count && data.count > 4 ? (
          <Button>
            More <ChevronRight />
          </Button>
        ) : (
          <div />
        )}
      </div>
    </ListGroup>
  );
}

export default SearchSuggestionList;
