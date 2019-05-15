import React, { Component } from 'react';
import { Table, Modal, Icon, Button, Header } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as productsActions from '../../store/actions/products'

class TableProducts extends Component {
  state = {
    statusModalRemove: false,
  }

  componentWillMount = () => {
    console.log(this.props.data)
  }

  openModalRemove = () => {
    this.setState({ statusModalRemove: true })
  }

  closeModalRemove = () => {
    this.setState({ statusModalRemove: false })
  }

  render() {
    return (
      <Table.Body>
        <Table.Row key={this.props.data.id}>
          <Table.Cell><img style={{width: 90}} src={this.props.data.imageBase64} /></Table.Cell>
          <Table.Cell>{this.props.data.name_product}</Table.Cell>
          <Table.Cell>{this.props.data.name_category}</Table.Cell>
          <Table.Cell>{this.props.data.value}</Table.Cell>
          <Table.Cell>{this.props.data.amount}</Table.Cell>
          <Table.Cell>{this.props.data.description}</Table.Cell>
          <Table.Cell textAlign="center">
            <Modal
              basic size='small'
              dimmer="blurring"
              open={this.state.statusModalRemove}
              trigger={
                <Button onClick={this.openModalRemove} size="small" color="red" animated='fade'>
                  <Button.Content visible>EXCLUIR</Button.Content>
                  <Button.Content hidden><Icon name='close' /></Button.Content>
                </Button>}
            >
              <Header icon='close' content='Excluir Produto XXXXXX' />
              <Modal.Content>
                <p>Você realmente deseja excluir o produto selecionado ?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button basic onClick={this.closeModalRemove} color='red' inverted>
                  <Icon name='remove' /> Cancelar
                            </Button>
                <Button color='green' onClick={() => this.props.onDeleteProduct(this.props.data.id)} inverted>
                  <Icon name='checkmark' /> Confirmar
                </Button>
              </Modal.Actions>
            </Modal>
          </Table.Cell>
        </Table.Row>
        <SemanticToastContainer/>
      </Table.Body>
    );
  }
}

const mapStateToProps = state => ({
  dataProducts: state.products
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(productsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TableProducts)