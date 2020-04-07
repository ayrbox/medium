import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { graphql } from "react-apollo";
import { compose } from 'recompose';

import { getAuthors, addBookMutation, getBookQuery } from '../queries';

const AddBook = ({
  getAuthorsQuery,
  addBookMutation,
}) => {

  const { authors, loading } = getAuthorsQuery;

  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addBookMutation({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries:[{
        query: getBookQuery
      }]
    });

  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <h3>Add Book</h3>
      <FormGroup>
        <Label for="bookName">Book Name</Label>
        <Input
          type="text"
          name="name"
          id="bookName"
          placeholder="Name of book"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="bookGenre">Genre</Label>
        <Input
        type="text"
        name="genre" id="bookGenre"
        placeholder="Genre"
        value={genre}
        onChange={({ target }) => setGenre(target.value) }
        />
      </FormGroup>
      <FormGroup>
        <Label for="bookAuthor">Author</Label>
        <Input type="select" name="author" id="bookAuthor"
          onChange={({ target }) => {
            setAuthorId(target.value)
          }}
        >
          {loading ? (
            <option disabled>Loading authors...</option>
          ) : (
            <>
              <option value="">Select author...</option>
              {authors.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </>
          )}
        </Input>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};

export default compose(
  graphql(getAuthors, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' }),
)(AddBook);
