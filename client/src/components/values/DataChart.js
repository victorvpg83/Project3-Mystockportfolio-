import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class DataChart extends Component {
 

  componentDidMount() {
   

    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.paddingRight = 20;

    let data = [];
    let visits = 10;
    let val = this.props.dataClose.map(e=>e.close)
    let dat = this.props.dataClose.map(e=>e.date)

    for (let i = 1; i < 260; i++) {
      visits = val[i]
      data.push({ date: new Date(dat[i]), name: "name" + i, value: visits });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();


    this.chart = chart;
  }


  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {

    return (
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    );

  }
}

export default DataChart;