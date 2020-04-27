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
    DropdownItem, Card, Button,Table, CardHeader, CardText, CardDeck, Jumbotron, TabContent, TabPane, Row, Col, ListGroup, ListGroupItem,
    CardSubtitle, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, 
    NavLink } from 'reactstrap';
import axios from 'axios';

export default class StudCourse extends Component {
    
  constructor(props){
   
  
    super(props);
    this.toggleComment = this.toggleComment.bind(this)
    this.getComments = this.getComments.bind(this)
    var urlSearchParams = new URLSearchParams(window.location.search);
    this.state = {
      coursedata: [[]],
      profdata: [[]], 

      email: urlSearchParams.get("email"), 
      course: urlSearchParams.get("course"),
      teaching: "",
      activeTab: 1,
      grading: [],
      team_id: 0, 
      grades: [],
      gh: false, 
      hw_avg: [], 
      exam_avg: [], 
      hw: 0, 
      ex: 0, 
      postdata: [], 
      post: "", 
      comment: "", 
      modelComment: false, 
      comments: []
    };
    // this.getComments.bind(this)
    // this.onAdd.bind(this)
}
handleInputChange(event) {
  const target = event.target;
  const name = target.name;
  const value = target.value;
  this.setState({
      [name]: value
  });
}
    toggleComment(){
      this.setState({modelComment: !this.state.modelComment})
    }
    toggleTab(tab) {
        this.setState({activeTab: tab});
    }
    getComments(event){
      this.setState({modelComment: !this.state.modelComment})
      var grade = event.target.dataset['id']
      axios.post("/api/getComments", null, {
        params: {
          post_id: grade
        }
      })
      .then(response => response.data)
      .then(json => this.setState({comments: json}))
    
    }
   
    togglecourse() {
        const{gh} = this.state
        this.setState({gh: !gh})
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
      axios.post('api/getAssInfo', null, {
          params: {
              email: this.state.email, 
              course: this.state.course
          }
      })
      .then(response => response.data)
      .then(json => this.setState({grading: json}, () => {
        this.state.grading.forEach(function(x, i){
          console.log(x)
          var course1 = x.course 
          var hw_num1= x.hw_num
          let{hw_avg} = this.state
          let{exam_avg} = this.state
          axios.post("api/getHWAvg", null, {
            params:{
            course: course1, 
            hw_num: hw_num1
            }
          })
          .then(response => response.data)
          .then(json => hw_avg.push(json), () => this.setState({hw_avg: hw_avg}))
          axios.post("api/getExamAvg", null, {
            params:{
            course: x.course, 
            exam_num: x.exam_num
            }
          })
          .then(response => response.data)
          .then(json => exam_avg.push(json), () => this.setState({exam_avg: exam_avg}))
        }, this)

      }))
      axios.post("/api/getPosts", null, {
        params: {
          course: this.state.course
        }
      }).then(response => response.data)
      .then(json => this.setState({postdata: json}))

      }
      
  
  
  

  
  render() {
      var comments = this.state.comments
      var commentrows = comments.map(function(comment){ return(
      <p>{comment.comment_email} commented: <br/>{comment.comment}<hr/></p>)
      })
      const {gh} = this.state
      var getComments = (event) => this.getComments(event)
      var toggleComment = () => this.toggleComment
    // this.getTACourseinfo();
    var coursedata = this.state.coursedata[0]
    var profdata = this.state.profdata[0]
    var drop = this.state.profdata[1]
    var ind = coursedata.indexOf(this.state.course)
    var teaching = this.state.teaching
    var tr = this.state.gh
    var hw = this.state.hw_avg
    var exam = this.state.exam_avg
    var href_home = "dashTA?" + this.state.email
    var href_course1 = "studcourse?course=" + coursedata[0] + "&email=" + this.state.email
    var href_course2 = "studcourse?course=" + coursedata[4] + "&email=" + this.state.email
    var href_course3 = "studcourse?course=" + coursedata[8] + "&email=" + this.state.email
    var grading = this.state.grading
    var posts = this.state.postdata
    var postrows = posts.map(function(post){
    return (<Card style={{width:"50%", margin: "auto"}}><CardHeader>{post.post_email} posted: <br/>{post.post}</CardHeader><CardBody><Button data-id={post.post_id} color = "secondary" onClick = {getComments} size = "sm">Comments</Button></CardBody></Card>)
    })
    
    var scorerows = grading.map(function(grade){
        return (<tr>
            <td>Homework {grade.hw_num}</td>
            <td>{grade.hw_grade}</td>
        <td>{hw[grade.hw_num - 1]}</td>
            </tr>)
            
    })
    var examrows = grading.map(function(grade){
      return (<tr>
          <td>Exam {grade.exam_num}</td>
          <td>{grade.exam_grade}</td>
      <td>{exam[grade.exam_num - 1]}</td>
          </tr>)
          
  })
    var ass = grading.map(function(squad){
    return (<div><ListGroupItem action>Assignment {squad.hw_num}</ListGroupItem>
    <Collapse isOpen={gh}>
    <Card>
      <CardBody>
      {squad.hw_details}
      </CardBody>
    </Card>
  </Collapse></div>)})
  var exams = grading.map(function(squad){
    return (<div><ListGroupItem action>Exam {squad.exam_num}</ListGroupItem>
    <Collapse isOpen={gh}>
    <Card>
      <CardBody>
      {squad.exam_details}
      </CardBody>
    </Card>
  </Collapse></div>)
    });
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
         <Nav tabs={true} style = {{paddingTop: "1%"}}>
          <NavItem>
            <NavLink
              className={this.getActive(1)}
              onClick={() => this.toggleTab(1)}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            
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
          <NavItem>
            <NavLink
              className={this.getActive(5)}
              onClick={() => this.toggleTab(5)}>
              Forum
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId={1}>
          <Jumbotron style = {{paddingTop: "2rem", paddingRight: "2rem", paddingBottom: "6rem", paddingLeft: "2rem"}}>
  <h3 >{coursedata[ind]}: {coursedata[ind + 1]}  - Section {coursedata[3]}</h3>
  <p className="lead">This is a {coursedata[ind + 2]} Drop Deadline is: {drop}</p>
  <p><h5><strong>Professor's Information:</strong></h5></p>
        <hr className="my-2" />
  <p><strong>Name:</strong> {profdata[0]}<br/><strong>Email:</strong> {profdata[1]}<br/><strong>Office:</strong> {profdata[2]}</p><br/><br/><br/><br/><br/><br/>
      </Jumbotron>
          </TabPane>
          <TabPane tabId={2}>
            History
          </TabPane>
          
          <TabPane tabId = {3}>
              <Jumbotron style = {{paddingTop: "1rem", paddingRight: "2rem", paddingBottom: "14rem", paddingLeft: "1rem"}}>
              <Button color="info" onClick={() => this.togglecourse()} style={{ marginBottom: '1rem' }}>Expand</Button>
                  <h5>Assignments</h5><hr className="my-2"></hr>
                  <p>
                  <ListGroup>
                    {ass}
                  </ListGroup></p>
                  <h5>Exams</h5><hr className="my-2"></hr>
                  <p>
                  <ListGroup>
                    {exams}
                  </ListGroup></p>

      </Jumbotron>
          </TabPane>
          <TabPane tabId = {4}>
            <Jumbotron style = {{paddingTop: "2rem", paddingRight: "2rem", paddingBottom: "14rem", paddingLeft: "2rem"}}>
      <Card style={{width:"50%", margin: "auto"}}>

                <CardHeader><strong>Grades</strong></CardHeader>

                <CardBody>
                  
                <Table style = {{marginBottom: "-5%"}}>
      <thead>
        <tr>
          <th >Assigmnent</th>
          <th >Score</th>
          <th >Class Average</th>
        </tr>
      </thead>
      <tbody>
        {scorerows}
        {examrows}
        <br/>
        </tbody>
    </Table>
    </CardBody></Card></Jumbotron></TabPane>
    <TabPane tabId = {5}>
            <Jumbotron style = {{paddingTop: "2rem", paddingRight: "2rem", paddingBottom: "14rem", paddingLeft: "2rem"}}>
  {postrows}</Jumbotron>
  <Modal isOpen = {this.state.modelComment} toggle={this.toggle} className={this.props.className}>
          <ModalBody>
            {commentrows}
            <Form>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Input id = "comment" name = "comment" onChange = {this.handleChange} />
      </FormGroup>
      
    </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.onFormSubmit} >
              Comment
            </Button>
            <Button color="secondary" onClick={this.toggleComment}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
          </TabPane>
        </TabContent>
        
         </div>
  } } 
