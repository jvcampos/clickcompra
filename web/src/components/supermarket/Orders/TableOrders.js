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

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import "../../categories/categories.css";
import * as ordersAction from "../../../store/actions/orders";

class TableOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
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
        <Table.Cell>ITEM 1</Table.Cell>
        <Table.Cell>ITEM 2</Table.Cell>
        <Table.Cell textAlign="center">
          <Table.Row textAlign="center">
            <Modal
              className="modal_dados_pedido"
              dimmer="blurring"
              size="large"
              trigger={
                <Button className="btn_verificar_pedido">
                  Verificar dados
                </Button>
              }
            >
              <Modal.Header style={{ textAlign: "center" }}>
                Informações Pedido
              </Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      style={{
                        marginRight: 50,
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      <Label>
                        Nome
                        <Label.Detail>teste1</Label.Detail>
                      </Label>
                      <Label>
                        Valor:
                        <Label.Detail>1000000.00</Label.Detail>
                      </Label>
                      <Label>
                        Endereço:
                        <Label.Detail>rua sei lá</Label.Detail>
                      </Label>
                      <Label>
                        Bairro:
                        <Label.Detail>bairro sei lá o que</Label.Detail>
                      </Label>
                    </div>
                    <div
                      style={{
                        height: "100%",
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      <div>Produtos: </div>
                      <div>varios</div>
                      <div>Produtos</div>
                      <div>diferentes</div>
                    </div>
                  </div>
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </Table.Row>
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Button
            onClick={() => {
              this.props.acceptOrReject(); // Colocar os parametros (id, true)
            }}
            size="small"
            color="green"
            animated="fade"
          >
            <Button.Content visible>APROVAR</Button.Content>
            <Button.Content hidden>
              <Icon name="close" />
            </Button.Content>
          </Button>
          <Button
            onClick={() => {
              this.props.acceptOrReject(); // Colocar os parametros (id, true)
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
