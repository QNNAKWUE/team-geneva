import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production'? 'https://api.openweathermap.org/data/2.5/weather?' : 'http://api.openweathermap.org/data/2.5/weather?';
const apiKey = '9d78048c8356da6acebe10628bf27d19';

export const getWeatherData = async (cityname) => {
    try{
        const {data} = await axios.get(baseUrl + `q=${cityname}&appid=${apiKey}`);
        return data;
    }catch(error) {
        throw error;
    }
}