import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MenuSuperior from '../menusuperior/Menusuperior'

class Home extends Component {
  componentDidMount(){
    console.log(this.props.dataLogin.email)
  }

  render() {
    return (
      <div>
        <MenuSuperior />
        <Segment>
          Welcome , <strong> {this.props.dataLogin.email}</strong>
         </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => ({
	dataLogin: state.login,
});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(null, dispatch);

export default connect(mapStateToProps, null)(Home);
