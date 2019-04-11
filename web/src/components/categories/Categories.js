import React, { Component } from 'react';
import {Table, Modal, Grid, Button, Icon, Header, Segment } from 'semantic-ui-react'

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MenuSuperior from '../menusuperior/Menusuperior'

import './categories.css'

class Categories extends Component {
  state = {
    statusModalAdd : false,
    statusModalRemove : false
  }

  openModalAdd = () => {
    this.setState({ statusModalAdd: true })
  }
  openModalRemove = () => {
    this.setState({ statusModalRemove: true })
  }

  closeModalAdd = () => {
    this.setState({ statusModalRemove: false })
  }
  closeModalRemove = () => {
    this.setState({ statusModalRemove: false })
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
              <Grid.Column width={5} style={{ left : '-23.5%'}}>
                <Button color="green" animated='vertical'>
                    <Button.Content visible>ADICIONAR NOVA CATEGORIA</Button.Content>
                    <Button.Content hidden>
                      <Icon name='add' />
                    </Button.Content>
                </Button>
              </Grid.Column>
            <Grid.Row>
              <Grid.Column width={10}>
              <Table className="table_categories" loading={true} color={'green'}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>NOME</Table.HeaderCell>
                    <Table.HeaderCell>QUANTIDADE DE PRODUTOS</Table.HeaderCell>
                    <Table.HeaderCell>DESCRIÇÃO</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">AÇÃO</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell textAlign="center">
                      <Modal
                        className="modal_dados_gerente"
                        dimmer="blurring"
                        size="mini"
                        trigger={
                        <Button size="small" color="red" animated='fade'>
                          <Button.Content visible>EXCLUIR</Button.Content>
                          <Button.Content hidden><Icon name='close'/></Button.Content>
                        </Button>}
                        >
                        <Modal.Header style={{ textAlign: 'center' }}>Gerente do </Modal.Header>
                          <Modal.Content>
                            <Modal.Description>
                              <Header as='h3'>Nome</Header>
                              <Header as='h3'>Descrição</Header>
                            </Modal.Description>
                          </Modal.Content>
                        </Modal>
                      </Table.Cell>
                  </Table.Row>
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

// const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

export default connect(
  // mapStateToProps,
  // mapDispatchToProps
)(Categories);
