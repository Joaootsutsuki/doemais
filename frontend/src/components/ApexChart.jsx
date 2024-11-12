import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartView = ({ chartDataProp }) => {
  const series = [
    {
      name: "Quantidade de litros de sangue",
      data: chartDataProp.prices, // Usa dados do chartDataProp para o array de preços
    },
  ];

  const options = {
    stroke: {
      width: 2,
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
    title: {
      text: "Quantidade Litros Mensais",
      align: "center",
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
      title: {
        text: "Meses",
      },
    },
    tooltip: {
      shared: true,
    },
  };

  return <ReactApexChart options={options} series={series} type="area" height={600} width={1000} />;
};

export default ChartView;
