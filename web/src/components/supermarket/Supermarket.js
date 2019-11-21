import React, { Component } from 'react';
import { Segment, Table, Grid, Header } from 'semantic-ui-react'

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MenuSuperior from '../menusuperior/Menusuperior'
import TableOrders from '../supermarket/Orders/TableOrders'

import axios from 'axios'

class Supermarket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: []
    };
  }

  componentDidMount(){
    document.title = 'Supermercado | ClickCompras';

    axios.get(`http://localhost:3001/api/supermarkets/orders/${localStorage.getItem('id_supermarket')}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
       const orderFiltered = response.data.filter( order => {
          return order.order.length > 0
        })
        this.setState({ order: orderFiltered})
      })
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
                  { this.state.order.map( (itemOrder, i ) => {
                    return <TableOrders order={itemOrder} index={i} />
                  })}
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
