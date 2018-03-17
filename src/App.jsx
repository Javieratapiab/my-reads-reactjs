import React, { Component } from 'react'
import * as BooksAPI from './utils/BooksAPI'
import ListBooks from './components/ListBooks'
import './App.css';

class BooksApp extends Component {
  state = {
    books: [],
    categories: [
      { name: 'Currently Reading', value: 'currentlyReading' },
      { name: 'Want to Read', value: 'wantToRead' },
      { name: 'Read', value: 'read' }
    ]
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    });
  }

  render() {
    return (
      <div>
        <ListBooks
          categories={this.state.categories}
          books={this.state.books}
        />
      </div>
    )
  }
}
export default BooksApp;
