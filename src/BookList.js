import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";

class BookList extends Component {

  constructor(props) {
    super(props);
    this.state = { books: [], isLoading: false };
    this.remove = this.remove.bind(this);
  }

   componentDidMount() {
    fetch("/books")
      .then(response => response.json())
      .then(data => this.setState({ books: data }));
  }

    async remove(id) {
    await fetch(`/books/${id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedBooks = [...this.state.books].filter(i => i.id !== id);
      this.setState({ books: updatedBooks });
    });
  }
  
  render() {
    const { books, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const bookList = books.map((book) => {
      return (
        <tr key={book.id}>
          <td style={{ whiteSpace: "nowrap" }}>{book.title}</td>
          <td>{book.author}</td>
          <td>
            <ButtonGroup>
              <Button
                size="sm"
                color="primary"
                tag={Link}
                to={"/books/" + book.id}
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.remove(book.id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-end">
            <Button color="success" tag={Link} to="/books/new">
              Add Book
            </Button>
          </div>
          <h3>Books</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="30%">Title</th>
                <th width="30%">Author</th>
                <th width="40%">Actions</th>
              </tr>
            </thead>
            <tbody>{bookList}</tbody>
          </Table>
        </Container>
      </div>
    );
}
}

export default BookList;