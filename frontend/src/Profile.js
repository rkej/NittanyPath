import React, { Component, useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Badge,
    UncontrolledDropdown, 
    DropdownToggle,
    DropdownMenu, 
    DropdownItem, Card, Button, CardImg, CardTitle, CardText, CardDeck, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Modal,
    CardSubtitle, CardBody,
    NavLink, 
    CardHeader} from 'reactstrap';
import axios from 'axios';

import green from './assets/resize-green.jpg'
import blue from './assets/resize-blue.jpg'
import red from './assets/resize-red.png'
import yellow from './assets/resize-yellow.jpg'

export default class Profile extends Component {
  
  constructor(props){
    super(props);
    this.togglepass = this.togglepass.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    var usp = new URLSearchParams(window.location.search)
    this.state = {
      coursedata: [[]], 
      studentdata: [[]],
      email: usp.get("email"), 
      modalopen: false,
      password: ""
    };
    // this.onAdd.bind(this)
  }
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
        [name]: value
    });}
  togglepass(){
      this.setState({modalopen: !this.state.modalopen})
  }
  onPass = event => {
    event.preventDefault();
    this.setState({modalopen: !this.state.modalopen})
    if(this.state.password==''){
        alert('Please check your input fields');
    }
    else{
    axios.post('/api/changePassword', null, {
        params: {
            email: this.state.email, 
            password: this.state.password,
        }
    })}
  }
  componentDidMount(props){
      axios.post("/api/getStudentInfo", null, {
          params: {
              email: this.state.email
          }
      })
      .then(response => response.data)
    .then(json => this.setState({studentdata: json}))
    axios.post('/api/getCourseInfo', null, {
      params: {
        email: this.state.email
      }
    })
    .then(response => response.data)
    .then(json => this.setState({coursedata: json}))
  }
  
  
  render() {
      var studentdata = this.state.studentdata[0]
    var coursedata = this.state.coursedata[0]
    var href_course1 = "studcourse?" + coursedata[0] + "&email=" + this.state.email
    var href_course2 = "studcourse?" + coursedata[4] + "&email=" + this.state.email
    var href_course3 = "studcourse?" + coursedata[8] + "&email=" + this.state.email
    var href_home = "dashTA?" + this.state.email
    return <div style = {{backgroundColor: "#f9f9f9"}}> <Navbar style = {{backgroundColor: "#491d70"}} dark expand ="md">
    <NavbarBrand href = {href_home}>NittanyPath</NavbarBrand>
    <NavbarToggler onClick={this.toggle}/>
    <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className = "ml-auto" navbar>
            <NavItem>
                <NavLink href = {href_home}>Dashboard</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Courses
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href = {href_course1}>
                  {coursedata[0]}
                </DropdownItem>
                <DropdownItem href = {href_course2}>
                  {coursedata[4]}
                </DropdownItem>
                <DropdownItem href = {href_course3}>
                  {coursedata[8]}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
                <NavLink href = "/">Logout</NavLink>
            </NavItem>
            
        </Nav> 
    </Collapse>
         </Navbar>
         <br/><br/>
         <CardDeck style = {{width: "80%", margin: "auto"}}>
      <Card>
          <CardHeader><strong>Your information</strong></CardHeader>
        <CardBody>
  <CardSubtitle><strong>Name:</strong> {studentdata[0]} <br/><strong>Email:</strong> {studentdata[1]}<br/><strong>Age:</strong> {studentdata[2]} <br/><strong>Major:</strong> {studentdata[9]} <br/><strong>Phone:</strong> {studentdata[4]} <br/><strong>Sex:</strong> {studentdata[5]}<br/><strong>Full address:</strong> {studentdata[8]}, {studentdata[6]}, {studentdata[7]}<br/></CardSubtitle><br/>
          <Button color = "danger" onClick = {this.togglepass}>Change password</Button>
        </CardBody>
      </Card>
      
      
    </CardDeck>
    <Modal isOpen = {this.state.modalopen} toggle={this.togglepass} className={this.props.className}>
          <ModalBody>
            <Form>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Input onChange = {this.handleInputChange} id = "password" name = "password" value = {this.state.password} type ="password" />
      </FormGroup>
      
    </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.onPass} >
              Change Password
            </Button>
            
            <Button color="secondary" onClick={this.togglepass}>
              Cancel
            </Button>
            </ModalFooter>
            </Modal>
    <br/><br/><br/><br/><br/>
    </div>

          
  }
}


