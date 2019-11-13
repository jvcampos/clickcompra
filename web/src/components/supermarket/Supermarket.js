import React, { Component } from 'react';
import { Segment, Table, Grid, Header } from 'semantic-ui-react'

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MenuSuperior from '../menusuperior/Menusuperior'
import TableOrders from '../supermarket/Orders/TableOrders'

class Supermarket extends Component {
  componentDidMount(){
    document.title = 'Supermercado | ClickCompras';
  }


  render() {
    return (
      <div>
        <MenuSuperior />
        <Segment>
          <Header as="h2">
            SEÇÃO DO SUPERMERCADO
          </Header>
        </Segment>
        <Segment>
        <Grid verticalAlign='middle' textAlign='center' style={{ height: '90%' }}>
            <Grid.Column width={7} style={{  }}>
              <Table className="table_categories" color={'green'}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>NOME DO COMPRADOR</Table.HeaderCell>
                    <Table.HeaderCell>VALOR TOTAL</Table.HeaderCell>
                    <Table.HeaderCell>DADOS</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">APROVAÇÃO</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <TableOrders />
                </Table.Body>
              </Table>
            </Grid.Column>
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
)(Supermarket);
