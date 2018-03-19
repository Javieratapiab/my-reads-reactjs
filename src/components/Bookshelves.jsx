import React, { Component } from 'react'
import Books from './Books'
import * as BooksAPI from '../utils/BooksAPI'

class BookShelves extends Component {
  state = {
    books: []
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    });
  }

  statusChange = (data) => {
    BooksAPI.update(data.book, data.value).then((json) => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      });
    })
  }

  render() {
    const categories = this.props.categories
    return (
      <div>
        {categories.map((category) => (
          <div className="bookshelf" key={category.name}>
            <h2 key={category.name} className="bookshelf-title">{category.name}</h2>
            <Books
              bookshelves={category}
              books={this.state.books}
              statusChange={this.statusChange}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default BookShelves