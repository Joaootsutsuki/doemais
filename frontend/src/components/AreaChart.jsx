import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartArea = ({ chartDataProp }) => {
  const series = [
    {
      data: chartDataProp.prices, // Usa dados do chartDataProp para o array de preços
    },
  ];

  const options = {
    stroke: {
      width: 2,
    },
    title: {
      text: "Doadores Mensais",
      style: {
        fontSize:  '18px',
        fontFamily:  "Poppins",
      }
    },
    colors: ["#C8513F"],
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.8,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.9,
      },
    },

    yaxis: {
      show: false,
      labels: {
        formatter: function (val) {
          return `${val.toFixed(0)} L`;
        },
      },
      title: {
        text: "Quantidade (em Litros)",
      },
    },
    xaxis: {
      position: "top",
      categories: chartDataProp.dates,
      
    },
    tooltip: {
      shared: true,
    },
  };

  return <ReactApexChart options={options} series={series} type="area" height={380} width={400} />;
};

export default ChartArea;