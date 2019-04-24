import React, { Component } from 'react';
import { Dimmer, Loader, Form, Table, Modal, Grid, Button, Icon, Header, Segment } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as categoriesActions from '../../store/actions/categories'

import MenuSuperior from '../menusuperior/Menusuperior'
import TableCategories from './TableCategories'

import './categories.css'

class Categories extends Component {
  state = {
    loading: true,
    loadingAddCategorie: false,
    statusModalAdd: false,
    statusModalRemove: false,
    name_categorie: '',
    description: '',
    categories: [],
    user_id: '',
    user_id_supermarket: ''
  }

  componentWillMount() {
    document.title = "Categorias | ClickCompras"
  }

  componentDidMount() {
    this.props.getCategories(localStorage.getItem('id'))
    this.refreshTable()
  }

  refreshTable = () => {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000);
    this.setState({ loading: true })
  }

  showMessage(type, icon, title) {
    setTimeout(() => {
      toast(
        {
          type,
          icon,
          animation: 'bounce',
          title,
        },
      );
    }, 1000);
    this.forceUpdate()
    this.setState({ name_categorie: '', description: ''})
  }

  onUpdateCategory = () => {
    this.refreshTable(true)
  }

  onDeleteCategory = (id) => {
    this.props.deleteCategory(id)
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000);
    this.showMessage('success' , 'cancel', 'Categoria deletada com sucesso !')
  }

  addCategorie = () => {
    const id_supermarket = localStorage.getItem('id_supermarket')
    this.setState({ statusModalAdd: false, loading: true })
    this.props.addCategorie(
      id_supermarket,
      this.state.name_categorie, this.state.description)
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000);
    this.showMessage('success', 'bullhorn', 'Categoria adicionada com sucesso !')
  }

  onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
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
        <MenuSuperior />
        <Segment>
          <Header as="h2">
            SEÇÃO DE CATEGORIAS
          </Header>
        </Segment>
        <Segment>
          <Grid verticalAlign='middle' textAlign='center' style={{ height: '90%' }}>
            <Grid.Column width={5} style={{ left: '-22.5%' }}>
              <Modal
                closeOnPortalMouseLeave={true}
                open={this.state.statusModalAdd}
                className="modal_dados_gerente"
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
                <Table
                  className="table_categories"
                  color={'green'}>
                  <Dimmer active={this.state.loading} inverted>
                    <Loader content="Buscando categorias..."/>
                  </Dimmer>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>NOME</Table.HeaderCell>
                      <Table.HeaderCell>QUANTIDADE DE PRODUTOS</Table.HeaderCell>
                      <Table.HeaderCell>DESCRIÇÃO</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">AÇÃO</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.props.dataCategories.map(categorie => {
                      return (
                        <TableCategories
                          onUpdateCategory={this.onUpdateCategory}
                          onDeleteCategory={this.onDeleteCategory}
                          data={categorie} />
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
  dataCategories: state.categories
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(categoriesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
