import React from 'react';
import { useState, useEffect } from 'react';
import {getWeatherData} from './data/weatherapi';
import {ScaleLoader} from 'react-spinners';

function App() {
  const [weatherdata, setWeatherData] = useState(null);
  const [city, setCity] = useState('Nigeria');
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try{
        setLoading(true);
        const data = await getWeatherData(city);
        setWeatherData(data);
        setLoading(false);
    }catch(error) {
      console.log(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  },[]);

  // let date=new Date();
  return (
    <section>
      <div>
        <h1 className='weather'>Weather App</h1>
        <div className="input-button">
          <input 
          className="input-field"
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter your location"/>

          <button 
          type="button" 
          onClick={() => getData()}>Search
          </button>

        </div>
        {loading ? (
          <div>
            <ScaleLoader
              loading= {loading}
              />
          </div>
        ) : (
          <>
          {weatherdata !== null ? (
          <span>
            {<h4 className='weather1' >Live Weather Condition</h4> }
            <div className="name-date">
              <h2><i className="fa fa-street-view"></i>{weatherdata.name} | {weatherdata.sys.country}</h2>
           
              <h3>{new Date().toString()}</h3>
            </div>
            

            <div className="others">
              <img src={`http://openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`} alt="imgicon"/>
              
              <h3>{parseFloat(weatherdata.main.temp - 273.15).toFixed(1)}&deg;C  | {weatherdata.weather[0].main}</h3>
              <h4>Min: {parseFloat(weatherdata.main.temp_min - 273.15).toFixed(1)}&deg;C 
              || Max: {parseFloat(weatherdata.main.temp_max - 273.15).toFixed(1)}&deg;C 
              || Humidity: {weatherdata.main.humidity}%</h4>
            </div>
           
            </span>
        ) : null}
          </>
        ) }       
      </div>
    </section>
  );
}

export default App;