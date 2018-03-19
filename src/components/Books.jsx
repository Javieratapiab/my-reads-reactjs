import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Books extends Component {
  /* Setting propTypes */
  static propTypes = {
    books: PropTypes.array.isRequired,
    bookshelves: PropTypes.object.isRequired
  }

  /* Updates parent */
  updateStatus = (event, book) => {
    this.props.statusChange({ value: event.value, book: book})
  }

  render() {
    const bookshelf = this.props.bookshelf
    const books = this.props.books

    /* Filtering books by shelf */
    let showingBooks
    showingBooks = books.filter((book) => book.shelf === bookshelf.value)

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {showingBooks.map((book) => (
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
                    <select onChange={(event) => this.updateStatus(event.target, book)} value={book.shelf}>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none" disabled>None</option>
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