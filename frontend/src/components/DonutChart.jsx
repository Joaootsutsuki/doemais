import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartDonut = () => {
    const series = [30, 7, 15, 5, 8, 3, 25, 7];
  
    const options = {
        stroke: {
            width: 0,
          },
          states: {
            active: {
              filter: {
                type: 'none' 
              }
            }
          },
        chart: {
          type: 'donut',
          
        },
        border:{
            show: false,
        },
        labels: ['Tipo A+', 'Tipo A-', 'Tipo B+', 'Tipo B-', 'Tipo AB+', 'Tipo AB-', 'Tipo O+', 'Tipo O-'],
        colors: ['#FF6666', '#FF9999', '#FF8080', '#FFB3B3', '#FFCCCC', '#FFE6E6', '#FFD1D1', '#FFF0F0'],
        legend: {
          position: 'bottom',
          markers: {
            fillColors: ['#FF6666', '#FF9999', '#FF8080', '#FFB3B3', '#FFCCCC', '#FFE6E6', '#FFD1D1', '#FFF0F0']
          }
        },
        dataLabels: {
          enabled: true,
          formatter: (val) => `${val.toFixed(0)}%`,
          style: {
            fontSize: '16px',
            fontFamily: 'Poppins',
            fontWeight: 'regular',
            colors: ['#333']
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
                total: {
                  show: true,
                  label: 'Total',
                  formatter: () => '100%',
                }
              }
            }
          },
          
        },
        annotations: {
          position: 'front', // Coloca a label em cima do gráfico
          texts: [{
            x: '50%', // Centraliza horizontalmente
            y: -10,   // Ajusta a posição vertical acima do gráfico
            text: 'Reserva de Bolsas', // Texto da label
            fontSize: '20px',
            fontFamily: 'Poppins',
            color: '#333',
            textAnchor: 'middle',
          }]
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };
  
    return <ReactApexChart options={options} series={series} type="donut" height={380} width={400} />;
  };


export default ChartDonut;