import React, { Component } from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import { Button, Header, Icon, Modal, Form, Input } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { getManager } from '../../store/actions/manager'
import { updateManager } from '../../store/actions/manager'

import ActionRenderComponent from '../../store/actions/renderComponent'

import './menusuperior.css'

class MenuSuperior extends Component {
	state = {
		activeItem: '',
		statusModalEdit: false,
		manager: {
			id: localStorage.getItem('id'),
			address: this.props.manager.address,
			cpf: this.props.manager.cpf,
			email: this.props.manager.email,
			name: this.props.manager.name,
		}
	}

	componentDidMount = () => {
		const id_manager = localStorage.getItem('id')
		document.title = 'Home | ClickCompras';
		this.props.getManager(id_manager)
	};

	handleItemClick = (e, { name }) => {
		this.props.render(name)
	}

	closeModalEdit = () => {
		this.setState({ statusModalEdit: false })
	}

	openModalEdit = () => {
		this.setState({ statusModalEdit: true })
	}

	onHandleChange = (e) => {
		this.setState({
			manager: {
				...this.state.manager,
				[e.target.name] : e.target.value
			}
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

	onSubmitForm = () => {
		this.props.updateManager(this.state.manager)
		this.closeModalEdit()
		this.showMessage('success', 'edit', 'Dados do gerente alterado com sucesso !')
	}

	logout = () => {
		localStorage.clear()
		window.open(`${process.env.PUBLIC_URL}/`, '_self');
	};

	render() {
		const { activeItem } = this.state
		return (
			<div>
				<Menu className="menu_superior" pointing secondary>
					<Menu.Item
						className="menu_superior_item"
						name='home'
						active={activeItem === 'home'} onClick={this.handleItemClick}>
					</Menu.Item>
					<Menu.Item
						className="menu_superior_item"
						name='supermarket'
						active={activeItem === 'supermarket'}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name='categories'
						active={activeItem === 'categories'}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name='products'
						active={activeItem === 'products'}
						onClick={this.handleItemClick}
					/>
					<Menu.Menu position='right'>
						<Dropdown text="Configuração" pointing className="dropdown_conta_configuracao">
							<Dropdown.Menu>
								<Dropdown.Header>Conta</Dropdown.Header>
								<Modal open={this.state.statusModalEdit} trigger={<Dropdown.Item onClick={this.openModalEdit}>Alterar Conta</Dropdown.Item>} closeIcon>
									<Header icon='archive' content='Alterar dados do Gerente' />
									<Modal.Content>
										<Form>
											<Form.Group widths='equal'>
												<Form.Field control={Input} onChange={this.onHandleChange} value={this.state.manager.name} label="Nome" name='name' placeholder='Nome Completo' />
												<Form.Field control={Input} onChange={this.onHandleChange} value={this.state.manager.cpf} label="CPF" name='cpf' placeholder='CPF' />
												<Form.Field control={Input} onChange={this.onHandleChange} value={this.state.manager.address} label="Endereço" name='address' placeholder='Endereço' />
												<Form.Field control={Input} onChange={this.onHandleChange} value={this.state.manager.email} label="E-mail"name='email' placeholder='E-mail' />
											</Form.Group>
											<Form.Group widths='equal'>
												<Form.Field control={Input} onChange={this.onHandleChange}  label="Senha Antiga" name='password' placeholder='Senha Antiga' />
												<Form.Field control={Input} onChange={this.onHandleChange} label="Senha Nova" name='password_new' placeholder='Nova Senha' />
												<Form.Field control={Input} onChange={this.onHandleChange} label="Confirmar Senha Nova" name='password_new_confirm' placeholder='Confirmar Senha' />
											</Form.Group>
										</Form>
									</Modal.Content>
									<Modal.Actions>
										<Button onClick={this.closeModalEdit} color='red'>
											<Icon name='remove' /> Cancelar
										</Button>
										<Button onClick={this.onSubmitForm} color='green'>
											<Icon name='checkmark' /> Alterar
										</Button>
									</Modal.Actions>
									</Modal>
							</Dropdown.Menu>
						</Dropdown>
						<Menu.Item
							name='sair'
							active={activeItem === 'sair'}
							onClick={this.logout}
						/>
						<SemanticToastContainer />
					</Menu.Menu>
				</Menu>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	dataLogin: state.login,
	menuSelected: state.render,
	manager: state.manager
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ render: ActionRenderComponent, getManager, updateManager }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MenuSuperior)
