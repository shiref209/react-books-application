import React from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';
import BookShelf from './components/BookShelf';
import { Link, Route, Switch } from 'react-router-dom';
import Search from './components/Search';

class BooksApp extends React.Component {
    constructor(){
      super();
      this.state={
        books:[],
        isChanged:false
      }
    }
    // function to left the state up till app.js to handle the changes
    handleShelfChange=(change,changedBook)=>{
      
      // calling update() with the book having changed to update the backend and then recall the books again to update the state
       BooksAPI.update(changedBook[0],change).then(BooksAPI.getAll().then(data=>{
        this.setState(()=>({
          books:data,
          isChanged:false
        }))    
      }))
      this.setState(()=>({isChanged:true}));
    }
    // calling componentDidMount to fetch books for first time app runs
    componentDidMount(){
      BooksAPI.getAll().then(data=>{
        this.setState(()=>({
          books:data
        }))    
      })
    }
  render() {
    return (
          <div className="app">
            <Switch>
              <Route exact path='/search'>
                  <Search onChange={this.handleShelfChange}/>
                </Route>
                <Route path='/'>
                  <div className="list-books">
                    <div className="list-books-title">
                      <h1>MyReads</h1>
                    </div>
                  <div className="list-books-content">
                    <BookShelf
                      books={this.state.books}
                      onChange={this.handleShelfChange}
                      title='Currently Reading'
                      shelfHolder='currentlyReading' />
                    <BookShelf
                      books={this.state.books}
                      onChange={this.handleShelfChange}
                      title='To Read'
                      shelfHolder='wantToRead' />
                    <BookShelf
                      books={this.state.books}
                      onChange={this.handleShelfChange}
                      title='Read'
                      shelfHolder='read' />
                </div>
                {/* Adding link to React-Router to navigate to search page */}
                <Link to='/search'>
                  <div className="open-search">
                    <button >Add a book</button>
                  </div>
                </Link>
              </div>
              </Route>

            </Switch>
          </div>
    )
  }
}

export default BooksApp;
