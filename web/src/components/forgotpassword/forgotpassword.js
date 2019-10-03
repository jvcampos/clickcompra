import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Message, Button, Segment, Form, Grid, Header } from 'semantic-ui-react'
import { toast, SemanticToastContainer } from 'react-semantic-toasts'
import forgotpassword from '../../server/forgotpassword'
import 'react-semantic-toasts/styles/react-semantic-alert.css';

export default class ForgotPassword extends Component {
  state = {
    email: '',
    loading: false
  }

  componentDidMount() {
    document.title = 'Recuperar Senha - ClickCompras';
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
  }, 100);
  }


  handleSubmit = async (e) => {
    this.setState({loading: true})
    e.preventDefault()
    const { email } = this.state;
    const result = await forgotpassword(email);
    if(result.status === 200){
      this.messageStatus('success', 'Enviado! Por favor verifique o seu email');
      this.setState({email: ''})
      this.props.history.push('/')
    } else{
      this.messageStatus('error', 'Porfavor tente novamente');
    }
    this.setState({loading: false})
    console.log(result)
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
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
                <Button className = "button_clickcompras"
                  color="blue"
                  fluid size="large"
                  loading={this.state.loading}>
                  Recuperar Senha
                </Button>
                  <Link to="/">Voltar</Link>
            </Segment>
            </Form>
        </Grid.Column>
        </Grid>
    </div>
    );
  }
}
