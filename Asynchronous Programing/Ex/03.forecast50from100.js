function attachEvents() {
    const degree = `&#176`
    const inputFieldRef = document.getElementById(`location`);
    const buttonRef = document.getElementById(`submit`);
    const forecastSectionRef = document.getElementById(`forecast`);
    const currentConditionsRef = document.getElementById('current');
    const upcomingConditionsRef = document.getElementById('upcoming');
    buttonRef.addEventListener('click', getLocation);
    const baseUrl = `http://localhost:3030/jsonstore/forecaster/locations`;
    const todayUrl = `http://localhost:3030/jsonstore/forecaster/today/`;
    const upcommingUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/`;
    async function getLocation() {

        try {
            const info = await fetch(baseUrl);
            const data = await info.json();
            let searched = data.find(obj => obj.name === inputFieldRef.value);
            todayForecast(searched.code);
            upcomingForecast(searched.code);
        } catch (error) {
            console.log(`Error`);
            const divErr = document.createElement('div');
            divErr.textContent = `Error`;
            forecastSectionRef.appendChild(divErr);
            forecastSectionRef.style.display = ``;
        }
    }
    async function todayForecast(code) {
        try {
            const todayInfo = await fetch(todayUrl + code);
            const todayData = await todayInfo.json();
            forecastSectionRef.style.display = `block`;
            const divErr = currentConditionsRef.querySelector('div');
            divErr.textContent = `Current conditions`;
        makeContent(todayData.name, todayData.forecast)
        } catch (error) {
            console.log(`Error`);
            const divErr = document.createElement('div');
            divErr.textContent = `Error`;
            forecastSectionRef.appendChild(divErr);
            forecastSectionRef.style.display = ``;
        }
    }
    async function upcomingForecast(code) {
        try {
            const upcomingInfo = await fetch(upcommingUrl + code);
            const upcomingData = await upcomingInfo.json();
            threeDaysUpcomming(upcomingData.forecast);
            makeContent(todayData.name, todayData.forecast)
        } catch (error) {
            console.log(`Error`);
            const divErr = document.createElement('div');
            divErr.textContent = `Error`;
            forecastSectionRef.appendChild(divErr);
            forecastSectionRef.style.display = ``;
        }
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
}

attachEvents();