import React, { Component } from 'react';
import { Form, Table, Modal, Grid, Button, Icon, Header, Segment, Search } from 'semantic-ui-react'
import faker from 'faker'
import _ from 'lodash'

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MenuSuperior from '../menusuperior/Menusuperior'

import 'antd/dist/antd.css';
import { Upload, Icon as IconAntd, message } from 'antd';


import './products.css'

const Dragger = Upload.Dragger;

const props = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
}))

class Products extends Component {
  state = {
    statusModalAdd: false,
    statusModalRemove: false,
    name_product: '',
    value_product: '',
    description: '',
    isLoading: false,
    results: []
  }

  componentDidMount() {
    document.title = "Produtos | ClickCompras"
    this.resetComponent()
  }

  //Search
  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' })

  //Search    
  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  //Search
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }


  openModalAdd = () => {
    this.setState({ statusModalAdd: true })
  }
  openModalRemove = () => {
    this.setState({ statusModalRemove: true })
  }

  closeModalAdd = () => {
    this.setState({ statusModalAdd: false })
  }
  closeModalRemove = () => {
    this.setState({ statusModalRemove: false })
  }

  onSubmit = () => {
    alert('Submit !')
  }

  onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { isLoading, value, results } = this.state
    return (
      <div>
        <MenuSuperior />
        <Segment>
          <Header as="h2">
            SEÇÃO DE PRODUTOS
          </Header>
        </Segment>
        <Segment>
          <Grid verticalAlign='middle' textAlign='center' style={{ height: '90%' }}>
            <Grid.Column width={5} style={{ left: '-22.5%' }}>
              <Modal
                centered={false}
                open={this.state.statusModalAdd}
                className="modal_dados_gerente"
                dimmer="blurring"
                size="large"
                trigger={
                  <Button onClick={this.openModalAdd} color="green" animated='vertical'>
                    <Button.Content visible>ADICIONAR NOVO PRODUTO</Button.Content>
                    <Button.Content hidden>
                      <Icon name='add' />
                    </Button.Content>
                  </Button>}
              >
                <Modal.Header style={{ textAlign: 'center' }}>ADICIONAR NOVO PRODUTO</Modal.Header>
                <Modal.Content image>
                  <div style={{height: 200, width: 300}}>
                    <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <IconAntd type="inbox" />
                      </p>
                      <p className="ant-upload-text">Clique para selecionar<br/> ou <br/> Arraste a Imagem</p>
                    </Dragger>
                  </div>
                  <Modal.Description style={{ paddingLeft: 100, paddingRight: 100 }}>
                    <Header as='h3'>NOME</Header>
                    <Form.Input
                      onChange={this.onHandleChange}
                      value={this.state.name_product}
                      name="name_product"
                      fluid icon='tag' iconPosition='left'
                      placeholder='NOME' />
                    <Header as='h3'>CATEGORIA</Header>
                    <Search
                      loading={isLoading}
                      onResultSelect={this.handleResultSelect}
                      onSearchChange={_.debounce(this.handleSearchChange, 500, {
                        leading: true,
                      })}
                      results={results}
                      value={value}
                      {...this.props}
                    />

                    <Header as='h3'>PREÇO</Header>
                    <Form.Input
                      onChange={this.onHandleChange}
                      value={this.state.value_product}
                      name="value_product"
                      fluid icon='money' iconPosition='left'
                      placeholder='PREÇO' />

                    <Header as='h3'>QUANTIDADE</Header>
                    <Form.Input
                      onChange={this.onHandleChange}
                      value={this.state.amount_product}
                      name="amount_product"
                      fluid icon='numbered list' iconPosition='left'
                      placeholder='QUANTIDADE' />

                    <Header as='h3'>DESCRIÇÃO</Header>
                    <Form.TextArea style={{
                      width: '318px',
                      maxWidth: '318px',
                      height: '68px',
                      maxHeight: '100px',
                      margin: '0px',
                      borderRadius: '6px',
                      borderColor: '#c1bfbfbd',
                    }}
                      onChange={this.onHandleChange}
                      value={this.state.description}
                      name="description"
                      rows={3}
                      placeholder="Descrição do produto">
                    </Form.TextArea>

                    <Modal.Actions style={{ marginTop: '10px' }}>
                      <Button negative icon='close' onClick={this.closeModalAdd} labelPosition='right' content="Cancelar"></Button>
                      <Button positive icon='checkmark' onClick={this.onSubmit} labelPosition='right' content='Confirmar' />
                    </Modal.Actions>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </Grid.Column>
            <Grid.Row>
              <Grid.Column width={10}>
                <Table className="table_categories" loading={true} color={'green'}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>IMAGEM</Table.HeaderCell>
                      <Table.HeaderCell>NOME</Table.HeaderCell>
                      <Table.HeaderCell>CATEGORIA</Table.HeaderCell>
                      <Table.HeaderCell>PREÇO</Table.HeaderCell>
                      <Table.HeaderCell>QUANTIDADE</Table.HeaderCell>
                      <Table.HeaderCell>DESCRIÇÃO</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">AÇÃO</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell></Table.Cell>
                      <Table.Cell textAlign="center">
                        <Modal
                          basic size='small'
                          dimmer="blurring"
                          open={this.state.statusModalRemove}
                          trigger={
                            <Button onClick={this.openModalRemove} size="small" color="red" animated='fade'>
                              <Button.Content visible>EXCLUIR</Button.Content>
                              <Button.Content hidden><Icon name='close' /></Button.Content>
                            </Button>}
                        >
                          <Header icon='close' content='Excluir Produto XXXXXX' />
                          <Modal.Content>
                            <p>Você realmente deseja excluir o produto selecionado ?</p>
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
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div >
    );
  }
}

// const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

export default connect(
  // mapStateToProps,
  // mapDispatchToProps
)(Products);
