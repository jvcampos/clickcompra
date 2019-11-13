import React, { Component } from 'react';
import { Form, Popup, Table, Button, Modal, Icon, Header } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../../categories/categories.css'

class TableOrders extends Component {
  state = {
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

  render() {
    return (
      <Table.Row>
        <Table.Cell>ITEM 1</Table.Cell>
        <Table.Cell>ITEM 2</Table.Cell>
        <Table.Cell textAlign="center">
        <Table.Row textAlign="center">
            <Modal
                className="modal_dados_pedido"
                dimmer="blurring"
                size="mini"
                trigger={<Button className="btn_verificar_pedido">Verificar dados</Button>}
                >
                <Modal.Header style={{ textAlign: 'center' }}>Informações Pedido</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Header as='h3'>Nome</Header>
                        <p style={{ color: 'blue', textTransform: 'uppercase', fontWeight: 'bold' }}>DASDSADAS</p>
                    </Modal.Description>
                </Modal.Content>
                </Modal>
            </Table.Row> 
        </Table.Cell>
        <Table.Cell textAlign="center">
            <Modal
              basic size='small'
              dimmer="blurring"
              open={this.state.statusModalRemove}
              trigger={
                <Button onClick={this.openModalRemove} size="small" color="green" animated='fade'>
                  <Button.Content visible>APROVAR</Button.Content>
                  <Button.Content hidden><Icon name='close'/></Button.Content>
                </Button>}
              >
              <Header icon='close' content='Aprovar pedido' />
              <Modal.Content>
                <p>Você realmente deseja aprovar o pedido
                  <span style={{ color: 'green', textTransform: 'uppercase', fontWeight: 'bold' }}> AAAAAAAA</span> ?</p>
              </Modal.Content>
            </Modal>
            <Modal
              basic size='small'
              dimmer="blurring"
              open={this.state.statusModalRemove}
              trigger={
                <Button onClick={this.openModalRemove} size="small" color="red" animated='fade'>
                  <Button.Content visible>RECUSAR</Button.Content>
                  <Button.Content hidden><Icon name='close'/></Button.Content>
                </Button>}
              >
              <Header icon='close' content='Aprovar pedido' />
              <Modal.Content>
                <p>Você realmente deseja excluir a categoria
                  <span style={{ color: 'green', textTransform: 'uppercase', fontWeight: 'bold' }}> AAAAAAAA</span> ?</p>
                <p>Todos os produtos que estão relacionados à esta categoria, serão removidos.</p>
              </Modal.Content>
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

export default connect(mapStateToProps, null)(TableOrders);
