import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Container } from "reactstrap";

class ResultChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [
            "Covvidon",
            "Cengaverler",
            "Jacobs",
            "Hoppa"
          ],
        },
      },
      series: [
        {
          name: "Number of code lines",
          data: [60, 70, 90, 85],
        },
      ],
    };
  }

  render() {
    return (
      <Container>
        <div className="app" style={{ width:"100%", height:"100%" }}>
          <div className="row">
            <div
              // className="mixed-chart"
              // style={{ position: "relative", left: "14%", marginTop: "5%" }}
            >
              <Chart style={{position:"relative"}}
                options={this.state.options}
                series={this.state.series}
                type="bar"
                width="400"
              />
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default ResultChart;
