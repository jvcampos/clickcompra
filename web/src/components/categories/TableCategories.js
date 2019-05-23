import React, { Component } from 'react';
import { Form, Popup, Table, Button, Modal, Icon, Header } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as categoriesActions from '../../store/actions/categories'

import './categories.css'

class TableCategories extends Component {
  state = {
    statusModalRemove : false,
    statusModalEdit: false,
    name_categorie: this.props.data.name_categorie,
    description: this.props.data.description,
  }

  componentDidMount() {
    console.log(this.state)
  }

  updateCategorie = (id) => {
    this.props.updateCategory(id, this.state.name_categorie, this.state.description)
    this.props.onUpdateCategory()
    this.showMessage('success', 'edit', 'Categoria alterada com sucesso !')
    this.closeModalEdit()
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
  }


  onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  openModalEdit = () => {
    this.setState({ statusModalEdit: true })
  }

  closeModalEdit = () => {
    this.setState({ statusModalEdit: false })
  }

  openModalRemove = () => {
    this.setState({ statusModalRemove: true })
  }

  closeModalRemove = () => {
    this.setState({ statusModalRemove: false })
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.data.name_categorie}</Table.Cell>
        <Table.Cell>{this.props.data.description}</Table.Cell>
        <Table.Cell textAlign="center">
          <Modal
            open={this.state.statusModalEdit}
            className="modal_dados_gerente"
            size="mini"
            trigger={
              <Popup
                content='Alterar categoria'
                trigger={
                  <Button onClick={this.openModalEdit} color="blue" icon>
                    <Icon name='edit'/>
                  </Button>
                }
              />
            }
            >
              <Modal.Header style={{ textAlign: 'center' }}>ALTERAR CATEGORIA
                <Header as='h3' color="blue" style={{ textAlign: 'center', paddingTop: '5px' }}>{this.props.data.name_categorie}</Header>
              </Modal.Header>
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
                  <Button negative icon='close' onClick={this.closeModalEdit} labelPosition='right' content="Cancelar"></Button>
                  <Button positive icon='checkmark'
                    loading={this.state.loadingAddCategorie}
                    onClick={() => this.updateCategorie(this.props.data.id)} labelPosition='right' content='Alterar' />
                </Modal.Actions>
              </Modal.Content>
            </Modal>
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
              <Header icon='close' content='Excluir Categoria' />
              <Modal.Content>
                <p>Você realmente deseja excluir a categoria
                  <span style={{ color: 'red', textTransform: 'uppercase', fontWeight: 'bold' }}> {this.props.data.name_categorie}</span> ?</p>
                <p>Todos os produtos que estão relacionados à esta categoria, serão removidos.</p>
              </Modal.Content>
              <Modal.Actions>
                <Button basic onClick={this.closeModalRemove} color='red' inverted>
                  <Icon name='remove' /> Cancelar
                </Button>
                <Button color='green' onClick={() => this.props.onDeleteCategory(this.props.data.id)} inverted>
                  <Icon name='checkmark' /> Confirmar
                </Button>
              </Modal.Actions>
            </Modal>
        </Table.Cell>
      <SemanticToastContainer />
      </Table.Row>
    );
  }
}

const mapStateToProps = state => ({
  dataCategories: state.categories
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(categoriesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TableCategories);
