import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import { DebounceInput } from 'react-debounce-input'
class SearchBar extends Component {

  state = {
    query: '',
    results: []
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    if (query) return this.getResults(query)
    this.setState({ results: [] })
  }

  getResults = (query) => {
    BooksAPI.search(query).then((results) => {
      // I need to put some logic here, results don't have shelves associated
      console.log('RESULTS', results)
      this.setState({ results: results })
    })
  }

  updateBookSearch = (book, shelf) => {
    this.props.onChangeSearch(book, shelf.value)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              type="text"
              minLength={2}
              debounceTimeout={300}
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.results.length > 0 && (
            <ol className="books-grid">
              {this.state.results.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                        }}>
                      </div>
                      <div className="book-shelf-changer">
                        <select onChange={(event) => this.updateBookSearch(book, event.target)} value={book.shelf}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    )
  }
}

export default SearchBar
