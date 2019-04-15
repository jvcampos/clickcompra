import React, { Component } from 'react';
import axios from 'axios';
import { Dimmer, Loader, Form, Table, Modal, Grid, Button, Icon, Header, Segment } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as categoriesActions from '../../store/actions/categories'

import MenuSuperior from '../menusuperior/Menusuperior'
import TableCategories from './TableCategories'

import './categories.css'

const api = axios.create({
  baseURL: 'http://localhost:3001/api/',
});

class Categories extends Component {
  state = {
    loading: true,
    loadingAddCategorie: false,
    statusModalAdd : false,
    statusModalRemove : false,
    name_categorie : '',
    description: '',
    categories : []
  }

  componentDidMount(){
    document.title = "Categorias | ClickCompras"
    api.get(`categories/${this.props.dataLogin.id}` ,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
          this.fetchGetCategories(response.data)
      })
  }

  showMessage() {
    setTimeout(() => {
      toast(
        {
          type: 'success',
          icon: 'bullhorn',
          animation: 'bounce',
          title: "Nova categoria adicionada !",
        },
      );
      this.setState({ statusLoading: false, statusMessageError: 'visible', })
    }, 1000);
  }

  fetchGetCategories = (response) => {
    this.setState({ categories: response.data})
    setTimeout(() => {
      this.setState({ loading: false})
    }, 1000);
  }
  
  fetchUpdateCategories = (response) => {
    this.showMessage()
    setTimeout(() => {
      this.setState({ categorie: response.data, loading: false })
    }, 1000);
  }

  addCategorie = () => {
    this.props.addCategorie(
      this.props.dataLogin.id_supermarket,
      this.state.description, this.state.name_categorie)
    this.setState({ loadingAddCategorie: true })
    setTimeout(() => {
      console.log('busco todas as categorias !')
      this.props.updateCategories(this.props.dataLogin.id)
      setTimeout(() => {
        console.log('busco meu state atualizado !')
        this.fetchUpdateCategories(this.props.dataCategories.categories)
        this.setState({ loadingAddCategorie: false, loading: true, statusModalAdd: false })
      }, 2000);
    }, 1000);
  }

  onHandleChange = (e) => {
    this.setState({
        [e.target.name] : e.target.value
    })
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

  render() {
    return (
      <div>
        <SemanticToastContainer />
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
                      <Button positive icon='checkmark' loading={this.state.loadingAddCategorie} onClick={this.addCategorie} labelPosition='right' content='Confirmar' />
                    </Modal.Actions>
                  </Modal.Content>
                </Modal>
              </Grid.Column>
            <Grid.Row>
              <Grid.Column width={10}>
                <TableCategories data={this.state.categories}/>
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
  dataCategories: state.categories
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(categoriesActions, dispatch);

export default connect( mapStateToProps, mapDispatchToProps)(Categories);
