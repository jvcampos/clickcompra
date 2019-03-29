import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { Container } from './styles';

class Produtos extends Component {
  render() {
    return (
      <div>
        <h3>Produtos</h3>
        <ul>
          <li>Carne</li>
          <li>Arroz</li>
          <li>Macarrão</li>
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
)(Produtos);
