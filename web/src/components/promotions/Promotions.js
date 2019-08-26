import React, { Component } from 'react';
import { Segment, Header, Grid, Table, Form, Dropdown, Popup, Button } from 'semantic-ui-react'
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MenuSuperior from '../menusuperior/Menusuperior'
import Select from 'react-select'
import './promotions.css';

class Promotions extends Component {
  componentDidMount() {
    document.title = 'Promoções | ClickCompras';
  }



  render() {
    const categoriasPadroes = [
      { key: 1, text: 'Categoria 01', value: 1 },
      { key: 2, text: 'Categoria 02', value: 2 },
      { key: 3, text: 'Categoria 03', value: 3 },
    ]

    return (
      <div>
        <MenuSuperior />
        <Segment>
          <Header as="h2">
            SEÇÃO DAS PROMOÇÕES
          </Header>
        </Segment>
        <Segment>
          <Grid verticalAlign="center">
            <Grid.Row>
              <Grid.Column width={10}>
                <Table className="table_categories" loading={true} color={'green'}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>NOME</Table.HeaderCell>
                      <Table.HeaderCell>TIPO</Table.HeaderCell>
                      <Table.HeaderCell>PORCENTAGEM</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">AÇÃO</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                </Table>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Grid className="grid-pai-promocoes" divided="vertically">
          <Grid.Row verticalAlign="center" columns={2}>
            <Grid.Column>
              <Segment className="segments-promocoes">
                <h2>Categorias</h2>
                <Dropdown className="dropdown-categorias" clearable options={categoriasPadroes} selection />
                <Popup
                  content="Adicionar valor em porcetagem, que será aplicado ao produtos da categoria selecionada !"
                  header="Porcentagem"
                  position="top right"
                  trigger={
                    <Form.Input
                      className="inputs-form"
                      name="name_product"
                      type="number"
                      fluid icon='dollar' iconPosition='left'
                      placeholder='PORCENTAGEM' />
                  }
                />
                <Button positive icon='plus' labelPosition='right' content='ADICIONAR PROMOÇÃO' />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment className="segments-promocoes">
                <h2>Produtos</h2>
                <Select
                  className="basic-single"
                  classNamePrefix="Digite ou Selecione"
                  isSearchable
                  name="Categories"
                // options={this.state.optionsCategories} //reducer of Categories
                // onChange={this.handleInputChange}
                />
                <Popup
                  content="Adicionar valor em porcetagem, que será aplicado ao(s) produto(s) selecionado(s) !"
                  header="Porcentagem"
                  position="top right"
                  trigger={
                    <Form.Input
                      className="inputs-form"
                      name="name_product"
                      type="number"
                      fluid icon='dollar' iconPosition='left'
                      placeholder='PORCENTAGEM' />
                  }
                />
                <Button positive icon='plus' labelPosition='right' content='ADICIONAR PROMOÇÃO' />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
)(Promotions);
