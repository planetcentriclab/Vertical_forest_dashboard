// // StockChartWithRangeSelector.jsx file
// import React, { Component } from 'react';
// import CanvasJSReact from '@canvasjs/react-stockcharts';
// import axios from 'axios';

// const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

// class StockChartWithRangeSelector extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       temperatureData: [],
//       humidityData: [],
//       soilTemperatureData: [],
//       soilMoistureData: [],
//       isLoaded: false,
//       error: null,
//       firstDate: null,
//       lastDate: null
//     };
//     this.toggleDataSeries = this.toggleDataSeries.bind(this);
//   }

//   componentDidMount() {
//     const baseURL = "https://books-opening.gl.at.ply.gg:61345/api/v1/verticalForest/";
//     const endpoints = ["temperature", "humidity", "soilTemperature", "soilMoisture"];

//     Promise.all(endpoints.map(endpoint => axios.get(baseURL + endpoint).then(response => response.data)))
//       .then(data => {
//         const allData = data.flat();
//         const firstDate = new Date(allData[0].date + " " + allData[0].time);
//         const lastDate = new Date(allData[allData.length - 1].date + " " + allData[allData.length - 1].time);

//         this.setState({
//           temperatureData: this.parseData(data[0]),
//           humidityData: this.parseData(data[1]),
//           soilTemperatureData: this.parseData(data[2]),
//           soilMoistureData: this.parseData(data[3]),
//           isLoaded: true,
//           firstDate: firstDate,
//           lastDate: lastDate
//         });
//       })
//       .catch(error => {
//         this.setState({
//           isLoaded: true,
//           error: error.message
//         });
//       });
//   }

//   parseData = data => {
//     return data
//       .sort((a, b) => new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time))
//       .filter(item => item.date && item.time && item.value_con !== null && !isNaN(Number(item.value_con)))
//       .map(item => ({
//         x: new Date(item.date + " " + item.time),
//         y: Number(item.value_con) > 0 && Number(item.value_con) <= 100 ? Number(item.value_con) : null
//       }));
//   }  

//   toggleDataSeries(e) {
//     if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
//       e.dataSeries.visible = false;
//     } else {
//       e.dataSeries.visible = true;
//     }
//     this.chart.render();
//   }

//   render() {
//     const { temperatureData, humidityData, soilTemperatureData, soilMoistureData, isLoaded, error, firstDate, lastDate } = this.state;

//     if (error) {
//       return <div>Error: {error}</div>;
//     } else if (!isLoaded) {
//       return <div>Loading...</div>;
//     } else {
//       const options = {
//         title: { text: "History Data" },
//         theme: "light2",
//         exportEnabled: true,
//         charts: [{
//           axisX: {
//             crosshair: {
//               enabled: true,
//               snapToDataPoint: true,
//               valueFormatString: "MMM DD YYYY, HH:mm:ss"
//             }
//           },
//           axisY: { title: "Value" },
//           // toolTip: { shared: true },
//           toolTip: {
//             shared: true,
//             enabled: true,  // Ensure the toolTip is enabled
//             content: "{name}: {y}"  // Format the content of the toolTip
//           },
//           legend: {
//             cursor: "pointer",
//             verticalAlign: "top",
//             itemclick: this.toggleDataSeries
//           },
//           data: [
//             { type: "line", name: "Temperature", showInLegend: true, connectNullData: true, xValueFormatString: "MMM DD YYYY, HH:mm:ss", yValueFormatString: "#,##0°C", dataPoints: temperatureData },
//             { type: "line", name: "Humidity", showInLegend: true, connectNullData: true, yValueFormatString: "#,##0", dataPoints: humidityData },
//             { type: "line", name: "Soil Temperature", showInLegend: true, connectNullData: true, yValueFormatString: "#,##0°C", dataPoints: soilTemperatureData },
//             { type: "line", name: "Soil Moisture", showInLegend: true, connectNullData: true, yValueFormatString: "#,##0", dataPoints: soilMoistureData }
//           ]
          
//         }],
//         navigator: {
//           slider: { minimum: firstDate, maximum: lastDate },
//           // data: [
//           //   { type: "line", dataPoints: temperatureData },
//           //   { type: "line", dataPoints: humidityData },
//           //   { type: "line", dataPoints: soilTemperatureData },
//           //   { type: "line", dataPoints: soilMoistureData }
//           // ]
//         },
//         rangeSelector: {
//           inputFields: { startValue: firstDate, endValue: lastDate }
//         }
//       };

//       const containerProps = { width: "100%", height: "450px", margin: "auto" };

//       return (
//         <div>
//           <CanvasJSStockChart containerProps={containerProps} options={options} ref={ref => this.chart = ref} />
//         </div>
//       );
//     }
//   }
// }

// export default StockChartWithRangeSelector;


// StockChartWithRangeSelector.jsx
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-stockcharts';
import axios from 'axios';

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class StockChartWithRangeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSets: [],
      dataSetsnav: [],
      isLoaded: false,
      error: null,
      firstDate: null,
      lastDate: null,
    };
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }

  componentDidMount() {
    const baseURL = "https://books-opening.gl.at.ply.gg:61345/api/v1/verticalForest/";
    const { endpoints, units } = this.props;

    const colors = [ "#6D78AD","#51CDA0","#DF7970","#4C9CA0","#AE7D99","#C9D45C","#5592AD",];

    Promise.all(endpoints.map((endpoint) => axios.get(baseURL + endpoint).then((response) => response.data)))
      .then((data) => {
        const allData = data.flat();
        const firstDate = new Date(allData[0].date + " " + allData[0].time);
        const lastDate = new Date(allData[allData.length - 1].date + " " + allData[allData.length - 1].time);

        const parsedDataSets = data.map((dataset, index) => ({
          type: "line",
          name: this.getDatasetName(endpoints[index]),
          showInLegend: true,
          connectNullData: true,
          xValueFormatString: "MMM DD YYYY, HH:mm:ss",
          yValueFormatString: "#,##0" + units[index],
          dataPoints: this.parseData(dataset, units[index]),
          color: colors[index % colors.length],
        }));
        
        const parsedDataSetsnav = data.map((datasetnav, index) => ({
          // type: "area", 
          dataPoints: this.parseData(datasetnav, units[index]),
          color: colors[index % colors.length],
        })
        );

        this.setState({
          dataSets: parsedDataSets,
          dataSetsnav: parsedDataSetsnav,
          isLoaded: true,
          firstDate: firstDate,
          lastDate: lastDate,
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error: error.message,
        });
      });
  }

  parseData = (data, unit) => {
    return data
      .sort((a, b) => new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time))
      .filter((item) => item.date && item.time && item.value_con !== null && !isNaN(Number(item.value_con)))
      .map((item) => {
        const value = unit === "mL"? Number(item.value_con)* 1000: Number(item.value_con);
        return {
          x: new Date(item.date + " " + item.time),
          y: (unit === "mL"? value >= 0 : value > 0) && value <= (unit === "mL"? 2000:100) ? value : null,
        };
      });
  };

  toggleDataSeries(e) {
    const { dataSets } = this.state;
    const index = dataSets.findIndex(series => series.name === e.dataSeries.name);

    if (index !== -1) {
      const updatedDataSets = [...dataSets];
      updatedDataSets[index].visible = typeof updatedDataSets[index].visible === "undefined" ? false : !updatedDataSets[index].visible;

      this.setState({ dataSets: updatedDataSets });
    }
  }

  getDatasetName = (endpoint) => {
    switch (endpoint) {
      case "light":
        return "Light";
      case "temperature":
        return "Temperature";
      case "humidity":
        return "Humidity";
      case "soilTemperature":
        return "Soil Temperature";
      case "soilMoisture":
        return "Soil Moisture";
      case "soilPH":
        return "Soil PH";
      case "waterFlow1":
        return "Water Flow 1";
      case "waterFlow2":
        return "Water Flow 2";
      case "voltageFlow":
        return "Voltage Flow";
      case "currentFlow":
        return "Current Flow";
      default:
        return "";
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.dataSets !== this.state.dataSets ||
           nextState.isLoaded !== this.state.isLoaded ||
           nextState.error !== this.state.error;
  }

  render() {
    const { dataSets, dataSetsnav, isLoaded, error, firstDate, lastDate } = this.state;
    const { size } = this.props;

    if (error) {
      return <div>Error: {error}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const options = {
        title: { text: "History Data" },
        theme: "light2",
        exportEnabled: true,
        charts: [
          {
            axisX: {
              crosshair: {
                enabled: true,
                snapToDataPoint: true,

                // valueFormatString: "MMM DD YYYY, HH:mm:ss",
              },
            },
            axisY: [{ title: "Value" }],
            toolTip: { shared: true },
            legend: {
              cursor: "pointer",
              verticalAlign: "top",
              itemclick: this.toggleDataSeries,
            },
            data: dataSets,
          },
        ],
        navigator: {
          slider: { minimum: firstDate, maximum: lastDate },
          data: dataSetsnav,
        },
        rangeSelector: {
          inputFields: { startValue: firstDate, endValue: lastDate },
        },
      };

      const containerProps = { width: "100%", height:`${size}px`, margin: "auto" };

      return (
        <div>
          <CanvasJSStockChart containerProps={containerProps} options={options} ref={(ref) => (this.chart = ref)} />
        </div>
      );
    }
  }
}

export default StockChartWithRangeSelector;