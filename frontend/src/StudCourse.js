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
    DropdownItem, Card, Button, CardImg, CardTitle, CardText, CardDeck, Jumbotron, TabContent, TabPane, Row, Col,
    CardSubtitle, CardBody,
    NavLink } from 'reactstrap';
import axios from 'axios';

export default class StudCourse extends Component {
    
  constructor(props){
   
  
    super(props);
    var urlSearchParams = new URLSearchParams(window.location.search);
    this.state = {
      coursedata: [[]],
      profdata: [[]], 
      email: urlSearchParams.get("email"), 
      course: urlSearchParams.get("course"),
      teaching: "",
      activeTab: 1,

      team_id: 0
    };
    // this.onAdd.bind(this)
    this.getTACourseinfo.bind(this);
}
    toggleTab(tab) {
        this.setState({activeTab: tab});
    }
    getActive = (tab) => {
        if(this.state.activeTab === tab) {
          return 'active';
        }
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
      axios.post('api/getProfInfo', null, {
          params: {
              course: this.state.course
          }
      }).then(response => response.data)
      .then(json => this.setState({profdata: json}))
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
    var profdata = this.state.profdata[0]
    var drop = this.state.profdata[1]
    var ind = coursedata.indexOf(this.state.course)
    var teaching = this.state.teaching
    var href_home = "dashTA?" + this.state.email
    var href_course1 = "studcourse?course=" + coursedata[0] + "&email=" + this.state.email
    var href_course2 = "studcourse?course=" + coursedata[4] + "&email=" + this.state.email
    var href_course3 = "studcourse?course=" + coursedata[8] + "&email=" + this.state.email
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
         <br/>
         <Nav tabs={true}>
          <NavItem>
            <NavLink
              className={this.getActive(1)}
              onClick={() => this.toggleTab(1)}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.getActive(2)}
              onClick={() => this.toggleTab(2)}>
              Announcements
            </NavLink>
          </NavItem>
        <NavItem>
            <NavLink
              className={this.getActive(3)}
              onClick={() => this.toggleTab(3)}>
              Assignments
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.getActive(4)}
              onClick={() => this.toggleTab(4)}>
              Scores
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId={1}>
          <Jumbotron style = {{paddingTop: "2rem", paddingRight: "2rem", paddingBottom: "5rem", paddingLeft: "2rem"}}>
  <h3 >{coursedata[ind]}: {coursedata[ind + 1]}  - Section {coursedata[3]}</h3>
  <p className="lead">This is a {coursedata[ind + 2]} Drop Deadline is: {drop}</p>
  <p><h5><strong>Professor's Information:</strong></h5></p>
        <hr className="my-2" />
  <p><strong>Name:</strong> {profdata[0]}<br/><strong>Email:</strong> {profdata[1]}<br/><strong>Office:</strong> {profdata[2]}</p><br/><br/><br/><br/><br/><br/><br/>
      </Jumbotron>
          </TabPane>
          <TabPane tabId={2}>
            History
          </TabPane>
        </TabContent>
         </div>
  }}