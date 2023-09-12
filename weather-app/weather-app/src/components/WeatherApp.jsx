import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import searchicon from '../img/searchicon.png';

export default function WeatherApp() {
    const API_KEY = "54e4b1f44f687fe1ecbd966c8555be50";

    const [backgroundImage, setBackgroundImage] = useState('https://wallpapercave.com/wp/wp3250814.jpg');
    const [weatherIcon, setWeatherIcon] = useState('https://i.imgur.com/uojs8kC.png');
    const [day, setDay] = useState('Poniedziałek');

    const inputRef = useRef();
    const locationRef = useRef();
    const temperatureRef = useRef();
    const humidityRef = useRef();
    const windRef = useRef();
    const weatherRef = useRef();
    const pressureRef = useRef();

    const formatDate = (date) => {
        const Godzina = date.getHours().toString().padStart(2, '0');
        const Minuta = date.getMinutes().toString().padStart(2, '0');
        const Dzien = date.getDay();

        const daysOfWeek = [
            "Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"
        ];

        return `${Godzina}:${Minuta} - ${daysOfWeek[Dzien]}, ${date.getMonth() + 1} ${date.getFullYear().toString().slice(-2)}`;
    };

    useEffect(() => {
        const date = new Date();
        setDay(formatDate(date));
    }, []);

    const handleSearchLocation = async () => {
        const inputValue = inputRef.current.value;
        if (!inputValue) {
            alert('Wprowadź dane');
            return;
        }

        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&lang=pl&appid=${API_KEY}`;

        try {
            const res = await fetch(URL);

            if (!res.ok) {
                throw new Error('Nie znaleziono miasta');
            }

            const data = await res.json();

            const location = data.name;
            const temperature = Math.round(data.main.temp);
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const weather = data.weather[0].main;
            const pressure = data.main.pressure;

            locationRef.current.textContent = location;
            temperatureRef.current.textContent = `${temperature}°`;
            humidityRef.current.textContent = `${humidity}%`;
            windRef.current.textContent = `${windSpeed}km/h`;
            pressureRef.current.textContent = `${pressure}`;

            const weatherImages = {
                Fog: {
                    background: 'https://i.imgur.com/4AoL0mD.jpg',
                    icon: 'https://i.imgur.com/vgpgiEv.png',
                    description: 'Pochmurno',
                },
                Mist: {
                    background: 'https://i.imgur.com/CcHrfDL.jpg',
                    icon: 'https://i.imgur.com/yKPBKIe.png',
                    description: 'Mgła',
                },
                Clear: {
                    background: 'https://i.imgur.com/5bBbwwP.jpg',
                    icon: 'https://i.imgur.com/DvvLpOX.png',
                    description: 'Czyste niebo',
                },
                Clouds: {
                    background: 'https://wallpapercave.com/wp/wp3250814.jpg',
                    icon: 'https://i.imgur.com/fOa1HNj.png',
                    description: 'Widoczne chmury',
                },
                Rain: {
                    background: 'https://cutewallpaper.org/21/background-rain/Rain-Background-Beautiful-Rain-Background-25017.jpeg',
                    icon: 'https://i.imgur.com/uojs8kC.png',
                    description: 'Deszcz',
                },
            };

            setBackgroundImage(weatherImages[weather]?.background || backgroundImage);
            setWeatherIcon(weatherImages[weather]?.icon || weatherIcon);
            weatherRef.current.textContent = weatherImages[weather]?.description || '';
        } catch (error) {
            alert('Wystąpił błąd: ' + error.message);
        }
    };

    return (
        <main style={{ backgroundImage: `url(${backgroundImage})` }} className='main'>
            <div className="wrapper">
                <div className="mainview">
                    <div className="data-wrapper">
                        <span ref={temperatureRef} className="temperature">17</span>
                        <div className="location-wrapper">
                            <span ref={locationRef} className="location">Londyn</span>
                            <p className="date">{day}</p>
                        </div>
                        <img width={'65px'} src={weatherIcon} alt="weather-condition" className="weather-condition" />
                    </div>
                </div>
                <div className="rightbar">
                    <div className="search-container">
                        <div className="input-wrapper">
                            <input ref={inputRef} type="text" className="type-location" placeholder='Wyszukaj lokalizację' />
                            <img onClick={handleSearchLocation} height={'30px'} src={searchicon} alt="" />
                        </div>
                        <div className="example-locations-wrapper">
                            <span>Wyszukaj wybrane miasto przykład:</span>
                            <span>Warszawa</span>
                            <span>Mediolan</span>
                            <span>Paryż</span>
                        </div>
                    </div>
                    <div className="details-container">
                        <h1>Weather Details</h1>
                        <div className="details-wrapper">
                            <div className="detail">
                                <span>Zachmurzenie</span>
                                <span ref={weatherRef} style={{ color: 'white' }}>Lekkie</span>
                            </div>
                            <div className="detail">
                                <span>Wilgotność</span>
                                <span ref={humidityRef} style={{ color: 'white' }}>52%</span>
                            </div>
                            <div className="detail">
                                <span>Wiatr</span>
                                <span ref={windRef} style={{ color: 'white' }}>8km/h</span>
                            </div>
                            <div className="detail">
                                <span>Ciśnienie</span>
                                <span ref={pressureRef} style={{ color: 'white' }}>1014</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
