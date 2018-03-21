import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import ListBooks from './components/ListBooks'
import SearchBar from './components/SearchBar'
import * as BooksAPI from './utils/BooksAPI'
import './App.css';

class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      this.refreshBooks()
    })
  }

  refreshBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        {/* Root route */}
        <Route exact path='/' render={() => (
          <div>
            <ListBooks
              books={this.state.books}
              onUpdateShelf={this.changeShelf}
            />
            <div className="open-search">
              <Link to='/search'> Add a book </Link>
            </div>
          </div>
          )}/>
        {/* Search route */}
        <Route path='/search' render={() => (
          <div>
            <SearchBar
              books={this.state.books}
              onChangeSearch={this.changeShelf}
            />
          </div>
        )}/>
     </div>
    )
  }
}

export default BooksApp;
