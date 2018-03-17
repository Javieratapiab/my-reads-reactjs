import React, { Component } from 'react'
import Bookshelves from './Bookshelves'

class ListBooks extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My reads</h1>
        </div>
        <div className="list-books-content">
          <Bookshelves
            categories={this.props.categories}
            books={this.props.books}
          />
        </div>
      </div>
    )
  }
}

export default ListBooks