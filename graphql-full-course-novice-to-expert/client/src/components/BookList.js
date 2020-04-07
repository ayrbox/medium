import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getBookQuery = gql`
  {
    books {
      id
      name
    }
  }
`;

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
