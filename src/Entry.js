import React from "react";
import "./App.css"
class EntryItem extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.imageUpload=this.imageUpload.bind(this)    
    }
    onSubmit(event) {
        event.preventDefault();
        this.props.onAdd(this.nameInput.value, this.description.value)
    }
    imageUpload(e) {
        this.props.onUpload(e.target.files)
    } 
    render() {  return (
            <div className ="form">
                <div>
                    <form onSubmit={this.onSubmit}>
                    <input  type="file"  id="imageFile"  name='imageFile'  onChange={this.imageUpload} />
    {"  "}
                       <input className="input" inputype="text" placeholder="Enter Name" ref={nameInput => this.nameInput = nameInput} />{" "}
                        <input className="input" placeholder="Enter Description" ref={description => this.description = description} />{" "}
                     <button className="button">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default EntryItem;