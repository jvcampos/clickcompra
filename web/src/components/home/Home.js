import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'
import './home.css'
import { VictoryPie } from 'victory'
import { SemanticToastContainer } from 'react-semantic-toasts'


// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MenuSuperior from '../menusuperior/Menusuperior'

class Home extends Component {
  state = {
    ChartData: [
      { name: "Seg.", value: 20 },
      { name: "Terç.", value: 50 },
      { name: "Qua", value: 10 },
      { name: "Qui", value: 80 },
      { name: "Sex", value: 70 },
      { name: "Sáb", value: 90 },
      { name: "Dom", value: 47 },
    ]
  }

  componentDidMount() {
    console.log(this.props.dataLogin.email)
  }

  render() {
    return (
      <div>
        <SemanticToastContainer />
        <MenuSuperior />
        <Segment>
          Welcome , <strong> {this.props.dataLogin.email}</strong>
        </Segment>
        <div className = 'chartPie' style={{width: 400}}>
          <h3>Vendas por dias da semana</h3>
          <VictoryPie
            colorScale={["#4286f4", "#ce7323", "#e8d037", "#21d16d", "navy"]}
            data={this.state.ChartData} x="name" y="value" />
        </div>
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
