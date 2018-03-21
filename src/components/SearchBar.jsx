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

  updateBookSearch = (book, shelf) => {
    this.refreshResults(book, shelf)
    this.props.onChangeSearch(book, shelf.value)
  }

  refreshResults = (book, shelf) => {
    let previous = this.state.results
    const bookToRefresh = previous.filter(b => b.id === book.id)[0]
    bookToRefresh.shelf = shelf.value
    this.setState({ results: previous })
  }

  getResults = (query) => {
    const booksInShelves = this.props.books
    BooksAPI.search(query).then((results) => {
      if (!results.error) {
        results.forEach((result) => {
          const match = booksInShelves.find((book => { return book.id === result.id }))
          if (match) return result.shelf = match.shelf
          result.shelf = 'none'
        })
        this.setState({ results: results })
      }
    }).catch((error) => {
      console.warn('You got the following error: ' + error)
    })
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
                      {book.imageLinks && book.imageLinks.smallThumbnail && (
                        <div className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                          }}>
                        </div>
                      )}
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
                    {book.authors && (
                      <div className="book-authors">
                        {book.authors[0]}
                      </div>
                    )}
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
