import React from "react"
import "./App.css"
class Display extends React.Component {
    constructor(props) {
        super(props);
        this.Edit = this.Edit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this)
        this.imageUpdate=this.imageUpdate.bind(this)
        this.state = {
            onEdit: false,
            img1:JSON.parse(localStorage.getItem("data1"))
        }
    }
    Edit() {
        this.setState({ onEdit: true })
      }
    imageUpdate(e) {
        this.props.onUpdate(e.target.files)
    }
    onEditSubmit(event) {
        event.preventDefault();
        this.props.onEditSubmit(this.nameInput.value, this.description.value);
        this.setState({img1:JSON.parse(localStorage.getItem("data1"))})
        this.setState({ onEdit: false })        
    }
     render() {
        return (
            <div className="form">        
                {this.state.onEdit ? (
                    <form onSubmit={this.onEditSubmit}>
                        <input type="file" id="imageFile" onChange={this.imageUpdate} />
                        <input  className="input" type="text" placeholder="Enter Name" disabled defaultValue={this.props.details.name} ref={nameInput => this.nameInput = nameInput} />{"  "}
                        <input  className="input" placeholder="Enter Description" defaultValue={this.props.details.description} ref={description => this.description = description} /> {" "}
                        <button className="button">Save</button>
                    </form>
                ) : (
                        <div>
                            <ul>
                                <li>Name:{"  "}{this.props.details.name} {" "}</li>
                                <li>Description:{"  "}{this.props.details.description}<br/> </li></ul>{" "}
                                Profile Photo<br/><br/><img id="test" src={this.state.img1}/><br/>
                                <button className="button" onClick={this.Edit}>Edit</button>
                        </div>
                    )}
            </div>);
    }
}
export default Display;