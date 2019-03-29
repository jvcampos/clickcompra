import React, { Component } from 'react'
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react'

import { connect } from 'react-redux';

import './menusuperior.css'

import Supermercado from '../supermercado/Supermercado'
import Categorias from '../categorias/Categorias'
import Produtos from '../produtos/Produtos'
import Home from '../home/Home'

class MenuSuperior extends Component {
	state = {
		activeItem: 'home'
	}

	componentDidMount = () => {
		document.title = 'Home | ClickCompras';
		localStorage.setItem('token', this.props.dataLogin.token);
	};

	handleItemClick = (e, { name }) => {
		this.setState({ activeItem: name })
	}

	logout = () => {
		localStorage.clear()
		window.open(`${process.env.PUBLIC_URL}/`, '_self');
	};

	changeComponent = () => {
		switch (this.state.activeItem) {
			case 'Supermercado':
				return <Supermercado />
			case 'Categorias':
				return <Categorias />
			case 'Produtos':
				return <Produtos />
			default:
				return <Home />
		}
	}

	render() {
		const { activeItem } = this.state
		console.log(this.props.dataLogin.token)
		return (
			<div>
				<Menu className="menu_superior" pointing secondary>
					<Menu.Item className="menu_superior_item" name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
						<Icon name='home' />Home
					</Menu.Item>
					<Menu.Item
						className="menu_superior_item"
						name='Supermercado'
						active={activeItem === 'Supermercado'}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name='Categorias'
						active={activeItem === 'Categorias'}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name='Produtos'
						active={activeItem === 'Produtos'}
						onClick={this.handleItemClick}
					/>
					<Menu.Menu position='right'>
						<Dropdown text="Configuração" pointing className="dropdown_conta_configuracao">
							<Dropdown.Menu>
								<Dropdown.Header>Conta</Dropdown.Header>
								<Dropdown.Item>Alterar Conta</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<Menu.Item
							name='sair'
							active={activeItem === 'sair'}
							onClick={this.logout}
						/>
					</Menu.Menu>
				</Menu>
				<Segment>
					{this.changeComponent()}
				</Segment>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	dataLogin: state.login,
});

export default connect(mapStateToProps, null)(MenuSuperior)
