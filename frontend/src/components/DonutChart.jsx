import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartDonut = () => {
  const series = [30, 7, 15, 5, 8, 3, 25, 7];

  const options = {
    stroke: {
      width: 0,
    },
    title: {
      text: "Reserva de Bolsas",
      align: "center",
      offsetY: -7,
      style: {
        fontSize: "18px",
        fontFamily: "Poppins",
        color: "#333",
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => `${val}%`,
      },
      fillSeriesColor: false,
    },
    chart: {
      type: "donut",
    },
    border: {
      show: false,
    },
    labels: ["Tipo A+", "Tipo A-", "Tipo B+", "Tipo B-", "Tipo AB+", "Tipo AB-", "Tipo O+", "Tipo O-"],
    colors: ["#FF6666", "#FF9999", "#FF8080", "#FFB3B3", "#FFCCCC", "#FFE6E6", "#FFD1D1", "#FFF0F0"],
    legend: {
      position: "bottom",
      markers: {
        fillColors: ["#FF6666", "#FF9999", "#FF8080", "#FFB3B3", "#FFCCCC", "#FFE6E6", "#FFD1D1", "#FFF0F0"],
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val.toFixed(0)}%`,
      style: {
        fontSize: "16px",
        fontFamily: "Poppins",
        fontWeight: "regular",
        colors: ["#333"],
      },
      dropShadow: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "16px",
              fontFamily: "Poppins",
              color: "#333",
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "18px",
              fontFamily: "Poppins",
              color: "#333",
              formatter: (val) => `${val}%`,
            },
            total: {
              show: true,
              showAlways: true,
              label: "Total",
              fontSize: "16px",
              fontFamily: "Poppins",
              color: "#333",
              formatter: () => "100%",
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%", // Ajusta o gráfico para usar 100% da largura do contêiner
          },
          legend: {
            position: "bottom",
            fontSize: "12px", // Reduz o tamanho da fonte para legendas em telas menores
          },
          dataLabels: {
            style: {
              fontSize: "12px", // Ajusta o tamanho dos data labels para telas menores
            },
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  name: {
                    fontSize: "14px", // Ajuste para o nome no centro do gráfico
                  },
                  value: {
                    fontSize: "16px", // Ajuste para o valor no centro do gráfico
                  },
                  total: {
                    fontSize: "14px", // Ajuste para o texto "Total" no centro
                  },
                },
              },
            },
          },
        },
      },
      {
        breakpoint: 425,
        options: {
          chart: {
            width: "90%",
          },
          legend: {
            fontSize: "10px",
          },
          title: {
            style: {
              fontSize: "16px",
            },
          },
        },
      },
    ],
  };

  return <ReactApexChart options={options} series={series} type="donut" height={380} width="100%" />;
};

export default ChartDonut;
