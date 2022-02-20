
import React, { Component } from "react";
import {Link} from "react-router-dom";
import * as BooksAPI from '../BooksAPI';
import Book from "./Book";
class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            books:[],
            isError:false
        }
    }
    handleShelfChange=(change,bookId)=>{
        let changedBook=this.state.books.filter((book)=>(bookId ===book.id))
        this.props.onChange(change,changedBook);}

    inputChangeHandler=(event)=>{
        let value=event.target.value.toLowerCase().trim();
        BooksAPI.search(value).then((data)=>
        {
          // Handling error from search using isError from state
          if (data.error){
            this.setState(()=>({isError:true}))
          }
          else{
            this.setState(()=>({
              books:data,
              isError:false
            }))
          }
          })
        .catch(error=>{
          this.setState(()=>({isError:true}))
        })
    }
    render(){
        return(
            
                <div className="search-books">
                  <div className="search-books-bar">
                      <Link to='/'>
                        <button className="close-search" onClick={this.props.onClick}>Close</button>
                      </Link>
                    <div className="search-books-input-wrapper">
                      {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
      
                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                      */}
                      <input type="text"
                      placeholder="Search by title or author" 
                      onChange={this.inputChangeHandler}
                      />
                    </div>
                  </div>
                  {//Conditional rendering to check the search input and view error message when error

                  <div className="search-books-results">
                  <ol className="books-grid">
                      { this.state.isError? (<span>Please enter a valid input</span>)
                      : this.state.books.length>=1 && this.state.books.map((book)=>
              (<li key={book.id}>
                  <Book
                  author={
                     // conditionally assigning prop value according to prescence of
                    book.authors?book.authors
                    :''
                  }
                  title={book.title}
                  img={
                    // conditionally assigning prop value according to prescence of thumbnail
                    book.imageLinks? book.imageLinks.thumbnail
                    :'' 
                      }
                  onChange={this.handleShelfChange}
                  id={book.id}
                  shelf={book.shelf}
                  />
                  </li>
                  ))
                  }
                  </ol>
                </div>
                  }
                </div>
        )
    }
}

export default Search;