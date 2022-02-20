import React from "react";
import Select from "./select";
// Using functional component as practice in Book.js
// Breaking every book in a single component to easier render the dom and keeping better performance
const Book =(props)=>{
    const handleSelect=(select)=>{
        props.onChange(select,props.id);
    }
    return (
        <div className="book" >
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${props.img})`}}></div>
            <Select
                onChange={handleSelect}
                shelf={props.shelf}/>
            </div>
            <div className="book-title">{props.title}</div>
            <div className="book-authors">{props.author}</div>
        </div>
    )
    }
export default Book;