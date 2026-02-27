import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import{ Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./AppNavbar";

class BookEdit extends Component {
  emptyItem = {
    title: "", 
    author: "",
    // description: ""
  };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const book = await (await fetch(`/books/${this.props.match.params.id}`)).json();
      this.setState({ item: book });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;

    await fetch("/books" + (item.id ? "/" + item.id : ""), {
      method: item.id ? "PUT" : "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    this.props.history.push("/books");
  }

  render() {
    const { item } = this.state;
    const titleElem = <h2>{item.id ? "Edit Book" : "Add Book"}</h2>;

    return (
      <div>
        <AppNavbar />
        <Container>
          {titleElem}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" id="title" value={item.title || ""} onChange={this.handleChange} autoComplete="title" />
            </FormGroup>
            <FormGroup>
              <Label for="author">Author</Label>
              <Input type="text" name="author" id="author" value={item.author || ""} onChange={this.handleChange} autoComplete="author" />
            </FormGroup>
            {/* <FormGroup>
              <Label for="description">Description</Label>
              <Input type="text" name="description" id="description" value={item.description || ""} onChange={this.handleChange} autoComplete="description" />
            </FormGroup> */}
            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/books">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}
export default withRouter(BookEdit);