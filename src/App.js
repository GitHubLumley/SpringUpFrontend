import './App.css';
import React, { Component} from 'react';
import Home from './Home.js';
import BookList from './BookList.js';
import BookEdit from './BookEdit.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/books" exact component={BookList} />
          <Route path="/books/:id" component={BookEdit} />
        </Switch>
      </Router>
    )
  }
}
export default App;
