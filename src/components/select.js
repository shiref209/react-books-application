import React from "react";

// Adding select as a single component to be re-usable
// Practicing functional component
const Select=(props)=>{
    const handleChange=(e)=>{
        props.onChange(e.target.value)
    }
    return( 
    <div className="book-shelf-changer" onChange={handleChange}>
        {/* Adding default value to select dynamically depending on user input */}
        <select defaultValue={props.shelf?props.shelf:'none'}>
            <option value="move" disabled  >Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
            
        </select>
    </div>
    )
}
export default Select;