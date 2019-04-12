import React, { Component } from 'react';
import axios from 'axios';
import { Dimmer, Loader, Form, Table, Modal, Grid, Button, Icon, Header, Segment } from 'semantic-ui-react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as categoriesActions from '../../store/actions/categories'

import MenuSuperior from '../menusuperior/Menusuperior'

import './categories.css'

const api = axios.create({
  baseURL: 'http://localhost:3001/api/',
});

class Categories extends Component {
  state = {
    loading: true,
    statusModalAdd : false,
    statusModalRemove : false,
    name_categorie : '',
    description: '',
    categories : []
  }

  componentDidMount(){
    localStorage.setItem('token', this.props.dataLogin.token.token);
    document.title = "Categorias | ClickCompras"
    api.get(`categories/${this.props.dataLogin.id}` ,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
          this.fetchGetCategories(response)
      })
  }

  fetchGetCategories = (response) => {
    this.setState({ categories: response.data.data})
    setTimeout(() => {
      this.setState({ loading: false})
    }, 1000);
  }

  openModalAdd = () => {
    this.setState({ statusModalAdd: true })
  }
  openModalRemove = () => {
    this.setState({ statusModalRemove: true })
  }

  closeModalAdd = () => {
    this.setState({ statusModalAdd: false })
  }
  closeModalRemove = () => {
    this.setState({ statusModalRemove: false })
  }

  onSubmit = () => {
    alert('Submit !')
  }

  onHandleChange = (e) => {
    this.setState({
        [e.target.name] : e.target.value
    })
  }

  render() {
    return (
      <div>
        <MenuSuperior/>
        <Segment>
          <Header as="h2">
            SEÇÃO DE CATEGORIAS
          </Header>
        </Segment>
          <Segment>
          <Grid verticalAlign='middle' textAlign='center' style={{ height: '90%' }}>
              <Grid.Column width={5} style={{ left : '-22.5%'}}>
              <Modal
                open={this.state.statusModalAdd}
                className="modal_dados_gerente"
                dimmer="blurring"
                size="mini"
                trigger={
                  <Button onClick={this.openModalAdd} color="green" animated='vertical'>
                    <Button.Content visible>ADICIONAR NOVA CATEGORIA</Button.Content>
                    <Button.Content hidden>
                      <Icon name='add' />
                    </Button.Content>
                  </Button>}
                >
                <Modal.Header style={{ textAlign: 'center' }}>ADICIONAR NOVA CATEGORIA</Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <Header as='h3'>NOME</Header>
                      <Form.Input
                        onChange={this.onHandleChange}
                        value={this.state.name_categorie}
                        name="name_categorie"
                        fluid icon='tag' iconPosition='left'
                        placeholder='NOME' />
                      <Header as='h3'>DESCRIÇÃO</Header>
                      <Form.TextArea style={{
                        width: '318px',
                        maxWidth: '318px',
                        height: '68px',
                        maxHeight: '100px',
                        margin: '0px',
                        borderRadius: '6px',
                        borderColor: '#c1bfbfbd',
                      }}
                      onChange={this.onHandleChange}
                      value={this.state.description}
                      name="description"
                      rows={3}
                      placeholder="Descrição da categoria"></Form.TextArea>
                    </Modal.Description>
                    <Modal.Actions style={{ marginTop: '10px' }}>
                      <Button negative icon='close' onClick={this.closeModalAdd} labelPosition='right' content="Cancelar"></Button>
                      <Button positive icon='checkmark' onClick={this.onSubmit} labelPosition='right' content='Confirmar' />
                    </Modal.Actions>
                  </Modal.Content>
                </Modal>
              </Grid.Column>
            <Grid.Row>
              <Grid.Column width={10}>
              <Table
                className="table_categories"
                color={'green'}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>NOME</Table.HeaderCell>
                    <Table.HeaderCell>QUANTIDADE DE PRODUTOS</Table.HeaderCell>
                    <Table.HeaderCell>DESCRIÇÃO</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">AÇÃO</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.state.categories.map(categorie => {
                    return (
                      <Table.Row>
                        <Dimmer active={this.state.loading} inverted>
                          <Loader content="Buscando categorias..."/>
                        </Dimmer>
                        <Table.Cell>{categorie.name_categorie}</Table.Cell>
                        <Table.Cell>0</Table.Cell>
                        <Table.Cell>{categorie.description}</Table.Cell>
                        <Table.Cell textAlign="center">
                            <Modal
                            basic size='small'
                            dimmer="blurring"
                            open={this.state.statusModalRemove}
                            trigger={
                              <Button onClick={this.openModalRemove} size="small" color="red" animated='fade'>
                                <Button.Content visible>EXCLUIR</Button.Content>
                                <Button.Content hidden><Icon name='close'/></Button.Content>
                              </Button>}
                            >
                              <Header icon='close' content='Excluir Categoria XXXXXX' />
                              <Modal.Content>
                                <p>Você realmente deseja excluir a categoria selecionada ?</p>
                                <p>Todos os produtos que estão relacionados à esta categoria, serão removidos.</p>
                              </Modal.Content>
                              <Modal.Actions>
                                <Button basic onClick={this.closeModalRemove} color='red' inverted>
                                  <Icon name='remove' /> Cancelar
                                </Button>
                                <Button color='green' onClick={this.onSubmit} inverted>
                                  <Icon name='checkmark' /> Confirmar
                                </Button>
                              </Modal.Actions>
                            </Modal>
                          </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataLogin: state.login,
  // categories: state.categories
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(categoriesActions, dispatch);

export default connect( mapStateToProps, mapDispatchToProps)(Categories);
