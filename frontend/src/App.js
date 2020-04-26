import React, {Component} from 'react';
import {Jumbotron, Container, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import './App.css';
import axios from 'axios';
import background from './assets/DSC_7774.jpg'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        error: 0, 
        team_id: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
}

handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
        [name]: value
    });
}

onFormSubmit = event => {
    event.preventDefault();
    if((this.state.email=='')|(this.state.password=='')){
        alert('Please check your input fields');
    }
    else{
    axios.post('/api/signin', null, {
        params: {
            email: this.state.email,
            password: this.state.password,
        }
    })
    .catch((err)=>{
        alert(err)
        this.state.error = 1
    })
    .then(response=>{
        if(this.state.error != 1){
            if(response.data == "Student"){
                this.props.history.push(`home?${this.state.email}`);}
            if(response.data == "TA"){
                axios.post('/api/getTATeamID', null, {
                    params: {
                      email: this.state.email
                    }
                  })
                  .then(response => response.data)
                    .then(json => this.setState({team_id: json}))
                this.props.history.push(`dashTA?${this.state.email}`);
            }
            if(response.data == "Professor"){
                this.props.history.push(`dashProf?${this.state.email}`);
            }
    }
}
    )
}

}
  render(){
  return <div><style>{'body { background-color: #491d70; }'}
    </style>
      <img src = {background} style={{width:"70%",height:"105.2%", left:"0px", position: "absolute"}}/>
      <Jumbotron fluid style={{marginLeft: "70%", backgroundColor: "#491d70", marginTop: "-2.5%", paddingRight: "10px"}}>
        <Container fluid><br></br><br></br>
  <h1 className="display-3" style={{color: "white", fontSize: "50px"}}>NittanyPath</h1><br></br>
          <p className="lead" style={{color: "white", fontSize: "20px"}}>Sign in to your online learning tool!</p><br></br>
          <Form>
                        <FormGroup>
                            <Label for="email" style={{color: 'white'}}>Email</Label>
                            <Input onChange={this.handleInputChange} style={{ width: "100%" }} type="email" name="email" id="email" value={this.state.email} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" style={{color: 'white'}} >Password</Label>
                            <Input onChange={this.handleInputChange} style={{ width: "100%" }} type="password" name="password" id="password" value={this.state.password} required />
                        </FormGroup>
                        <br></br> <br></br>
                        <Button style={{
                        verticalAlign: 'center',
                        margin: 'auto',
                        left:"0px",
                        padding: 10,
                        
                        
                        backgroundColor: "#FFD100",
                        color: "black", 
                        width: "100%"
                    }} type="submit" onClick={this.onFormSubmit}>Sign in</Button>
                    </Form>
        </Container>
      </Jumbotron>
    </div>
  
}
}

export default App;
