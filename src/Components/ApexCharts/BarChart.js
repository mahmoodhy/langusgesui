// MyChart.js
import React from 'react';
import Chart from 'react-apexcharts';

const BarChart = ({xaxiscategories,titletext,seriesname,seriesdata}) => {
  const state = {
    options: {
      chart: {
        id: 'example-chart',
        toolbar: {
          show: true,
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
      title: {
        text: 'Monthly Sales Data',
        align: 'center',
      },
    },
    series: [
      {
        name: 'Sales',
        data: [30, 40, 35, 50, 49, 60, 70],
      },
    ],
  };

  return (
    <div>
      <Chart
        options={state.options}
        series={state.series}
        type="bar" // Change this to the type of chart you want (e.g., line, pie)
        height={350}
      />
    </div>
  );
};

export default BarChart;
