import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EntryItem from "./Entry";
import Display from "./display"
const data = {};


if (!localStorage.getItem('data')) {
  localStorage.setItem('data', JSON.stringify(data))
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(localStorage.getItem('data')),
      imgD:""
    }
   console.log(this.state.data)
    this.onAdd = this.onAdd.bind(this);
    this.getData = this.getData.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
   this.updateImage=this.updateImage.bind(this)
    this.imageUpload = this.imageUpload.bind(this);
    this.onChange=this.onChange.bind(this);
  }
  componentWillMount() {
    const data = this.getData();
    this.setState({ data })
  }
  getData() {
    return this.state.data;
  }
  onEditSubmit(name, description) {
    let data = this.getData(); 
    data.description = description;
    localStorage.setItem('data', JSON.stringify(data));
  }
  onChange(description){
    let data=this.getData();
    data.description = description;
    localStorage.setItem('data', JSON.stringify(data));

  }
  onAdd(name, description) {
    let data = this.getData();
    data.name = name
    data.description = description
    this.setState({ data })
    localStorage.setItem('data', JSON.stringify(data))
    window.location = window.location.origin + '/' + name 
  }
  imageUpload = (value) => {
    const file = value;
    getBase64(file).then(base64 => {
      localStorage.setItem('data1', JSON.stringify(base64))
      this.setState({imgD:base64})
      localStorage.setItem("data1",JSON.stringify(base64))
    });
  };
  updateImage =(value)=>{
    console.log(this.state.data)
    const file=value
    getBase64(file).then(base64 => {
      localStorage.setItem('data1', JSON.stringify(base64))
      this.setState({imgD:base64})
    });  
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/new" exact render={
            () => < EntryItem onAdd={this.onAdd} exact onUpload={this.imageUpload} />
          } />
          <Route path={`/${this.state.data.name}`}  render={
            () => < Display details={this.state.data} img={this.state.imgD} onchange={this.onChange} onEditSubmit={this.onEditSubmit}  onUpdate={this.updateImage}/>
          } />
          <Route path="/:name" render={
            () => (<p>Path not found</p>)
            // () => < Display details={this.state.data} onEditSubmit={this.onEditSubmit} />
          } />
        </Switch>
      </BrowserRouter>)
  }
}
let getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(file[0]);
  console.log(file)
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file[0])
  });
}
export default App;
