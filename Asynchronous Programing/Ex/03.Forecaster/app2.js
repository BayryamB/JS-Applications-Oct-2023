function attachEvents() {
    const inputFieldRef = document.getElementById(`location`);
    const buttonRef = document.getElementById(`submit`);
    const forecastSectionRef = document.getElementById(`forecast`);
    const currentConditionsRef = document.getElementById('current');
    const upcomingConditionsRef = document.getElementById('upcoming');
    buttonRef.addEventListener('click', getLocation);
    const baseUrl = `http://localhost:3030/jsonstore/forecaster/locations`;
    const todayUrl = `http://localhost:3030/jsonstore/forecaster/today/`;
    const upcomingUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/`;
    const degree = `&#176`
    function getLocation() {
        fetch(baseUrl)
            .then(response => response.json())
            .then(data => {
                let name = inputFieldRef.value;
                let searched = data.find(obj => obj.name === name);
                todayForecast(searched.code);
                upcomingForecast(searched.code);
            })
            .catch(errorHandler);
    }
    function errorHandler() {
        console.error(`Invalid input`);
        const divErr = document.createElement('div');
        const divErrMsg = document.createElement('div');
        divErrMsg.classList.add('forecasts');
        divErr.classList.add('forecasts');
        divErr.textContent = `Error`;
        divErrMsg.textContent = `Invalid input`;
        if(currentConditionsRef.childNodes > 1){
            forecastSectionRef.removeChild(currentConditionsRef);
            forecastSectionRef.removeChild(upcomingConditionsRef);
        }else{
            forecastSectionRef.appendChild(divErr);
            forecastSectionRef.appendChild(divErrMsg);
            forecastSectionRef.style.display = `block`;
        }

    }
    function todayForecast(code) {
        fetch(todayUrl + code)
        .then(response => response.json())
        .then(todayData => {
            forecastSectionRef.style.display = `block`;
            const divErr = currentConditionsRef.querySelector('div');
            divErr.textContent = `Current conditions`;
            makeContent(todayData.name, todayData.forecast)
        })
    }
    function upcomingForecast(code) {
        fetch(upcomingUrl + code)
        .then(response => response.json())
        .then(upcomingData => {
            threeDaysUpcomming(upcomingData.forecast);
        })
    }
    function makeContent(name, todayInfo) {
        let condition = todayInfo.condition;
        let high = todayInfo.high;
        let low = todayInfo.low;
        let symbol = symbolMaker(condition);

        makeDomElement(name, condition, high, low, symbol);
    }
    function makeDomElement(name, condition, high, low, symbol) {
        const mainDiv = document.createElement('div');
        mainDiv.classList.add(`forecasts`);
        mainDiv.innerHTML = `
        <span class="condition symbol">${symbol}</span>
        <span class="condition">
        <span class="forecast-data">${name}</span>
        <span class="forecast-data">${low}${degree}/${high}${degree}</span>
        <span class="forecast-data">${condition}</span>
        </span>`;
        currentConditionsRef.appendChild(mainDiv);
    }
    function symbolMaker(condition) {
        let symbol = ``
        switch (condition) {
            case 'Sunny':
                symbol = `&#x2600`;
                break;
            case 'Rain':
                symbol = `&#x2614`;
                break;
            case "Overcast":
                symbol = `&#x2601`;
                break;
            case 'Partly sunny':
                symbol = `&#x26C5`;
                break;

        }
        return symbol;
    }
    function threeDaysUpcomming(dataArray) {
        const upcomingDiv = document.createElement('div');
        upcomingDiv.classList.add(`forecasts-info`);
        for (const day of dataArray) {
            let condition = day.condition;
            let high = day.high;
            let low = day.low;
            let symbol = symbolMaker(condition);
            let upcomingSpan = document.createElement('span');
            upcomingSpan.classList.add(`upcoming`);
            upcomingSpan.innerHTML = `<span class="condition symbol">${symbol}</span>
            <span class="forecast-data">${low}${degree}/${high}${degree}</span>
            <span class="forecast-data">${condition}</span>`
            upcomingDiv.appendChild(upcomingSpan);
        }
        upcomingConditionsRef.appendChild(upcomingDiv);
    }
}
attachEvents()