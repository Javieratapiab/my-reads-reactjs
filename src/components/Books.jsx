import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Books extends Component {
  /* Setting propTypes */
  static propTypes = {
    books: PropTypes.array.isRequired,
    bookshelves: PropTypes.object.isRequired
  }
  render() {
    const bookshelves = this.props.bookshelves
    const books = this.props.books

    let showingBooks
    showingBooks = books.filter((book) => book.shelf === bookshelves.value)

    return (
      <div className="bookshelf-books">
      <ol className="books-grid">
        {showingBooks.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select>
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
    </div>
    )
  }
}

export default Books