import React, { Component } from 'react'
import { Icon, Modal, Button, Header, Grid, Menu, Table } from 'semantic-ui-react'

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './admin.css'

class Admin extends Component {
  state = {
  }

  logout = () => {
		localStorage.clear()
		window.open(`${process.env.PUBLIC_URL}/`, '_self');
  };

  render() {
    return (
      <div className="background-page">
        <style>{`
        body > div,
        body > div > div,
        body > div > div > div.background-page {
            height: 100%;
        }
        `}
        </style>
        <Menu className="menu_superior_admin" pointing secondary>
					<Menu.Menu position='right'>
						<Menu.Item
							name='sair'
							onClick={this.logout}
						/>
					</Menu.Menu>
				</Menu>
        <Grid verticalAlign='middle' textAlign='center' style={{ height: '90%' }} >
          <Grid.Row>
            <Grid.Column width={10} >
            <Header as='h2' color='blue' textAlign='center'>
              SUPERMERCADOS PENDENTE PARA APROVAÇÕES
            </Header>
              <Table color={'blue'}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Nome Supermercado</Table.HeaderCell>
                    <Table.HeaderCell>CNPJ</Table.HeaderCell>
                    <Table.HeaderCell>ENDEREÇO</Table.HeaderCell>
                    <Table.HeaderCell>EMAIL</Table.HeaderCell>
                    <Table.HeaderCell>GERENTE</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Supermercado X</Table.Cell>
                    <Table.Cell>444.444.444</Table.Cell>
                    <Table.Cell>Rua Supermercado X</Table.Cell>
                    <Table.Cell>supermercadox@super.com</Table.Cell>
                    <Modal
                      className="modal_dados_gerente"
                      dimmer="blurring"
                      size="mini"
                      trigger={<Button className="btn_verificar_gerente">Verificar dados</Button>}
                      >
                      <Modal.Header style={{ textAlign: 'center' }}>Gerente do Supermercado X</Modal.Header>
                        <Modal.Content>
                          <Modal.Description>
                            <Header as='h3'>Nome</Header>
                              <p style={{ color: 'blue', textTransform: 'uppercase', fontWeight: 'bold' }}>João Vitor Campos Silva</p>
                            <Header as='h3'>Email</Header>
                              <p style={{ color: 'blue', textTransform: 'uppercase', fontWeight: 'bold' }}>jjvcamposs@gmail.com</p>
                            <Header as='h3'>Endereço</Header>
                              <p style={{ color: 'blue', textTransform: 'uppercase', fontWeight: 'bold' }}>Rua manoel messias da silva</p>
                          </Modal.Description>
                        </Modal.Content>
                      </Modal>
                    <Button color={'green'} className="btn_verificar_gerente">Aprovar</Button>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Supermercado Y</Table.Cell>
                    <Table.Cell>555.555.555</Table.Cell>
                    <Table.Cell>Rua Supermercado Y</Table.Cell>
                    <Table.Cell>supermercadoy@super.com</Table.Cell>
                    <Button className="btn_verificar_gerente">Verificar dados</Button>
                    <Button color={'green'} className="btn_verificar_gerente">Aprovar</Button>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

// const mapStateToProps = state => ({
//   errorMessage: state.login
// });


// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ login : ActionLogin } , dispatch);


export default connect(null, null)(Admin);
