import React, { Component } from 'react';
import { Dimmer, Loader, Form, Table, Modal, Grid, Button, Icon, Header, Segment } from 'semantic-ui-react'
import { toast, SemanticToastContainer } from 'react-semantic-toasts'
import "antd/dist/antd.css";
import TableProducts from './TableProducts'
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select'
import _ from 'lodash';

import * as productsAction from '../../store/actions/products'

import MenuSuperior from '../menusuperior/Menusuperior'

import 'antd/dist/antd.css';
import { Upload, Icon as IconAntd } from 'antd';
import './products.css'
import axios from 'axios'

const Dragger = Upload.Dragger;

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statusModalAdd: false,
      name_product: '',
      category_id: null,
      category_name: '',
      value_product: '',
      description_product: '',
      amount_product: '',
      isLoading: false,
      results: [],
      loading: true,
      loadingAddProduct: false,
      inputImg: true,
      imageBase64: '',
      disable: false,
      optionsCategories: [], //Select category 
      selectedOption: null,
    }
    this.baseState = this.state
  }

  messageStatus = (type, title, description = '', time = 5000) => {
    setTimeout(() => {
      toast({
        type: type,
        icon: 'file excel outline',
        title: title,
        description: description,
        animation: 'bounce',
        time: time,
      });
    }, 1000);
  }

  refreshTable = () => {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000);
    this.setState({ loading: true })
  }

  resetState = () => {
    this.setState(this.baseState)
    axios.get(`http://localhost:3001/api/categories`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        const options = response.data.map(categories => ({
          label: categories.name_categorie,
          id: categories.id,
          description: categories.description
        }))
        this.setState({
          optionsCategories: options
        })
      })
  }

  beforeUpload = (file) => {
    const isJPG = file.type === "image/jpeg";
    if (!isJPG) {
      this.messageStatus('error', 'Só é permitido tipo JPG');
      return
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.messageStatus('error', 'Imagem deve ter até 2MB!');
      return
    }
    return isJPG && isLt2M;
  }

  getBase64 = (img, callback) => {
    this.messageStatus('success', 'Imagem adicionada com sucesso')
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      this.getBase64(info.file.originFileObj, imageBase64 => {
        this.setState({
          imageBase64,
          loading: false,
          disable: true
        });
      });
    } else {
      this.setState({
        disable: false
      })
    }
  }

  componentWillMount() {
    document.title = "Produtos | ClickCompras"
    axios.get(`http://localhost:3001/api/categories`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        const options = response.data.map(categories => ({
          label: categories.name_categorie,
          id: categories.id,
          description: categories.description
        }))
        this.setState({
          optionsCategories: options
        })
      })
  }

  componentDidMount() {
    this.props.getProducts(localStorage.getItem('id_supermarket'))
    document.title = 'Produtos | ClickCompras';
    this.refreshTable()
  }

  //Select category
  handleInputChange = (selectedOption) => {
    this.setState({
      category_id: selectedOption.id,
      category_name: selectedOption.label,
    })
  }

  showMessage(type, icon, title) {
    setTimeout(() => {
      toast(
        {
          type,
          icon,
          animation: 'bounce',
          title,
        },
      );
      this.setState({ statusLoading: false, statusMessageError: 'visible', })
    }, 1000);
    this.forceUpdate()
  }

  onDeleteProduct = (id) => {
    this.props.deleteProduct(id)
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000);
    this.showMessage('success', 'cancel', 'Produto deletado com sucesso !')
  }

  //Search
  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' })

  //Search
  handleResultSelect = (e, { result }) => {
    this.setState({
      value: result.title,
      category_id: result.id,
      category_name: result.title
    })
  }
  //Search
  handleSearchChange = (e, { value }) => {
    this.props.dataCategories.map(categories => {
      const source = _.times(5, () => ({
        id: categories.id,
        title: categories.name_categorie,
        description: categories.description,
      }))
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
    })
  }

  openModalAdd = () => {
    this.setState({ statusModalAdd: true })
  }
  openModalRemove = () => {
    this.setState({ statusModalRemove: true })
  }

  closeModalAdd = () => {
    // this.resetState()
    this.setState({ statusModalAdd: false })
  }
  closeModalRemove = () => {
    this.setState({ statusModalRemove: false })
  }

  onSubmit = () => {
    this.setState({ statusModalAdd: false, loading: true })
    this.props.addProduct(
      this.state.category_id,
      this.state.category_name,
      this.state.name_product,
      this.state.imageBase64,
      this.state.description_product,
      this.state.value_product,
      this.state.amount_product,
    )
    setTimeout(() => {
      this.resetState()
      this.setState({ loading: false })
    }, 1000);
    this.showMessage('success', 'bullhorn', 'Produto adicionado com sucesso !')
  }

  onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
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
                  <SemanticToastContainer />
                  <div style={{ height: 200, width: 300 }}>
                    <Dragger
                      name='file'
                      disabled={this.state.disable}
                      action='//jsonplaceholder.typicode.com/posts/'
                      beforeUpload={this.beforeUpload}
                      onChange={this.handleChange}
                    >
                      <p className="ant-upload-drag-icon">
                        <IconAntd type="inbox" />
                      </p>
                      <p className="ant-upload-text">Clique para selecionar<br /> ou <br /> Arraste a Imagem</p>
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
                    <Select
                      classNamePrefix="Digite ou Selecione"
                      isSearchable
                      name="Categories"
                      options={this.state.optionsCategories} //reducer of Categories
                      onChange={this.handleInputChange}
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
                      value={this.state.description_product}
                      name="description_product"
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
                  <Dimmer active={this.state.loading} inverted>
                    <Loader content="Buscando produtos..." />
                  </Dimmer>
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
                  {this.props.dataProducts.map(product => {
                    return (
                      <TableProducts key={product.id}
                        onDeleteProduct={this.onDeleteProduct}
                        onUpdateProduct={this.onUpdateProduct}
                        data={product}
                      />
                    )
                  })}
                </Table>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  dataCategories: state.categories,
  dataProducts: state.products
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(productsAction, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);