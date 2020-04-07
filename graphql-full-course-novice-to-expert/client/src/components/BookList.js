import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { graphql } from "react-apollo";

import { getBookQuery } from '../queries';

const BookList = ({ data }) => {
  const { books, loading } = data;

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <ListGroup>
          {books.map(({ id, name}) => (
            <ListGroupItem key={id} tag="a">
              {name}
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default graphql(getBookQuery)(BookList);
