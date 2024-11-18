import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartArea = () => {
  const series = [
    {
      name: "Litros de sangue",
      data: [10, 15, 14, 18, 20, 18, 25, 28, 23, 30, 20, 20],
    },
  ];

  const options = {
    stroke: {
      width: 2,
    },
    title: {
      text: "Doadores Mensais",
      style: {
        fontSize: "18px",
        fontFamily: "Poppins",
      },
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
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      shared: true,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 280,
            width: "100%",
          },
          title: {
            style: {
              fontSize: "14px",
            },
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          },
        },
      },
      {
        breakpoint: 425,
        options: {
          chart: {
            height: 250,
            width: "100%",
          },
          title: {
            style: {
              fontSize: "12px",
            },
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "8px",
              },
            },
          },
        },
      },
    ],
  };

  return <ReactApexChart options={options} series={series} type="area" height={380} width={400} />;
};
//380 400
export default ChartArea;
