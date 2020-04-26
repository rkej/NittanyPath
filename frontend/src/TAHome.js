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
      teaching: "",
      team_id: 0
    };
    // this.onAdd.bind(this)
    this.getTACourseinfo.bind(this);
}
  componentDidMount(props){
    axios.post('/api/getCourseInfo', null, {
        params: {
          email: this.state.email
        }
      })
      .then(response => response.data)
      .then(json => this.setState({coursedata: json}))
    
    axios.post('/api/getTATeamID', null, {
      params: {
        email: this.state.email
      }
    })
    .then(response => response.data)
      .then(json => this.setState({team_id: json}, () => {axios.post('/api/getTACourseInfo', null, {
        params: {
          team_id: this.state.team_id
        }
      })
      .then(response => response.data)
      .then(json => this.setState({teaching: json}))}))
  }
  getTACourseinfo(){
    axios.post('/api/getTACourseInfo', null, {
        params: {
          team_id: this.state.team_id
        }
      })
      .then(response => response.data)
      .then(json => this.setState({teaching: json}))
  }
  
  
  render() {
    // this.getTACourseinfo();
    var coursedata = this.state.coursedata[0]
    var teaching = this.state.teaching
    var href_home = "dashTA?" + this.state.email
    var href_course1 = "studcourse?course=" + coursedata[0] + "&email=" + this.state.email
    var href_course2 = "studcourse?course=" + coursedata[4] + "&email=" + this.state.email
    var href_course3 = "studcourse?course=" + coursedata[8] + "&email=" + this.state.email
    var href_teaching1 = "TACourse?course=" + teaching + "&section=1" + "&email=" + this.state.email
    var href_teaching2 = "TACourse?course=" + teaching + "&section=2" + "&email=" + this.state.email
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
                <DropdownItem href = {href_teaching1}>
                  {teaching} SEC 1
                </DropdownItem>
                <DropdownItem href = {href_teaching2}>
                  {teaching} SEC 2
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
    <br/>
    <CardDeck style = {{width: "55%", margin: "auto"}}>
      <Card>
        <CardImg top width="100%" style={{"height": "50%"}} src={blue} />
        <CardBody>
          <CardTitle><strong>{teaching}</strong></CardTitle>
          <CardSubtitle>Section 1</CardSubtitle>
  <CardText>You have TA's access to teach this course.</CardText>
          <Button color = "primary" href = {href_teaching1}>View</Button>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" style={{"height": "50%"}}src={red}/>
        <CardBody>
          <CardTitle><strong>{teaching}</strong></CardTitle>
          <CardSubtitle>Section 2</CardSubtitle>
  <CardText>You have TA's access to teach this course.</CardText>
          <Button color = "primary" href = {href_teaching2}>View</Button>
        </CardBody>
      </Card>
      
    </CardDeck>
    <br/><br/><br/><br/><br/>
    </div>

          
  }
}


