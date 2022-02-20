import React, { Component } from "react";
import Book from "./Book";

class BookShelf extends Component{
    constructor(props){
        // Storing changed book in state for future added features
        super(props);
        this.state={
            changedBook:'',
            shelf:''
        }
    }
    // Lifting state up
    handleShelfChange=(change,bookId)=>{
        let changedBook=this.props.books.filter((book)=>(bookId ===book.id))
        this.props.onChange(change,changedBook);
    }
    render(){
        // getting the books for each bookshelf depending on props
        const shelfBooks=this.props.books.filter((book)=>book.shelf===this.props.shelfHolder)
        return(   
        <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
            {shelfBooks.map((book)=>
                (<li key={book.id}>
                    <Book
                    author={book.authors}
                    title={book.title}
                    img={book.imageLinks.thumbnail}
                    onChange={this.handleShelfChange}
                    id={book.id}
                    shelf={book.shelf}
                    />
                    </li>
                    ))}
            </ol>
            </div>
    </div>)   
    }
}
export default BookShelf;