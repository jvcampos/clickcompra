import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Message, Button, Segment, Form, Grid, Header } from 'semantic-ui-react'
import { toast, SemanticToastContainer } from 'react-semantic-toasts'
import login from '../../server/login'
import 'react-semantic-toasts/styles/react-semantic-alert.css';

import "./login.css"
export default class Login extends Component {
  state = {
    email: '',
    password: '',
    loading: false,
    statusMessageError: 'hidden',
    admin: false,
    commom: false
  }

  componentDidMount() {
    document.title = 'Log in - ClickCompras';
  }

  messageStatus = (type, title, description = '', time = 5000) => {
    setTimeout(() => {
      toast({
        type: type,
        icon: 'envelope',
        title: title,
        description: description,
        animation: 'bounce',
        time: time,
      });
    }, 1000);
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = this.state;
    if (email === '' || password === '') {
      this.setState({ loading: true })
      this.messageStatus('error', 'Campos não preenchidos', 'email ou password estão vazios!');
      this.setState({ loading: false })
    }
    else {
      try {
        this.setState({ loading: true })
        const result = await login(this.state.email, this.state.password);
        console.log(result)
        if (result.data.role === "ADMIN") {
          this.messageStatus('success', 'Seja Bem Vindo :D');
          localStorage.setItem('token', result.data.token.token);
          this.setState({admin: true })
        }
        else if (result.data.role === "CUSTOMER") {
          this.messageStatus('success', 'Seja Bem Vindo :D');
          localStorage.setItem('token', result.data.token.token);
          this.setState({ customer: true })
        }
        this.setState({ loading: false })
      } catch (error) {
        console.log(error)
        this.setState({ loading: true })
        this.messageStatus('warning', 'Você não tem autorização até o momento!');
        this.setState({ loading: false })
      }
      this.setState({ email: '', password: '' })
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    if (this.state.admin) {
      return <Redirect to="/admin" />
    }
    if (this.state.customer) {
      return <Redirect to="/home" />
    }
    return (
      <div className="login-form">
        <SemanticToastContainer />
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
                <Button className = "button_clickcompras"
                  color="blue"
                  fluid size="large"
                  loading={this.state.loading}>
                  ACESSAR PAINEL
                </Button>
                  <Message>
                    Quer se juntar ? <Link to="/solicitacao"> Realizar solicitação </Link>
                  </Message>
            </Segment>
            </Form>
        </Grid.Column>
        </Grid>
    </div>
    );
  }
}
