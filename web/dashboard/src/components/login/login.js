import React, { Component } from 'react';
import { Button, Segment, Form, Grid, Header } from 'semantic-ui-react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ActionLogin from '../../store/actions/login'

import "./login.css"

class Login extends Component {
  state = {
    email: '',
    password: ''
  }
  
  handleVerifyAcess = () => {
    console.log(this.props.data)
  }

  handleSubmit = () =>{
    this.props.login(this.state.email, this.state.password)
    this.setState({ email: '', password: '' })
    this.handleVerifyAcess()
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }


  render() {
    return (
      <div className="login-form">
        <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
            height: 100.60%;
        }
        `}
        </style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header a s='h2' color='blue' textAlign='center'>
            <img className="img_logo" src={require('../../assets/login/logo.png')} alt="logo"/>
            </Header>
            <Form onSubmit={this.handleSubmit} size='large'>
            <Segment stacked>
                <Form.Input name="email" onChange={this.handleChange} value={this.state.email} fluid icon='user' iconPosition='left' placeholder='E-MAIL' />
                <Form.Input
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='SENHA'
                type='password'
                />
                <Button className="button_clickcompras" color="blue" fluid size="large">
                    ACESSAR PAINEL
                </Button>
            </Segment>
            </Form>
        </Grid.Column>
        </Grid>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.login,
});


const mapDispatchToProps = dispatch =>
  bindActionCreators({ login : ActionLogin } , dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Login);
