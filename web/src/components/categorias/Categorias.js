import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MenuSuperior from '../menusuperior/menusuperior'

class Categorias extends Component {
  render() {
    return (
      <div>
        <h3>Categorias</h3>
        <ul>
          <li>Cereais</li>
          <li>Bebidas</li>
          <li>Padaria</li>
        </ul>
      </div>
    );
  }
}

// const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

export default connect(
  // mapStateToProps,
  // mapDispatchToProps
)(Categorias);
