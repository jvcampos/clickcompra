import React, { Component } from 'react';
import { Dimmer, Loader, Table, Modal, Button, Icon, Header } from 'semantic-ui-react'

import './categories.css'

class TableCategories extends Component {
  state = {
    statusModalRemove : false,
    categories: []
  }

  openModalRemove = () => {
    this.setState({ statusModalRemove: true })
  }

  closeModalRemove = () => {
    this.setState({ statusModalRemove: false })
  }

  render() {
    return (
      <div>
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
            {this.props.data.map(categorie => {
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
                        <Header icon='close' content='Excluir Categoria' />
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
      </div>
    );
  }
}


export default (TableCategories);
