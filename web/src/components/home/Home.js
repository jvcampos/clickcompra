import React, { Component } from "react";
import { Segment, Grid } from "semantic-ui-react";
import "./home.css";
import { SemanticToastContainer } from "react-semantic-toasts";
import { LineChart, PieChart, ColumnChart } from "react-chartkick";
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
    dataDays: [
      ["Segunda", 100],
      ["Terça", 200],
      ["Quarta", 500],
      ["Quinta", 50],
      ["Sexta", 150],
      ["Sábado", 1000],
      ["Domingo", 900]
    ]
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
        console.log('dentro do then',Object.entries(tt))        
      });
  }

  render() {
    return (
      <div>
        <SemanticToastContainer />
        <MenuSuperior />
        <Segment>
          Welcome , <strong> {this.props.dataLogin.email}</strong>
        </Segment>
        <Grid verticalAlign="center">
          <Grid.Row verticalAlign="center">
            <Grid.Column width={10}>
              <h3>Dias da semana e total de vendas</h3>
              <ColumnChart data={this.state.dataDays} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid verticalAlign="center" textAlign="left" style={{ height: "90%" }}>
          <Grid.Row>
            <div className="chart" style={{ width: 400 }}>
              <h3>Categorias mais vendidas</h3>
              <PieChart data={this.state.dataCategories} />
            </div>
            <Grid.Column width={3}>
              <div className="chart" style={{ width: 400 }}>
                <h3>Produtos mais vendidos</h3>
                <PieChart data={this.state.dataProducts} />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
