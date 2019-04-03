import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'
import { VictoryChart, VictoryBar } from 'victory'

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MenuSuperior from '../menusuperior/Menusuperior'

class Home extends Component {
  state = {
    ChartData: [
      { name: "Mon", value: 20 },
      { name: "Tue", value: 50 },
      { name: "Wed", value: 10 },
      { name: "Thu", value: 80 },
      { name: "Fri", value: 70 },
      { name: "Sat", value: 90 },
      { name: "Sun", value: 47 },
    ]
  }

  componentDidMount() {
    console.log(this.props.dataLogin.email)
  }

  render() {
    return (
      <div>
        <MenuSuperior />
        <Segment>
          Welcome , <strong> {this.props.dataLogin.email}</strong>
        </Segment>
          <VictoryChart horizontal domainPadding={2} heigth={0}>
          <VictoryBar
            style={{ data: { fill: "#0164dd" } }}
            data={this.state.ChartData} x="name" y="value" />
        </VictoryChart>

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
