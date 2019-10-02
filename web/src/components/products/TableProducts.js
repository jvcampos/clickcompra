import React, { Component } from 'react';
import { Form, Popup, Table, Modal, Icon, Button, Header } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import { Upload, Icon as IconAntd } from 'antd';
import _ from 'lodash'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as productsActions from '../../store/actions/products'
import Select from 'react-select'
import numeral from 'numeral';
import CurrencyInput from 'react-currency-input';
import axios from 'axios'
import './products.css'

const Dragger = Upload.Dragger;

class TableProducts extends Component {
  state = {
    statusModalRemove: false,
    isLoading: false,
    name_product: this.props.data.name_product,
    category_id: this.props.data.id_category,
    category_name: this.props.data.name_category,
    value_product: this.props.data.value,
    description_product: this.props.data.description,
    amount_product: this.props.data.amount,
    loading: false,
    inputImg: true,
    disable: false,
    imageBase64: this.props.data.imageBase64,
    optionsCategories: [], //Select category 
    selectedOption: {
      label: this.props.data.name_category,
      id: this.props.data.id_category,
    },
  }

  componentDidMount() {
    this.props.getProducts(localStorage.getItem('id_supermarket'))
    document.title = "Produtos | ClickCompras"
    axios.get(`http://localhost:3001/api/categories`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        let options = response.data.map(categories => ({
          label: categories.name_categorie,
          id: categories.id,
          description: categories.description
        }))
        this.setState({
          optionsCategories: options
        })
      })
  }

  openModalEdit = () => {
    this.setState({ statusModalEdit: true })
  }

  resetState = () => {
    this.setState(this.baseState)
  }

  closeModalEdit = () => {
    this.setState({ statusModalEdit: false })
  }

  openModalRemove = () => {
    this.setState({ statusModalRemove: true })
  }

  closeModalRemove = () => {
    this.setState({ statusModalRemove: false })
  }

  //Alter dada
  updateProduct = (id) => {
    this.props.updateProduct(
      id,
      this.state.category_id,
      this.state.category_name,
      this.state.name_product,
      this.state.imageBase64,
      this.state.description_product,
      this.state.value_product,
      this.state.amount_product
    )
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000);
    this.showMessage('success', 'edit', 'Produto alterado com sucesso !')
    this.closeModalEdit()
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
    }, 1000);
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
      // Get this url from response in real world.
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

  onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    const { isLoading, value, results } = this.state
    return (
      <Table.Body>
        <Table.Row key={this.props.data.id}>
          <Table.Cell><img style={{ width: 90 }} src={this.props.data.imageBase64} /></Table.Cell>
          <Table.Cell>{this.props.data.name_product}</Table.Cell>
          <Table.Cell>{this.props.data.name_category}</Table.Cell>
          <Table.Cell>{numeral(this.props.data.value).format('$0,0.00')}</Table.Cell>
          <Table.Cell>{this.props.data.amount}</Table.Cell>
          <Table.Cell>{this.props.data.description}</Table.Cell>
          <Table.Cell textAlign="center">
            <Modal
              centered={false}
              open={this.state.statusModalEdit}
              className="modal_dados_gerente"
              dimmer="blurring"
              size="large"
              trigger={
                <Popup
                  content='Alterar produto'
                  trigger={
                    <Button onClick={this.openModalEdit} color="blue" icon>
                      <Icon name='edit' />
                    </Button>
                  }
                />
              }
            >
              <Modal.Header style={{ textAlign: 'center' }}>ALTERAR PRODUTO</Modal.Header>
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
                    value={this.state.selectedOption}
                    options={this.state.optionsCategories} //reducer of Categories
                    onChange={this.handleInputChange}
                  />

                  <Header as='h3'>PREÇO</Header>
                  <Form.Input>
                    <CurrencyInput
                      onChangeEvent={this.onHandleChange}
                      thousandSeparator="" 
                      value={this.state.value_product}
                      name="value_product"
                      placeholder='PREÇO'
                    />
                  </Form.Input>
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
                    <Button negative icon='close' onClick={this.closeModalEdit} labelPosition='right' content="Cancelar"></Button>
                    <Button positive icon='checkmark'
                      onClick={() => this.updateProduct(this.props.data.id)}
                      labelPosition='right'
                      content='Confirmar' />
                  </Modal.Actions>
                </Modal.Description>
              </Modal.Content>
            </Modal>
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
              <Header icon='close' content='Excluir Produto' />
              <Modal.Content>
                <p>Você realmente deseja excluir o produto:
                  <span style={{ marginLeft: 10, fontSize: 20, color: 'red', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    {this.props.data.name_product}</span> ?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button basic onClick={this.closeModalEdit} color='red' inverted>
                  <Icon name='remove' /> Cancelar
                </Button>
                <Button color='green' onClick={() => this.props.onDeleteProduct(this.props.data.id)} inverted>
                  <Icon name='checkmark' /> Confirmar
                </Button>
              </Modal.Actions>
            </Modal>
          </Table.Cell>
        </Table.Row>
        <SemanticToastContainer />
      </Table.Body>
    );
  }
}

const mapStateToProps = state => ({
  dataProducts: state.products,
  dataCategories: state.categories,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(productsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TableProducts)
