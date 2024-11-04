import { useEffect, useState } from 'react';
import PieCharts from '../../src/Components/ApexCharts/PieChart'
import axios from 'axios';
import configData from "../../src/config.json";
import { useCookies } from 'react-cookie';


const Statistics = () => {
  const [lables, setLabels] = useState(['Appele', 'Banana', 'Cherry', 'Date']);
  const [series, setSeries] = useState([44, 55, 13, 43]);
  const [cookies] = useCookies(['token'])
  const [Error, setError] = useState('');
  const [totalSum, setTotalSum] = useState(0);
  const [partialSum, setPartialSum] = useState(0);

  const GetWordsStatistics = async () => {
    try {

      // Replace with your API call to get a random word
      const response = await axios.post(`${configData.SERVER_URL}/api/Home/GetUserBoxWordsStatistics`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.token.token}`,
        },
      });
      const data = response.data.data;
      console.log(data);

      const aggregatedData = {};

      data.forEach(item => {
        const label = dayMapping[item.boxDay] || `day${item.boxDay}`;
        if (aggregatedData[label]) {
          // Sum the boxCount if the label already exists
          aggregatedData[label].boxCount += item.boxCount;
        } else {
          // Initialize the boxCount for new labels
          aggregatedData[label] = { boxCount: item.boxCount, boxDay: item.boxDay };
        }
      });
      const sortedData = Object.entries(aggregatedData)
        .sort(([, a], [, b]) => a.boxDay - b.boxDay)
        .map(([label, { boxCount }]) => ({ label, boxCount }));

      const newLabels = sortedData.map(item => item.label);
      const newSeries = sortedData.map(item => item.boxCount);

      const total = newSeries.reduce((acc, count) => acc + count, 0);
      const partial = sortedData
      .filter(item => ["لغات جدید", "جعبه روز اول"].includes(item.label))
      .reduce((acc, item) => acc + item.boxCount, 0);
  setPartialSum(partial);
        setTotalSum(total);
      setLabels(newLabels);
      setSeries(newSeries);
    } catch (error) {
      console.error('Error GetWordsStatistics:', error);
      setError('Error GetWordsStatistics');
    }
  };

  const dayMapping = {
    "-1": "لغات جدید",
    "0": "لغات جدید",
    "1": "جعبه روز اول",
    "2": "جعبه روز دوم",
    "4": "جعبه روز چهارم",
    "8": "جعبه روز هشتم",
    "16": "جعبه روز شانزدهم",
    "32": "جعبه روز سی و دوم",
    "64": "جعبه روز شصت و چهارم",
    "128": "جعبه ماه چهارم",
    "256": "جعبه سال اول",
    "512": "لغات فراگرفته شده",

  };

  useEffect(() => {
    const initialize = async () => {
      await GetWordsStatistics();
    };


    initialize();
  }, []);


  return (
    <div className='w-100'>

      <PieCharts lables={lables} series={series} titletext={'لغات فراگرفته شده'}></PieCharts>
      <h3>Total Sum of All Labels:</h3>
            <p>{totalSum}</p>
            <h3>Partial Sum of "newones" and "firstday":</h3>
            <p>{partialSum}</p>

    </div>)
};

export default Statistics;