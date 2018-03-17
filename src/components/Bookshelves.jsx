import React, { Component } from 'react'
import Books from './Books'

class BookShelves extends Component {

  setStatus = (book) => {
    console.log(book)
  }

  render() {
    const categories = this.props.categories
    return (
      <div>
        {categories.map((category) => (
          <div className="bookshelf" key={category.name}>
            <h2 key={category.name} className="bookshelf-title">{category.name}</h2>
            <Books
              status={this.setStatus}
              bookshelves={category}
              books={this.props.books}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default BookShelves