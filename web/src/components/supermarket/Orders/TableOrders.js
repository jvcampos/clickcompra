import React, { Component } from "react";
import {
  Form,
  Popup,
  Table,
  Button,
  Modal,
  Icon,
  Header,
  Label
} from "semantic-ui-react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import _ from 'lodash';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import "../../categories/categories.css";
import * as ordersAction from "../../../store/actions/orders";

import axios from 'axios'

class TableOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      valueOrder: []
    };
  }

  componentDidMount() {
    // valueTotal = _.sum(valueTotal)
    // this.setState({ valueOrder: valueTotal })
  }

  aprovedItem = (id_compra) => {
    axios.put(`http://localhost:3001/api/supermarkets/orders/aproved/${id_compra}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(() => {
       window.location.reload()
      })
  }

  unprovedItem = (id_compra) => {
    axios.put(`http://localhost:3001/api/supermarkets/orders/unproved/${id_compra}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(() => {
       window.location.reload()
      })
  }

  showMessage(type, icon, title) {
    setTimeout(() => {
      toast({
        type,
        icon,
        animation: "bounce",
        title
      });
    }, 1000);
  }



  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.order[0].name}</Table.Cell>
        <Table.Cell>R$ {_.sum(_.map(this.props.order, (item) => item.qtde * item.unityValue))}</Table.Cell>
        <Table.Cell textAlign="center">
          <Table.Row textAlign="center">
            <Modal
              className="modal_dados_pedido"
              dimmer="blurring"
              size="small"
              trigger={
                <Button className="btn_verificar_pedido">
                  Informações do pedido
                </Button>
              }
            >
              <Modal.Header style={{ textAlign: "center" }}>
                Informações Cliente
              </Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      <Label style={{ marginBottom: '10px' }}>
                        CPF
                        <Label.Detail>{this.props.order[0].cpf}</Label.Detail>
                      </Label>
                      <Label style={{ marginBottom: '10px' }}>
                        Endereço:
                        <Label.Detail>{this.props.order[0].address}</Label.Detail>
                      </Label>
                      <Label style={{ marginBottom: '10px' }}>
                        E-mail:
                        <Label.Detail>{this.props.order[0].email}</Label.Detail>
                      </Label>
                    </div>
                  </div>
                </Modal.Description>
              </Modal.Content>
              <Modal.Header style={{ textAlign: "center", fontSize: '1.3em', fontWeight: 'bold', paddingTop: '10px' }}>
                Informações Pedido
                  </Modal.Header>
              <Modal.Content>
                {this.props.order.map(itemOrder => {
                  return (
                    <Modal.Description>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row"
                          }}
                        >
                          <Label style={{ marginBottom: '10px' }}>
                            NOME PRODUTO
                        <Label.Detail>{itemOrder.name_product}</Label.Detail>
                          </Label>
                          <Label style={{ marginBottom: '10px' }}>
                            QUANTIDADE
                        <Label.Detail>{itemOrder.qtde}</Label.Detail>
                          </Label>
                        </div>
                      </div>
                    </Modal.Description>
                  )
                })}
              </Modal.Content>
            </Modal>
          </Table.Row>
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Button
            onClick={() => {
              this.aprovedItem(this.props.order[0].id_compra); // Colocar os parametros (id)
            }}
            size="small"
            color="green"
            animated="fade"
          >
            <Button.Content visible >APROVAR</Button.Content>
            <Button.Content hidden>
              <Icon name="close" />
            </Button.Content>
          </Button>
          <Button
            onClick={() => {
              this.unprovedItem(this.props.order[0].id_compra); // Colocar os parametros (id)
            }}
            size="small"
            color="red"
            animated="fade"
          >
            <Button.Content visible>RECUSAR</Button.Content>
            <Button.Content hidden>
              <Icon name="close" />
            </Button.Content>
          </Button>
        </Table.Cell>

        <SemanticToastContainer />
      </Table.Row>
    );
  }
}

const mapStateToProps = state => ({
  dataCategories: state.categories,
  dataOrders: state.orders
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ordersAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TableOrders);
