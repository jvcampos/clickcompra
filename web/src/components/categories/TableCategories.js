import React, { Component } from 'react';
import { Table, Modal, Button, Icon, Header } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as categoriesActions from '../../store/actions/categories'

import './categories.css'

class TableCategories extends Component {
  state = {
    statusModalRemove : false,
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
        <Table.Cell>100</Table.Cell>
        <Table.Cell>{this.props.data.description}</Table.Cell>
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
              <Header icon='close' content='Excluir Categoria' />
              <Modal.Content>
                <p>Você realmente deseja excluir a categoria selecionada ?</p>
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
