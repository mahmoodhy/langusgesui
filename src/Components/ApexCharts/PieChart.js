// PieChart.js
import React from 'react';
import Chart from 'react-apexcharts';

const PieChart = ({lables,series,titletext}) => {
  const state = {
    options: {
      dataLabels: {
        enabled: true,
        },
      chart: { 
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100]
          }
        },
        id: '',
        toolbar: {
          show: true,
        }, 
        animations: {
          enabled: true,
          speed: 800,
          animateGradually: {
              enabled: true,
              delay: 150
          },
          dynamicAnimation: {
              enabled: true,
              speed: 350
          }
      },
      }
      ,legend: {
        // position: 'bottom',
        horizontalAlign: 'right',
      }
      ,
      labels: lables, // Labels for the pie chart
      title: {
        text: titletext,
        align: 'center',
      },
      responsive: [
        {breakpoint: 480,
          options: {
            chart: {
              width: 400,
            },
           
          },
        },
      ],
    },
    series: series, // Data for the pie chart
  };

  return (
    <div>
      <Chart
        options={state.options}
        series={state.series}
        
        type="pie" // Specify the chart type as 'pie'
        height={550}
      />
    </div>
  );
};

export default PieChart;
