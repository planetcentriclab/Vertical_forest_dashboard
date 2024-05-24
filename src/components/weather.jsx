import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function useWeather() {
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
  const [formattedTime, setFormattedTime] = useState('');

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const WeekDays = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
  ];
  const currentDate = new Date();
  const date = `${WeekDays[currentDate.getDay()]}, ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours < 10 ? '0' : ''}${hours}:${strMinutes} ${ampm}`;
  };

  const getWeatherByLocation = useCallback(async (latitude, longitude) => {
    setWeather(prevWeather => ({ ...prevWeather, loading: true }));
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

    try {
      const res = await axios.get(url, {
        params: {
          lat: latitude,
          lon: longitude,
          units: 'metric',
          appid: api_key,
        },
      });
      setWeather({ data: res.data, loading: false, error: false });
    } catch (error) {
      setWeather({ data: {}, loading: false, error: true });
      console.error('Weather API error:', error);
    }
  }, []);

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getWeatherByLocation(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setWeather(prevWeather => ({ ...prevWeather, loading: false, error: true }));
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setWeather(prevWeather => ({ ...prevWeather, loading: false, error: true }));
    }
  }, [getWeatherByLocation]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = new Date();
      setFormattedTime(formatTime(newTime));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { weather, date, formattedTime };
}

export default useWeather;
