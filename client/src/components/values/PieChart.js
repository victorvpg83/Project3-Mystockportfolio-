import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class PieChart extends React.Component {

  constructor(props) {
      super(props)

      this.state = {
          GlP: {
              portValue: undefined,
              cash: undefined,
              totalValue: undefined,
              profitLose: undefined,
          },
          valuesN: [],
          ROp: [],
          profit: undefined,
          loss: undefined
      }
  }

  buyLossCalc = () => {
    let profit = 0
    let loss = 0

    let plv = this.props.values.map(e => e.APIPrice-e.BDValue)

    for (let i = 0; i < plv.length; i++) {

      plv[i]>0 ? profit++: loss++
    }
    this.setState({
      profit:profit,
      loss:loss
  }, () => this.chartInit())

  }
  
  // buyLossCalc()

  componentDidMount = () => {
    this.buyLossCalc()

    
    
  }
  
  chartInit =() => {
    
    console.log(this.state)
    // Create chart instance
let chart = am4core.create("chartdiv2", am4charts.PieChart);
// Add data
chart.data = [{
  "country": "Ganadoras",
  "litres": this.state.profit,
  "color": am4core.color("#72a15a")
}, {
  "country": "Perdedoras",
  "litres": this.state.loss,
  "color": am4core.color("#ae4646")
}];

// Add and configure Series
let pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "country";
pieSeries.slices.template.propertyFields.fill = "color"

  }

  render() {
    console.log(this.state.profit)
    return (
      <>
      <div id="chartdiv2" ></div>
      </>
    );

  }
}

export default PieChart