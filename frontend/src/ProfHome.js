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
      teamdata: [], 
      email: this.props.location.search.substr(1), 
      
    };
    // this.onAdd.bind(this)
    
    
  }
  
  componentDidMount(props){
    axios.get('/api/getCSKData')
    .then(response => response.data)
    .then(json => this.setState({teamdata: json}))
    
    axios.post('api/getSquadData', null, {
      params: {
        email: this.state.email
      }
    })
    .then(response=>response.data)
    .then(json=> this.setState({squadData: json}))
    
  }
  
  
  render() {
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
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem href = "jk.com">
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
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
         <CardDeck style = {{width: "25%", margin: "auto"}}>
      <Card>
        <CardImg top width="100%" src={blue} />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
          <Button color = "primary">View</Button>
        </CardBody>
      </Card>
      
      
    </CardDeck>
    <br/><br/><br/>
    </div>

          
  }
}


