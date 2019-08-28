import React, { Component } from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import { Button, Header, Icon, Modal, Form, Input } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import { bindActionCreators } from 'redux'
import axios from 'axios';
import { connect } from 'react-redux';
import { getManager } from '../../store/actions/manager'
// import { updateManager } from '../../store/actions/manager'

import ActionRenderComponent from '../../store/actions/renderComponent'

import './menusuperior.css'

const api = axios.create({
	baseURL: 'http://localhost:3001/api/',
});

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
			password: '',
			password_new: '',
		},
		status_label_password_new: false,
		status_label_all_password: false,
		isLoading: false,
	}

	componentDidMount = () => {
		const id_manager = localStorage.getItem('id')
		document.title = 'Home | ClickCompras';
		this.props.getManager(id_manager)
		console.log(this.props.manager)
	};

	handleItemClick = (e, { name }) => {
		this.props.render(name)
	}

	onChangeNewPassword = (e) => {
		this.setState({
			manager: {
				...this.state.manager,
				[e.target.name]: e.target.value
			}
		})
	}

	closeModalEdit = () => {
		this.setState({ statusModalEdit: false })
	}

	openModalEdit = () => {
		this.setState({ statusModalEdit: true })
	}

	onHandleChange = (e) => {
		this.setState({
			status_label_password_new: false, status_label_all_password: false,
			manager: {
				...this.state.manager,
				[e.target.name]: e.target.value
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
		this.setState({ isLoading: true })
		setTimeout(() => {
			this.setState({ isLoading: false })
		}, 1000);
		if (this.state.manager.password && this.state.manager.password_new === '') {
			this.showMessage('error', 'cancel', 'Campos senha não podem ficar vázios!')
			this.setState({ status_label_all_password: true, status_label_password_new: true })
		} else {
			this.setState({ isLoading: true })
			setTimeout(() => {
				this.setState({ isLoading: false })
			}, 1000);
			const id_manager = localStorage.getItem('id')
			api.put(`user/${id_manager}`, this.state.manager, {
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
			}).then(() => {
				this.showMessage('success', 'edit', 'Dados do gerente alterado com sucesso !')
				this.closeModalEdit()
			}).catch(() => {
				this.showMessage('error', 'lock', 'Por favor, conferir senha digitadas !')
				this.setState({ status_label_password_new: true, status_label_all_password: true })
			})
		}
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
					{console.log(localStorage.isAdmin)}
					{localStorage.isAdmin === "true" ?
						<>
							<Menu.Item
								name='admin'
								active={activeItem === 'admin'}
								onClick={this.handleItemClick}
							/>
							<Menu.Item
								name='categories'
								active={activeItem === 'categories'}
								onClick={this.handleItemClick}
							/>
						</>
						:
						<>
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
								name='products'
								active={activeItem === 'products'}
								onClick={this.handleItemClick}
							/>
						</>
					}
					<Menu.Menu position='right'>
						<Dropdown text="Configuração" pointing className="dropdown_conta_configuracao">
							<Dropdown.Menu>
								<Dropdown.Header>Conta</Dropdown.Header>
								<Modal open={this.state.statusModalEdit} trigger={<Dropdown.Item onClick={this.openModalEdit}>Alterar Conta</Dropdown.Item>} closeIcon>
									<Header icon='archive' content='Alterar dados do Gerente' />
									<Modal.Content>
										<Form error>
											<Form.Group widths='equal'>
												<Form.Field control={Input} onChange={this.onHandleChange} value={this.state.manager.name} label="Nome" name='name' placeholder='Nome Completo' />
												<Form.Field control={Input} onChange={this.onHandleChange} value={this.state.manager.cpf} label="CPF" name='cpf' placeholder='CPF' />
												<Form.Field control={Input} onChange={this.onHandleChange} value={this.state.manager.address} label="Endereço" name='address' placeholder='Endereço' />
												<Form.Field control={Input} onChange={this.onHandleChange} value={this.state.manager.email} label="E-mail" name='email' placeholder='E-mail' />
											</Form.Group>
											<Form.Group widths='equal'>
												<Form.Field error={this.state.status_label_all_password} control={Input} onChange={this.onHandleChange} type="password" label="Senha Antiga" name='password' placeholder='Senha Antiga' />
												<Form.Field error={this.state.status_label_all_password} control={Input} onChange={this.onChangeNewPassword} type="password" label="Senha Nova" name='password_new' placeholder='Nova Senha' />
											</Form.Group>
										</Form>
									</Modal.Content>
									<Modal.Actions>
										<Button onClick={this.closeModalEdit} color='red'>
											<Icon name='remove' /> Cancelar
										</Button>
										<Button loading={this.state.isLoading} onClick={this.onSubmitForm} color='green'>
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
	bindActionCreators({ render: ActionRenderComponent, getManager, /*updateManager*/ }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MenuSuperior)
