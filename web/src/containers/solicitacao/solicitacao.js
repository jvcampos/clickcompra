import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Message, Button, Segment, Form, Grid, Header } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import { Formik } from 'formik'
import * as yup from 'yup'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ActionSolicitation from '../../store/actions/solicitation'

import "./solicitacao.css"

class Solicitacao extends Component {
  state = {
    blurCnpj: null,
    blurSocialReason: null,
    blurAddressSupermarket: null,
    blurEmailSupermarket: null,
    blurYearFoundation: null,
    blurCpf: null,
    blurName: null,
    blurAddress: null,
    blurEmail: null,
    blurPassword: null,
    supermarket: {
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

  handleSubmit = (e) => {
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
        [e.target.name]: e.target.value
      }
    })
  }

  handleChangeManager = (e) => {
    this.setState({
      manager: {
        ...this.state.manager,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
    const numberRegex = /[0-9]/g
    const validationSchema = yup.object().shape({
      cnpj: yup.string()
        .matches(numberRegex, 'Informação inválida, somente número')
        .min(14, 'Mínimo de 14 caracteres')
        .max(14, 'Máximo de 14 caracteres')
        .required('Cnpj é uma informação obrigatória'),
      social_reason: yup.string()
        .min(5, 'Mínimo de 5 caracteres')
        .max(80, 'Máximo de 80 caracteres')
        .required('Razão Social é uma informação obrigatória'),
      address_supermarket: yup.string()
        .min(5, 'Mínimo de 5 caracteres')
        .max(150, 'Máximo de 150 caracteres')
        .required('Endereço é uma informação obrigatória'),
      email_supermarket: yup.string()
        .email('Digite um email válido')
        .max(254, 'Máximo de 254 caracteres')
        .required('Email é uma informação obrigatória'),
      year_foundation: yup.string()
        .min(4, 'Mínimo de 4 caracteres')
        .max(4, 'Máximo de 4 caracteres')
        .required('Ano de fundação é uma informação obrigatória'),
      cpf: yup.string()
        .matches(numberRegex, 'Informação inválida, somente número')
        .min(11, 'Mínimo de 11 caracteres')
        .max(11, 'Máximo de 11 caracteres')
        .required('Cpf é uma informação obrigatória'),
      name: yup.string()
        .min(5, 'Mínimo de 5 caracteres')
        .max(80, 'Máximo de 80 caracteres')
        .required('Nome é uma informação obrigatória'),
      address: yup.string()
        .min(5, 'Mínimo de 5 caracteres')
        .max(150, 'Máximo de 150 caracteres')
        .required('Endereço é uma informação obrigatória'),
      email: yup.string()
        .email('Digite um email válido')
        .max(254, 'Máximo de 254 caracteres')
        .required('Email é uma informação obrigatória'),
      password: yup.string()
        .min(8, 'Mínimo de 8 caracteres')
        .max(80, 'Máximo de 80 caracteres')
        .required('Senha é uma informação obrigatória'),
    })
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
              <img className="img_logo" src={require('../../assets/login/logo.png')} alt="logo" />
            </Header>
            <Form onSubmit={this.handleSubmit} size='large'>
              <Segment stacked>
                <Header>SUPERMERCADO</Header>
                <Formik
                  validationSchema={validationSchema}
                >
                  {formikProps => (
                    <>
                      <Form.Input
                        name="social_reason"
                        onChange={e => {
                          this.handleChangeSupermarket(e)
                          this.setState({ blurSocialReason: true })
                        }}
                        onInput={formikProps.handleChange('social_reason')}
                        value={this.state.supermarket.social_reason}
                        fluid
                        placeholder='RAZÃO SOCIAL'
                      />
                      {this.state.blurSocialReason && formikProps.errors.social_reason &&
                        <p style={{ color: "#ff0000", marginTop: '-15px' }}>
                          {formikProps.errors.social_reason}
                        </p>
                      }
                      <Form.Input
                        name="cnpj"
                        onChange={e => {
                          this.handleChangeSupermarket(e)
                          this.setState({ blurCnpj: true })
                        }}
                        onInput={formikProps.handleChange('cnpj')}
                        value={this.state.supermarket.cnpj}
                        fluid
                        placeholder='CNPJ'
                        type='text'
                      />
                      {this.state.blurCnpj && formikProps.errors.cnpj &&
                        <p style={{ color: "#ff0000", marginTop: '-15px' }}>
                          {formikProps.errors.cnpj}
                        </p>
                      }
                      <Form.Input
                        name="address_supermarket"
                        onChange={e => {
                          this.handleChangeSupermarket(e)
                          this.setState({ blurAddressSupermarket: true })
                        }}
                        onInput={formikProps.handleChange('address_supermarket')}
                        value={this.state.supermarket.address_supermarket}
                        fluid
                        placeholder='ENDEREÇO'
                        type='text'
                      />
                      {this.state.blurAddressSupermarket && formikProps.errors.address_supermarket &&
                        <p style={{ color: "#ff0000", marginTop: '-15px' }}>
                          {formikProps.errors.address_supermarket}
                        </p>
                      }
                      <Form.Input
                        name="email_supermarket"
                        onChange={e => {
                          this.handleChangeSupermarket(e)
                          this.setState({ blurEmailSupermarket: true })
                        }}
                        onInput={formikProps.handleChange('email_supermarket')} value={this.state.supermarket.email_supermarket}
                        fluid
                        placeholder='EMAIL'
                        type='email'
                      />
                      {this.state.blurEmailSupermarket && formikProps.errors.email_supermarket &&
                        <p style={{ color: "#ff0000", marginTop: '-15px' }}>
                          {formikProps.errors.email_supermarket}
                        </p>
                      }
                      <Form.Input
                        name="year_foundation"
                        onChange={e => {
                          this.handleChangeSupermarket(e)
                          this.setState({ blurYearFoundation: true })
                        }}
                        onInput={formikProps.handleChange('year_foundation')}
                        value={this.state.supermarket.year_foundation}
                        fluid
                        placeholder='ANO DE FUNDAÇÃO'
                        type='text'
                      />
                      {this.state.blurYearFoundation && formikProps.errors.year_foundation &&
                        <p style={{ color: "#ff0000", marginTop: '-15px' }}>
                          {formikProps.errors.year_foundation}
                        </p>
                      }
                      <Header>GERENTE</Header>
                      <Form.Input
                        name="name"
                        onChange={e => {
                          this.handleChangeManager(e)
                          this.setState({ blurName: true })
                        }}
                        onInput={formikProps.handleChange('name')} value={this.state.manager.name}
                        fluid
                        placeholder='NOME'
                        type='text'
                      />
                      {this.state.blurName && formikProps.errors.name &&
                        <p style={{ color: "#ff0000", marginTop: '-15px' }}>
                          {formikProps.errors.name}
                        </p>
                      }
                      <Form.Input
                        name="cpf"
                        onChange={e => {
                          this.handleChangeManager(e)
                          this.setState({ blurCpf: true })
                        }}
                        onInput={formikProps.handleChange('cpf')} value={this.state.manager.cpf}
                        fluid
                        placeholder='CPF'
                        type='text'
                      />
                      {this.state.blurCpf && formikProps.errors.cpf &&
                        <p style={{ color: "#ff0000", marginTop: '-15px' }}>
                          {formikProps.errors.cpf}
                        </p>
                      }
                      <Form.Input
                        name="address"
                        onChange={e => {
                          this.handleChangeManager(e)
                          this.setState({ blurAddress: true })
                        }}
                        onInput={formikProps.handleChange('address')}
                        value={this.state.manager.address}
                        fluid
                        placeholder='ENDEREÇO'
                        type='text'
                      />
                      {this.state.blurAddress && formikProps.errors.address &&
                        <p style={{ color: "#ff0000", marginTop: '-15px' }}>
                          {formikProps.errors.address}
                        </p>
                      }
                      <Form.Input
                        name="email"
                        onChange={e => {
                          this.handleChangeManager(e)
                          this.setState({ blurEmail: true })
                        }}
                        onInput={formikProps.handleChange('email')}
                        value={this.state.manager.email}
                        fluid
                        placeholder='EMAIL'
                        type='text'
                      />
                      {this.state.blurEmail && formikProps.errors.email &&
                        <p style={{ color: "#ff0000", marginTop: '-15px' }}>
                          {formikProps.errors.email}
                        </p>
                      }
                      <Form.Input
                        name="password"
                        onChange={e => {
                          this.handleChangeManager(e)
                          this.setState({ blurPassword: true })
                        }}
                        onInput={formikProps.handleChange('password')}
                        value={this.state.manager.password}
                        fluid
                        placeholder='SENHA'
                        type='password'
                      />
                      {this.state.blurPassword && formikProps.errors.password &&
                        <p style={{ color: "#ff0000", marginTop: '-15px' }}>
                          {formikProps.errors.password}
                        </p>
                      }
                      <Button className="button_clickcompras"
                        color="blue"
                        fluid size="large"
                        loading={this.state.statusLoading}>
                        SOLICITAR CADASTRO
                    </Button>
                      <Message>
                        Cancelar solicitacao ? <Link to="/">Voltar ao login</Link>
                      </Message>
                    </>
                  )}
                </Formik>
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
  bindActionCreators({ solicitation: ActionSolicitation }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Solicitacao);
