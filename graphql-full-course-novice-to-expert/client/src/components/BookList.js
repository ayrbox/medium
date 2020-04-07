import React, { useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { graphql } from "react-apollo";

import { getBooksQuery } from '../queries';
import BookDetails from './BookDetails';

const BookList = ({ data }) => {
  const { books, loading } = data;

  const [bookId, setBookId] = useState(null);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <ListGroup>
            {books.map(({ id, name}) => (
              <ListGroupItem
                key={id}
                tag="a"
                onClick={(e) => {
                  e.preventDefault();
                  setBookId(id);
                }}>
                {name}
              </ListGroupItem>
            ))}
          </ListGroup>
          <BookDetails bookId={bookId} />
        </>
      )}
    </>
  );
};

export default graphql(getBooksQuery)(BookList);
