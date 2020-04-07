import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getAuthors = gql`
  {
    authors {
      id
      name
    }
  }
`;

const AddBook = ({ data }) => {
  const { authors, loading } = data;

  return (
    <Form>
      <h3>Add Book</h3>
      <FormGroup>
        <Label for="bookName">Book Name</Label>
        <Input
          type="text"
          name="name"
          id="bookName"
          placeholder="Name of book"
        />
      </FormGroup>
      <FormGroup>
        <Label for="bookGenre">Genre</Label>
        <Input type="text" name="genre" id="bookGenre" placeholder="Genre" />
      </FormGroup>
      <FormGroup>
        <Label for="bookAuthor">Author</Label>
        <Input type="select" name="author" id="bookAuthor">
          {loading ? (
            <option disabled>Loading authors...</option>
          ) : (
            authors.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))
          )}
        </Input>
      </FormGroup>
    </Form>
  );
};

export default graphql(getAuthors)(AddBook);
