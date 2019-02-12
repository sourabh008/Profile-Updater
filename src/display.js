import React from "react"
import "./App.css"
class Display extends React.Component {
    constructor(props) {
        super(props);
        this.Edit = this.Edit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this)
        this.imageUpdate = this.imageUpdate.bind(this)
        this.liveEdit = this.liveEdit.bind(this)
        this.openFm=this.openFm.bind(this);
        this.change=this.change.bind(this)
        this.state = {
            onEdit: false,
            img1: JSON.parse(localStorage.getItem("data1"))
        }
    }
    Edit() {
        this.setState({ onEdit: true })
    }
    imageUpdate(e) {
        this.props.onUpdate(e.target.files)
            this.setState({img1:JSON.parse(localStorage.getItem("data1")) })
    }
    onEditSubmit(event) {
        event.preventDefault();
        this.props.onEditSubmit(this.nameInput.value, this.description.value);
        this.setState({ img1: JSON.parse(localStorage.getItem("data1")) })
        this.setState({ onEdit: false })
    }
    liveEdit() {
        document.getElementById("desc").removeAttribute('readOnly');
       

    }
    openFm() {
        document.getElementById('imageFile').click()
    }
    change(e){
     this.props.details.description= e.target.value;
    localStorage.setItem('data',JSON.stringify(this.props.details) )


    }
    render() {
        return (
            <div className="form">
                {this.state.onEdit ? (
                    <form onSubmit={this.onEditSubmit}>
                        <input type="file" id="imageFile" onClick={this.imageUpdate} />
                        <input className="input" type="text" placeholder="Enter Name" disabled defaultValue={this.props.details.name} ref={nameInput => this.nameInput = nameInput} />{"  "}
                        <input className="input" placeholder="Enter Description" defaultValue={this.props.details.description} ref={description => this.description = description} /> {" "}
                        <button className="button">Save</button>
                    </form>
                ) : (
                        <div>
                            <ul>
                                <li>Name:{"  "}{this.props.details.name} {" "}</li>
                                <li>Description:<input onChange={this.change} id="desc" onClick={this.liveEdit} className="input" placeholder="Enter Description" defaultValue={this.props.details.description} ref={description => this.description = description} readOnly /> {" "}
                                </li></ul>{" "}
                            Profile Photo<br /><br />
                            <img onClick={this.openFm} src={this.state.img1} />
                            <div id="image-container">
                                <input type="file" id="imageFile" onChange={this.imageUpdate} />
                            </div>
                            <br />

                        </div>
                    )}
            </div>);
    }
}
export default Display;