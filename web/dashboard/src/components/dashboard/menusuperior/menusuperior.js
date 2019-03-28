import React, { Component } from 'react'
import { Icon, Menu, Segment } from 'semantic-ui-react'

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import ActionLogin from '../../store/actions/login'

import './menusuperior.css'

class MenuSuperior extends Component {
    state = {
        activeItem: 'home'
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name})
    }

    render() {
        const { activeItem } = this.state

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
                        onClick={this.handleItemClick}
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

// const mapDispatchToProps = dispatch =>
//     bindActionCreators({ login : ActionLogin } , dispatch);


export default connect(mapStateToProps, null)(MenuSuperior)
