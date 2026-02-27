import React, { Component } from "react";
import { Button, Container } from "reactstrap";
import './App.css';
import AppNavbar from "./AppNavbar.js";
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    <div className="float-right">
                        <Button color="link"><Link to="/books">Add Book</Link></Button>
                    </div>
                    <h3>Welcome to the Book Management App</h3>
                    <p>Use the navigation bar to manage your book collection.</p>
                </Container>
            </div>
        );
    }
}

export default Home;