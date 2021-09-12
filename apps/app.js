document.addEventListener('DOMContentLoaded', () => {
    let lat, long;
    const weatherbittoken = '4c8d9ab0d8134082857f6ae3cee4ca74';
    const token = '91dc1ea0bf60df00ea4634884603b33aac7478a8';
    const root = document.querySelector(':root');
    const openweathermapkey = '0be1e7e3cfbb30443197baae89a01de7';
    const path = document.querySelectorAll('path');
    const hoverarea = document.querySelector('#hoverarea');
    const countryName = document.querySelector('#countryName');
    const cityName = document.querySelector('#cityName');
    const tempDesc = document.querySelector('#description');
    const temperature = document.querySelector('#temp');
    const iconDiv = document.querySelector('.icon');
    const weathercontainer = document.getElementById('weathercontainer');
    const humidityD = document.getElementById('humidity');
    const pressureD = document.getElementById('pressure');
    const speedD = document.getElementById('speed');
    const errordiv = document.getElementById('errornavigation');
    const aqispan = document.getElementById('aqi');
    const d = document.getElementById('d');
    const p = document.getElementById('p');
    const co = document.getElementById('co');
    const no = document.getElementById('no');
    const nd = document.getElementById('nd');
    const o = document.getElementById('o');
    const sd = document.getElementById('sd');
    const fp = document.getElementById('fp');
    const am = document.getElementById('am');
    const cp = document.getElementById('cp');
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');
    const hovererror = document.getElementById('hovererror');
    const mainDistrictContainer = document.getElementById(
        'main-district-container'
    );
    // google maps in website

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            var api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${openweathermapkey}`;
            fetch(api)
                .then(response => response.json())
                .then(data => {
                    const { name } = data;
                    const { id, icon, description } = data.weather[0];
                    const { feels_like, humidity, pressure } = data.main;
                    const { country } = data.sys;
                    const { deg, speed } = data.wind;
                    const sys = data.sys;
                    console.log(sys);
                    if (country === 'NP') {
                        countryName.textContent = 'Nepal,';
                    } else {
                        countryName.textContent = country;
                    }
                    // Displaying into the UI
                    cityName.textContent = name;
                    const iconmain = document.createElement('img');
                    iconmain.src = `./assets/img/icons/${icon}.png`;
                    iconmain.setAttribute('draggable', 'false');
                    iconmain.setAttribute('alt', "weather icon can't be fetched ");
                    iconDiv.appendChild(iconmain);
                    tempDesc.textContent = description;
                    temperature.textContent = (feels_like - 273).toFixed(1);
                    let sunrisetime = new Date(sys.sunrise * 1000);
                    let sunsettime = new Date(sys.sunset * 1000);
                    sunrise.textContent = sunrisetime.toLocaleTimeString();
                    sunset.textContent = sunsettime.toLocaleTimeString();
                    humidityD.textContent = humidity;
                    pressureD.textContent = pressure;
                    speedD.textContent = speed;
                    console.log(data);
                })
                .catch(error => {
                    console.log(error);
                    errordiv.style.display = 'block';
                });

            fetch(
                    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${openweathermapkey}`
                )
                .then(data => data.json())
                .then(result => {
                    const main = result.list[0].components;
                    const aqi = result.list[0].main.aqi;
                });
        });
    }
    async function hoverdata() {
        await fetch('./nepal-API/api.json')
            .then(data => data.json())
            .then(result => {
                result.forEach(item => {
                    let { districtName, province, acode, headquarter, popu } = item;
                    let { lat, long, area } = item.position;
                    Array.from(path).forEach(item => {
                        item.addEventListener('mouseover', e => {
                            const district = item.id;
                            if (districtName == district) {
                                hoverarea.style.visibility = 'visible';
                                hoverarea.style.top = e.clientY + 'px';
                                hoverarea.style.left = e.clientX + 5 + 'px';
                                // getting the data of air quality
                                fetch(
                                        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${openweathermapkey}`
                                    )
                                    .then(data => data.json())
                                    .then(result => {
                                        const main = result.list[0].components;
                                        const aqi = result.list[0].main.aqi;
                                        if (aqi === 1) {
                                            aqiindex = 'Good';
                                            aqispan.style.color = 'darkgreen';
                                        } else if (aqi === 2) {
                                            aqiindex = 'Fair';
                                            aqispan.style.color = '#FF9933';
                                        } else if (aqi === 3) {
                                            aqiindex = 'Moderate';
                                            aqispan.style.color = 'crimson';
                                        } else if (aqi === 4) {
                                            aqiindex = 'Poor';
                                            aqispan.style.color = 'darkred';
                                        } else {
                                            aqiindex = 'Very Poor';
                                            aqispan.style.color = '#660099';
                                        }
                                        co.textContent = main.co;
                                        no.textContent = main.no;
                                        nd.textContent = main.no2;
                                        o.textContent = main.o3;
                                        sd.textContent = main.so2;
                                        fp.textContent = main.pm2_5;
                                        cp.textContent = main.pm10;
                                        am.textContent = main.nh3;
                                        aqispan.innerHTML = aqiindex;

                                        d.textContent = districtName;
                                        p.textContent = province;
                                        hovererror.textContent = '';
                                    })
                                    .catch(error => {
                                        aqispan.textContent = 'Error loading !';
                                        hovererror.textContent = 'Failed to Query !';
                                    });
                            }
                        });
                    });
                    Array.from(path).forEach(item => {
                        item.addEventListener('mouseout', e => {
                            const district = item.id;
                            hoverarea.style.visibility = 'hidden';
                        });
                    });
                });
            });
    }
    hoverdata();
    async function getjsondata() {
        let provinces = [
            'Province no.1',
            'Province no.2',
            'Bagmati Province',
            'Gandaki Province',
            'Lumbini Province',
            'Karnali Province',
            'Sudurpashchim Province'
        ];

        async function getprovincedata(provinceid, provincejson) {
            let htmldata = '';
            const provinceidd = document.getElementById(provinceid);

            await fetch('./main.json')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    let gotdata = data.nepal[provincejson];
                    console.log(gotdata);
                    gotdata.forEach(district => {
                        htmldata += ` <div class='single-content-box'>
                                                <h3>${district.headquarter}, ${district.districtName}</h3>
                                                <div class='innercontent'>
                                                    <p><abbr title='Area Code'>ACode</abbr> : ${district.acode}</p>
                                                    <p><samp>Total Population : </samp> <abbr title='According to 2011 Census'>${district.popu}</abbr></p>
                                                    <p>
                                                        <details>
                                                            <summary>Geography Infos</summary>
                                                            <p>&CircleDot; Latitude : <span id='lat'> ${district
                                                              .position
                                                              .lat}</span></p>
                                                            <p>&CircleDot; Longitude : <span id='lat'> ${district
                                                              .position
                                                              .long}</span></p>
                                                            <p>&CircleDot; Area : <span id='lat'> ${district
                                                              .position
                                                              .area} km<sup>2</sup></span></p>
                                                        </details>
                                                        <div class='aqidetail'>
                                                            <h5><samp>AQI index :</samp> <span id='dapi'>123</span></h5>
                                                            <div class='inner'>
                                                                <p>Carbon Monoxide : <span id='districtCO' style='font-weight: bold; color: #132c33'>578.30</span>μg/m<sup>3</sup></p>
                                                                <p>Nitrogen Monoxide : <span id='districtNO' style='font-weight: bold; color: #132c33'>78.30</span>μg/m<sup>3</sup></p>
                                                                <p>Nitrogen Dioxide : <span id='districtND' style='font-weight: bold; color: #132c33'>28.30</span>μg/m<sup>3</sup></p>
                                                                <p>Ozone : <span id='districtND' style='font-weight: bold; color: #132c33'>58.30</span>μg/m<sup>3</sup></p>
                                                                <p>Sulpler Dioxide : <span id='districtND' style='font-weight: bold; color: #132c33'>58.30</span>μg/m<sup>3</sup></p>
                                                                <p><abbr title='PM25'>Fine Particles</abbr> : <span id='districtND' style='font-weight: bold; color: #132c33'>58.30</span>μg/m<sup>3</sup></p>
                                                                <p> <abbr title='PM21'>Coarse Particles</abbr> : <span id='districtND' style='font-weight: bold; color: #132c33'>58.30</span>μg/m<sup>3</sup></p>
                                                                <p> Ammonia : <span id='districtND' style='font-weight: bold; color: #132c33'>58.30</span>μg/m<sup>3</sup></p>
                                                            </div>
                                                        </div>
                                                        <div class='weatherdetail'>
                                                            <h4>Weather Detail</h4>
                                                            <div class='calc'>
                                                                <div class='img'>
                                                                    <img draggable='false' src='./assets/img/icons/10d.png' alt=''>
                                                                </div>
                                                                <h4>25<span>&ring;C</span></h4>
                                                            </div>
                                                            <h5>Pressure : <span id='press'>131</span><span id='unit'>hPa</span></h5>
                                                            <h5>Humidity : <span id='humid'>76</span><span id='unit'>%</span></h5>
                                                        </div>
                                                    </p>
                                                </div>
                                            </div>`;
                    });
                    console.log(htmldata);
                });
            console.log(htmldata);
            provinceidd.innerHTML = htmldata;
            return htmldata;
        }

        getprovincedata('province1', 'province1');
        getprovincedata('province2', 'province2');
        getprovincedata('province3', 'province3');
        getprovincedata('province4', 'province4');
        getprovincedata('province5', 'province5');
        getprovincedata('province6', 'province6');
        getprovincedata('province7', 'province7');
    }
    getjsondata();
});