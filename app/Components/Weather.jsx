'use client';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners'; // Import the BarLoader component from react-spinners
import Image from 'next/image';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState('/images/default.jpg'); // Default background image

  useEffect(() => {
    // Fetch user's IP address
    fetch('https://api64.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        const ip = data.ip;
        // Get latitude and longitude from the IP address
        fetch(`https://ipapi.co/${ip}/latlong/`)
          .then(response => response.text())
          .then(latlong => {
            const [lat, lon] = latlong.split(',');
            // Fetch weather data using latitude and longitude
            fetch(`https://api.weatherapi.com/v1/forecast.json?key=Your_API_KEY_From_Weather_API&q=${lat},${lon}&days=14`)
              .then(response => response.json())
              .then(weatherResponse => {
                setWeatherData(weatherResponse);
                setIsLoading(false);
                updateBackgroundImage(weatherResponse.current.condition.code); // Update background image based on weather condition code
              })
              .catch(error => {
                console.error('Error fetching weather data:', error);
                setIsLoading(false);
              });
          })
          .catch(error => {
            console.error('Error fetching latitude and longitude:', error);
            setIsLoading(false);
          });
      })
      .catch(error => {
        console.error('Error fetching IP address:', error);
        setIsLoading(false);
      });
  }, []);

  // Function to update background image based on weather condition code
  const updateBackgroundImage = (code) => {
    if (code === 1000) {
      setBackgroundImage('/images/clear.jpg');
    } else if ([1003, 1006, 1009].includes(code)) {
      setBackgroundImage('/images/cloudy.jpg');
    } else if ([1063, 1069, 1072, 1087, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(code)) {
      setBackgroundImage('/images/rain.jpg');
    } else if ([1066, 1069, 1079, 1114, 1117, 1210, 1213, 1216, 1219, 1222].includes(code)) {
      setBackgroundImage('/images/snow.webp');
    } else {
      setBackgroundImage('/images/default.jpg');
    }
  };

  const renderFutureDates = () => {
    if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) return null;
    
    return weatherData.forecast.forecastday.map((day, index) => (
      <div key={index} className='flex flex-col my-2 mx-2'>
        <h1 className='text-white text-center text-md font-bold flex flex-row items-center justify-center w-32'>{day.date}</h1>
        <h1 className='text-white text-center text-md font-bold w-32'>{day.day.maxtemp_c}°C</h1>
        <h1 className='text-white text-center text-md font-bold w-32'>{day.day.condition.text}</h1>
      </div>
    ));
  };

  return (     
    <div style={{ height: '400px', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }} className='flex flex-col md:w-96 w-80 shadow-2xl border-4 border-white rounded-2xl z-10'>
      <div className='w-full h-16 relative'></div>
      <div className='flex flex-col justify-center'>
        {isLoading ? ( // Render the loading spinner if isLoading is true
          <div className='flex justify-center mt-32'>
            <BarLoader color='#ffffff' loading={isLoading} />
          </div>
        ) : (
          <>
            {weatherData && ( // Check if weatherData is not null before accessing its properties
              <>
                <h1 className='text-white mt-14 text-center text-xl font-bold'>{weatherData.location.name}</h1>
                <h1 className='text-white text-center text-md font-bold'>{weatherData.location.region}</h1>
                <div className='flex flex-row justify-center'>
                  <h1 className='text-white text-center text-md font-bold'>{new Date().getHours() >= 6 && new Date().getHours() < 18 ? 'Day' : 'Night'}</h1>
                  <h1 className='text-white text-center text-md mx-5 font-bold'>{weatherData.current.condition.text}</h1>
                  <h1 className='text-white text-center text-md font-bold mb-5'>{weatherData.current.temp_c}°C</h1>
                </div>
                <div className='flex flex-row mx-2 overflow-x-auto'>
                  {renderFutureDates()}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>    
  );
};

export default Weather;
