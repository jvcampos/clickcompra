import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Message, Button, Segment, Form, Grid, Header } from 'semantic-ui-react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ActionSolicitation from '../../store/actions/solicitation'

import "./solicitacao.css"

class Solicitacao extends Component {
  state = {
    supermarket : {
      cnpj: '',
      name: '',
      address: '',
      email: '',
      year_foundation: '',
    },
    manager: {
      cpf: '',
      name: '',
      address: '',
      email: '',
      password: '',
      role: 1,
      status: 2,
    },
    statusMessageError: 'hidden'
  }

  componentDidMount() {
    document.title = 'Solicitacao - ClickCompras';
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <Message negative style={{ visibility: `${this.state.statusMessageError}` }}>
          <Message.Header>{this.props.errorMessage.error}</Message.Header>
        </Message>
      );
    }
  }

handleSubmit = (e) =>{
    e.preventDefault()
    this.props.solicitation(this.state)
    this.setState({ statusLoading: true })
    setTimeout(() => {
      this.setState({ statusLoading: false })
    }, 1400)
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleChangeSupermarket = (e) => {
    this.setState({
      supermarket: {
        ...this.state.supermarket,
        [e.target.name] : e.target.value
      }
    })
  }

  handleChangeManager = (e) => {
    this.setState({
      manager: {
        ...this.state.manager,
        [e.target.name] : e.target.value
      }
    })
  }

  render() {
    return (
      <div className="login-form-solicitacao">
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
              <Header>SUPERMERCADO</Header>
                <Form.Input name="name" onChange={this.handleChangeSupermarket} value={this.state.supermarket.name} fluid icon='user' iconPosition='left' placeholder='RAZÃO SOCIAL' />
                <Form.Input
                    name="cnpj"
                    onChange={this.handleChangeSupermarket}
                    value={this.state.supermarket.cnpj}
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='CNPJ'
                    type='text'
                    />
                <Form.Input
                    name="address"
                    onChange={this.handleChangeSupermarket}
                    value={this.state.supermarket.address}
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='ENDEREÇO'
                    type='text'
                    />
                <Form.Input
                    name="email"
                    onChange={this.handleChangeSupermarket}
                    value={this.state.supermarket.email}
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='EMAIL'
                    type='email'
                    />
                <Form.Input
                    name="year_foundation"
                    onChange={this.handleChangeSupermarket}
                    value={this.state.supermarket.year_foundation}
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='ANO DE FUNDAÇÃO'
                    type='text'
                    />
                <Header>GERENTE</Header>
                <Form.Input
                    name="name"
                    onChange={this.handleChangeManager}
                    value={this.state.manager.name}
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='NOME'
                    type='text'
                    />
                  <Form.Input
                    name="cpf"
                    onChange={this.handleChangeManager}
                    value={this.state.manager.cpf}
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='CPF'
                    type='text'
                    />
                  <Form.Input
                    name="address"
                    onChange={this.handleChangeManager}
                    value={this.state.manager.address}
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='ENDEREÇO'
                    type='text'
                    />
                  <Form.Input
                    name="email"
                    onChange={this.handleChangeManager}
                    value={this.state.manager.email}
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='EMAIL'
                    type='text'
                    />
                  <Form.Input
                    name="password"
                    onChange={this.handleChangeManager}
                    value={this.state.manager.password}
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='SENHA'
                    type='password'
                    />
                <Button className = "button_clickcompras"
                  color = "blue"
                  fluid size = "large"
                  loading={this.state.statusLoading}>
                  SOLICITAR CADASTRO
                </Button>
                  <Message>
                    Cancelar solicitacao ? <Link to="/">Voltar ao login</Link>
                  </Message>
            </Segment>
                {this.renderAlert()}
            </Form>
        </Grid.Column>
        </Grid>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  solicitation: state.solicitation
});


const mapDispatchToProps = dispatch =>
  bindActionCreators({ solicitation : ActionSolicitation } , dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Solicitacao);
