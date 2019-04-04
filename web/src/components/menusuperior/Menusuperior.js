import React, { Component } from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import ActionRenderComponent from '../../store/actions/renderComponent'

import './menusuperior.css'

class MenuSuperior extends Component {
	state = {
		activeItem: ''
	}

	componentDidMount = () => {
		document.title = 'Home | ClickCompras';
		localStorage.setItem('token', this.props.dataLogin.token.token);
	};

	handleItemClick = (e, { name }) => {
		this.props.render(name)
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
			</div>
		)
	}
}

const mapStateToProps = state => ({
	dataLogin: state.login,
	menuSelected: state.render,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ render: ActionRenderComponent }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MenuSuperior)
