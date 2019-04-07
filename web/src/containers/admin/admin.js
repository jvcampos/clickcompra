import React, { Component } from 'react'
import { Modal, Button, Header, Grid, Menu, Table } from 'semantic-ui-react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ActionAdmin from '../../store/actions/admin'

import './admin.css'

class Admin extends Component {

  componentDidMount(){
    document.title = 'Painel Administrativo - ClickCompras';
    localStorage.setItem('token', this.props.dataLogin.token.token);
    this.props.admin()
    console.log(this.props.allUnproved)
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
                    <Table.HeaderCell>RAZÃO SOCIAL</Table.HeaderCell>
                    <Table.HeaderCell>CNPJ</Table.HeaderCell>
                    <Table.HeaderCell>ENDEREÇO</Table.HeaderCell>
                    <Table.HeaderCell>EMAIL</Table.HeaderCell>
                    <Table.HeaderCell>GERENTE</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {/* {this.props.allUnproved.data.data.map(data => {
                    return (
                      <Table.Row>
                        <Table.Cell>{data.social_reason}</Table.Cell>
                        <Table.Cell>{data.cnpj}</Table.Cell>
                        <Table.Cell>{data.address_supermarket}</Table.Cell>
                        <Table.Cell>{data.email_supermarket}</Table.Cell>
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
                                  <p style={{ color: 'blue', textTransform: 'uppercase', fontWeight: 'bold' }}>{data.name}</p>
                                <Header as='h3'>Email</Header>
                                  <p style={{ color: 'blue', textTransform: 'uppercase', fontWeight: 'bold' }}>{data.email}</p>
                                <Header as='h3'>Endereço</Header>
                                  <p style={{ color: 'blue', textTransform: 'uppercase', fontWeight: 'bold' }}>{data.address}</p>
                              </Modal.Description>
                            </Modal.Content>
                          </Modal>
                        <Button color={'green'} className="btn_verificar_gerente">Aprovar</Button>
                      </Table.Row>
                    )
                  })} */}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  dataLogin: state.login,
  allUnproved: state.admin
});


const mapDispatchToProps = dispatch =>
  bindActionCreators({ admin: ActionAdmin } , dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Admin);
