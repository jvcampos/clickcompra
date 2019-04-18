import React, { Component } from 'react';
import { Table, Modal, Icon, Button, Header} from 'semantic-ui-react'

// import { Container } from './styles';

export default class TableProducts extends Component {
  state = {
    statusModalRemove: false,
  }
  render() {
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
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
                <Button color='green' onClick={this.onSubmit} inverted>
                  <Icon name='checkmark' /> Confirmar
                            </Button>
              </Modal.Actions>
            </Modal>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  }
}
