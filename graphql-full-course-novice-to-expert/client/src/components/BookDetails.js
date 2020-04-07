import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { graphql } from "react-apollo";

import { getBookQuery } from '../queries';

const BookList = ({ data }) => {
  const { book, loading } = data;

  return (
    <>
      <h1>Book Detail</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <pre>
            {JSON.stringify(book, null, 4)}
          </pre>  
        </div>
      )}
    </>
  );
};

export default graphql(getBookQuery, {
  options: ({ bookId }) => ({
    variables: {
      id: bookId, 
    } 
  })
})(BookList);
