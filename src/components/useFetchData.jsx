//useFetchData.jsx file
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

function useFetchData() {
  const [data, setData] = useState({
    light: {},
    temperature: {},
    humidity: {},
    soilTemperature: {},
    soilMoisture: {},
    soilPH: {},
    waterFlow1: {},
    waterFlow2: {},
    voltageFlow: {},
    currentFlow: {}
  });

  const [averageData, setAverageData] = useState({
    light: {},
    temperature: {},
    humidity: {},
    soilTemperature: {},
    soilMoisture: {},
    soilPH: {},
    waterFlow1: {},
    waterFlow2: {},
    voltageFlow: {},
    currentFlow: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoints = [
          'lightIntensity', 'temperature', 'humidity', 'soilTemperature', 'soilMoisture', 'soilPH', 'waterFlow1', 'waterFlow2', 'voltageFlow', 'currentFlow'
        ];

        const results = await Promise.all(endpoints.map(endpoint =>
          axios.get(`https://books-opening.gl.at.ply.gg:61345/api/v1/verticalForest/${endpoint}`)
        ));

        const fetchedData = {
          light: results[0].data,
          temperature: results[1].data,
          humidity: results[2].data,
          soilTemperature: results[3].data,
          soilMoisture: results[4].data,
          soilPH: results[5].data,
          waterFlow1: results[6].data,
          waterFlow2: results[7].data,
          voltageFlow: results[8].data,
          currentFlow: results[9].data
        };

        setData(fetchedData);
        calculateAverages(fetchedData);
      } catch (err) {
        console.log(err);
      }
    };

    const calculateAverages = (fetchedData) => {
      const oneWeekAgo = dayjs().subtract(1, 'week');
      const timePeriods = {
        morning: { start: "06:00:00", end: "11:59:59" },
        afternoon: { start: "12:00:00", end: "17:59:59" },
        evening: { start: "18:00:00", end: "23:59:59" },
        night: { start: "00:00:00", end: "05:59:59" }
      };

      const calculatePeriodAverage = (data) => {
        const periodData = {
          morning: { sum: 0, count: 0 },
          afternoon: { sum: 0, count: 0 },
          evening: { sum: 0, count: 0 },
          night: { sum: 0, count: 0 }
        };

        data.forEach(entry => {
          if (dayjs(`${entry.date} ${entry.time}`).isAfter(oneWeekAgo)) {
            const time = entry.time;
            const value = parseFloat(entry.value_con);

            if (time >= timePeriods.morning.start && time <= timePeriods.morning.end) {
              periodData.morning.sum += value;
              periodData.morning.count += 1;
            } else if (time >= timePeriods.afternoon.start && time <= timePeriods.afternoon.end) {
              periodData.afternoon.sum += value;
              periodData.afternoon.count += 1;
            } else if (time >= timePeriods.evening.start && time <= timePeriods.evening.end) {
              periodData.evening.sum += value;
              periodData.evening.count += 1;
            } else if (time >= timePeriods.night.start && time <= timePeriods.night.end) {
              periodData.night.sum += value;
              periodData.night.count += 1;
            }
          }
        });

        return {
          morning: periodData.morning.count > 0 ? (periodData.morning.sum / periodData.morning.count).toFixed(2) : null,
          afternoon: periodData.afternoon.count > 0 ? (periodData.afternoon.sum / periodData.afternoon.count).toFixed(2) : null,
          evening: periodData.evening.count > 0 ? (periodData.evening.sum / periodData.evening.count).toFixed(2) : null,
          night: periodData.night.count > 0 ? (periodData.night.sum / periodData.night.count).toFixed(2) : null
        };
      };

      const newAverageData = {};
      for (const [key, value] of Object.entries(fetchedData)) {
        newAverageData[key] = calculatePeriodAverage(value).toFixed(2);
      }

      setAverageData(newAverageData);
    };

    fetchData();
  }
  , [data]);

  // return { data, averageData };
  return { data, averageData };
}

export default useFetchData;
