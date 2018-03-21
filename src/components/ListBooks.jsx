import React, { Component } from 'react'
import Books from './Books'
class ListBooks extends Component {

  state = {
    categories: [
      { name: 'Currently Reading', value: 'currentlyReading' },
      { name: 'Want to Read', value: 'wantToRead' },
      { name: 'Read', value: 'read' },
    ],
  }

  statusChange = (data) => {
    this.props.onUpdateShelf(data.book, data.value)
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.state.categories.map((category) => (
              <div className="bookshelf" key={category.name}>
                <h2 key={category.name} className="bookshelf-title">{category.name}</h2>
                <Books
                  bookshelf={category}
                  books={this.props.books}
                  statusChange={this.statusChange}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks
