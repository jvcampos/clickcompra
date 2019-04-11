import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Message, Button, Segment, Form, Grid, Header } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ActionSolicitation from '../../store/actions/solicitation'

import "./solicitacao.css"

class Solicitacao extends Component {
  state = {
    supermarket : {
      cnpj: '',
      social_reason: '',
      address_supermarket: '',
      email_supermarket: '',
      year_foundation: '',
    },
    manager: {
      cpf: '',
      name: '',
      address: '',
      email: '',
      password: '',
      role: 2,
      status: 2,
    },
    statusMessageError: 'hidden'
  }

  componentDidMount() {
    document.title = 'Solicitacao - ClickCompras';
  }

  showMessage() {
    setTimeout(() => {
      toast(
        {
          type: `${this.props.messageStatus.status}`,
          icon: 'bullhorn',
          animation: 'pulse',
          title: `${this.props.messageStatus.title}`,
          description: `${this.props.messageStatus.message}`
        },
      );
      this.setState({ statusLoading: false, statusMessageError: 'visible', })
    }, 2000);
  }

handleSubmit = (e) =>{
    e.preventDefault()
    this.props.solicitation(this.state)
    this.setState({ statusLoading: true })
    this.showMessage()
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
              <Header>SUPERMERCADO</Header>
                <Form.Input name="social_reason" onChange={this.handleChangeSupermarket} value={this.state.supermarket.social_reason} fluid placeholder='RAZÃO SOCIAL' />
                <Form.Input
                    name="cnpj"
                    onChange={this.handleChangeSupermarket}
                    value={this.state.supermarket.cnpj}
                    fluid
                    placeholder='CNPJ'
                    type='text'
                    />
                <Form.Input
                    name="address_supermarket"
                    onChange={this.handleChangeSupermarket}
                    value={this.state.supermarket.address_supermarket}
                    fluid
                    placeholder='ENDEREÇO'
                    type='text'
                    />
                <Form.Input
                    name="email_supermarket"
                    onChange={this.handleChangeSupermarket}
                    value={this.state.supermarket.email_supermarket}
                    fluid
                    placeholder='EMAIL'
                    type='email'
                    />
                <Form.Input
                    name="year_foundation"
                    onChange={this.handleChangeSupermarket}
                    value={this.state.supermarket.year_foundation}
                    fluid
                    placeholder='ANO DE FUNDAÇÃO'
                    type='text'
                    />
                <Header>GERENTE</Header>
                <Form.Input
                    name="name"
                    onChange={this.handleChangeManager}
                    value={this.state.manager.name}
                    fluid
                    placeholder='NOME'
                    type='text'
                    />
                  <Form.Input
                    name="cpf"
                    onChange={this.handleChangeManager}
                    value={this.state.manager.cpf}
                    fluid
                    placeholder='CPF'
                    type='text'
                    />
                  <Form.Input
                    name="address"
                    onChange={this.handleChangeManager}
                    value={this.state.manager.address}
                    fluid
                    placeholder='ENDEREÇO'
                    type='text'
                    />
                  <Form.Input
                    name="email"
                    onChange={this.handleChangeManager}
                    value={this.state.manager.email}
                    fluid
                    placeholder='EMAIL'
                    type='text'
                    />
                  <Form.Input
                    name="password"
                    onChange={this.handleChangeManager}
                    value={this.state.manager.password}
                    fluid
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
            </Form>
        </Grid.Column>
        </Grid>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  messageStatus: state.solicitation
});


const mapDispatchToProps = dispatch =>
  bindActionCreators({ solicitation : ActionSolicitation } , dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Solicitacao);
