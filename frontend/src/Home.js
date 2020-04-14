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
    DropdownItem, Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody,
    NavLink } from 'reactstrap';
import axios from 'axios';

import green from './assets/resize-green.jpg'
import blue from './assets/resize-blue.jpg'
import red from './assets/resize-red.png'
import yellow from './assets/resize-yellow.jpg'

export default class Home extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      coursedata: [[]], 
      email: this.props.location.search.substr(1), 
      
    };
    // this.onAdd.bind(this)
  }
  
  componentDidMount(props){
    axios.post('/api/getCourseInfo', null, {
      params: {
        email: this.state.email
      }
    })
    .then(response => response.data)
    .then(json => this.setState({coursedata: json}))
    
    
  }
  
  
  render() {
    var coursedata = this.state.coursedata[0]
    var href_course1 = "studcourse?" + coursedata[0] + "?" + this.state.email
    var href_course2 = "studcourse?" + coursedata[4] + "?" + this.state.email
    var href_course3 = "studcourse?" + coursedata[8] + "?" + this.state.email
    return <div style = {{backgroundColor: "#f9f9f9"}}> <Navbar style = {{backgroundColor: "#491d70"}} dark expand ="md">
    <NavbarBrand href = "/dashboard">CanvasPath</NavbarBrand>
    <NavbarToggler onClick={this.toggle}/>
    <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className = "ml-auto" navbar>
            <NavItem>
                <NavLink href = "/dashboard">Home</NavLink>
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
        <CardImg top width="100%" style={{"height": "50%"}} src={blue} />
        <CardBody>
          <CardTitle><strong>{coursedata[0]}</strong></CardTitle>
          <CardSubtitle>Section {coursedata[3]}</CardSubtitle>
  <CardText>Course Description: <br/>{coursedata[1]}</CardText>
          <Button color = "primary" href = {href_course1}>View</Button>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" style={{"height": "50%"}}src={red}/>
        <CardBody>
          <CardTitle><strong>{coursedata[4]}</strong></CardTitle>
          <CardSubtitle>Section {coursedata[7]}</CardSubtitle>
  <CardText>Course Description: <br/>{coursedata[5]}</CardText>
          <Button color = "primary" href = {href_course2}>View</Button>
        </CardBody>
      </Card>
      <Card>
      <CardImg top width="100%" style={{"height": "50%"}} src={yellow}/>
      <CardBody>
          <CardTitle><strong>{coursedata[8]}</strong></CardTitle>
          <CardSubtitle>Section {coursedata[11]}</CardSubtitle>
  <CardText>Course Description: <br/>{coursedata[9]}</CardText>
          <Button color = "primary" href = {href_course3}>View</Button>
        </CardBody>
      </Card>
      
    </CardDeck>
    <br/><br/><br/><br/><br/>
    </div>

          
  }
}


