import React, { Component } from 'react';
import { Button, Segment, Form, Grid, Header } from 'semantic-ui-react'

import "./login.css"

class Login extends Component {
  render() {
    return (
      <div className="login-form">
        <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
            height: 100.70%;
        }
        `}
        </style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header a s='h2' color='blue' textAlign='center'>
            <img className="img_logo" src={require('../../assets/login/logo.png')} alt="logo"/>
            </Header>
            <Form size='large'>
            <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-MAIL' />
                <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='SENHA'
                type='password'
                />
                <Button className="button_clickcompras" color="blue" fluid size="large">
                    Acessar painel
                </Button>
            </Segment>
            </Form>
        </Grid.Column>
        </Grid>
    </div>
    );
  }
}

export default Login;
