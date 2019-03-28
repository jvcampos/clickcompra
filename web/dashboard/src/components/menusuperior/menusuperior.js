import React, { Component } from 'react'
import { Icon, Menu, Segment } from 'semantic-ui-react'

import { connect } from 'react-redux';

import './menusuperior.css'

class MenuSuperior extends Component {
	state = {
		activeItem: 'home'
	}

	handleItemClick = (e, { name }) => {
		this.setState({ activeItem: name})
	}

	componentDidMount = () => {
		localStorage.setItem('token', this.props.dataLogin.token);
	};

	logout = () => {
		localStorage.clear()
		window.open(`${process.env.PUBLIC_URL}/`, '_self');
	};


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
						name='supermercado'
						active={activeItem === 'supermercado'}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name='categorias'
						active={activeItem === 'categorias'}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name='produtos'
						active={activeItem === 'produtos'}
						onClick={this.handleItemClick}
					/>
					<Menu.Menu position='right'>
						<Menu.Item
						name='sair'
						active={activeItem === 'sair'}
						onClick={this.logout}
						/>
					</Menu.Menu>
				</Menu>
				<Segment>
					<h3>Será outro componente !</h3>
				</Segment>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	dataLogin: state.login,
});

export default connect(mapStateToProps, null)(MenuSuperior)
