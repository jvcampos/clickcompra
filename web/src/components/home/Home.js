import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MenuSuperior from '../menusuperior/Menusuperior'

class Home extends Component {
  render() {
    return (
      <div>
        <MenuSuperior/>
        <h3>Home</h3>
      </div>
    )
  }
}

// const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(null, dispatch);

export default connect(null,null)(Home);
