import React, { Component } from "react";
import { Segment, Grid } from "semantic-ui-react";
import "./home.css";
import { SemanticToastContainer } from "react-semantic-toasts";
import * as Chart from "react-chartkick";
import "chart.js";
import axios from "axios";
import _ from "lodash";

// import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

import MenuSuperior from "../menusuperior/Menusuperior";

class Home extends Component {
  state = {
    dataCategories: [],
    dataProducts: [],
    dataUsers: []
  };

  async componentDidMount() {
    await axios
      .get(
        `http://localhost:3001/api/products/betterproducts/${JSON.parse(
          localStorage.id_supermarket
        )}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      )
      .then(response => {
        this.setState({
          dataProducts: response.data.map(item => [
            item.name_product,
            item.qtde
          ])
        });
        this.loadingCategories();
        this.loadinUsers();
      });
  }

  async loadingCategories() {
    await axios
      .get(
        `http://localhost:3001/api/products/bettercategory/${JSON.parse(
          localStorage.id_supermarket
        )}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      )
      .then(response => {
        const tt =  _.countBy(response.data, 'name_category')
        this.setState({dataCategories: Object.entries(tt) })   
        console.log(this.state.dataCategories)  
      });
  }

  async loadinUsers(){
    await axios
      .get(
        `http://localhost:3001/api/users/betteruser/${JSON.parse(
          localStorage.id_supermarket
        )}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      )
      .then(response => {
        const tt =  _.countBy(response.data, 'name')
        this.setState({dataUsers: Object.entries(tt) }) 
        console.log(this.state.dataUsers)
        })      
  }

  render() {
    return (
      <div>
        <SemanticToastContainer />
        <MenuSuperior />
        
        <React.Fragment>
          <Grid verticalAlign="center" style={{'padding-top': '40px'}}>
            <Grid.Row verticalAlign="center">
              <Grid.Column width={5}>
                <h3>Clientes com maiores compras</h3>
                <Chart.ColumnChart data={this.state.dataUsers} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
            <Grid verticalAlign="center" textAlign="left" style={{ height: "90%" }}>
              <Grid.Row>
                <div className="chart" style={{ width: 400 }}>
                  <h3>Categorias mais vendidas</h3>
                  <Chart.PieChart data={this.state.dataCategories} />
                </div>
                <Grid.Column width={3}>
                  <div className="chart" style={{ width: 400 }}>
                    <h3>Produtos mais vendidos</h3>
                    <Chart.PieChart data={this.state.dataProducts} />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataLogin: state.login
});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(null, dispatch);

export default connect(mapStateToProps, null)(Home);
