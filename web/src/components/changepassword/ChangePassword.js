import React, { Component } from 'react';
import {  Button, Segment, Form, Grid, Header } from 'semantic-ui-react'
import { toast, SemanticToastContainer } from 'react-semantic-toasts'
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3001/api/',
})

export default class ChangePassword extends Component {
  state = {
    newPassword: '',
    confirmPassword: '',
    loading: false,
  }

  componentDidMount() {
    document.title = 'Atualizar Senha - ClickCompras';
    this.getUser();
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

  getUser = async () => {
    const response = await api.get(`getUserToken/${this.props.match.params.token}`)
    console.log(response.data.data.email)
    this.setState({email: response.data.data.email})
  }

  handleSubmit = async (e) => {
    if(this.state.confirmPassword !== this.state.newPassword){
      this.messageStatus('error', 'As senha não são iguais. Por favor tente novamente.');
      return;
    }
    e.preventDefault()
    this.setState({loading: true})
    const { email, newPassword } = this.state;
    if(!newPassword) return;
    const result = await api.post('updatePassword', {email, newPassword});
    if(result.status === 200){
      this.messageStatus('success', 'Senha Atualizada com sucesso!');
      this.setState({newPassword: ''})
      this.props.history.push('/')
    } else{
      this.messageStatus('error', 'Porfavor tente novamente');
    }
    this.setState({loading: false})

  }

  handleChange = (e) => {
    console.log(e)
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    console.log('aqui')
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
                <Form.Input name="newPassword" onChange={this.handleChange} value={this.state.newPassword} fluid icon='user' iconPosition='left' placeholder='Nova Senha' maxLength={15} />
                <Form.Input name="confirmPassword" onChange={this.handleChange} value={this.state.confirmPassword} fluid icon='user' iconPosition='left' placeholder='Confirmar nova senha' maxLength={15} />
                <Button className = "button_clickcompras"
                  color="blue"
                  fluid size="large"
                  loading={this.state.loading}>
                  Atualizar Senha
                </Button>
            </Segment>
            </Form>
        </Grid.Column>
        </Grid>
    </div>
    );
  }
}
