function attachEvents() {
    const locationInput = document.getElementById("location");
    const forecastDiv = document.getElementById("forecast");
    const currentDiv = document.getElementById("current");
    const upcomingDiv = document.getElementById("upcoming");
    const getBtn = document.getElementById("submit");
    const forecastURL = `http://localhost:3030/jsonstore/forecaster/today/`
    const upcomingURL = `http://localhost:3030/jsonstore/forecaster/upcoming/`
    getBtn.addEventListener("click", getData)

    async function getData() {
        currentDiv.innerHTML = '';
        upcomingDiv.innerHTML = '';
        try {
            const resp = await fetch(`http://localhost:3030/jsonstore/forecaster/locations`)
            const locations = await resp.json();
            if (resp.status !== 200) {
                forecastDiv.style.display = 'block';
                forecastDiv.textContent = "Error";
            } else {
                const divLabel = document.createElement("div");
                divLabel.textContent = `Current Conditions`
                divLabel.classList.add("label")
                const divForecasts = document.createElement("div");
                divForecasts.classList.add("forecasts")
                currentDiv.append(divLabel, divForecasts);
                let spanOut = document.createElement("span");
                spanOut.classList.add("condition");
                const divLabel2 = document.createElement("div");
                divLabel2.textContent = `Three-day forecast`
                divLabel2.classList.add("label")
                const divForecastInfo = document.createElement("div");
                divForecastInfo.classList.add("forecast-info")
                upcomingDiv.append(divLabel2, divForecastInfo);
                forecastDiv.style.display = 'inline'
                const findLocation = locations.filter(obj => obj.name === locationInput.value);
                const cityCode = findLocation[0].code;
                const URL = `${forecastURL}${cityCode}`
                const resp = await fetch(URL, { method: "GET" })
                const curConditions = await resp.json();
                const forcastObj = curConditions.forecast;
                const cityName = curConditions.name
                const span1 = document.createElement("span");
                let symbol = findSymbol(forcastObj.condition);
                span1.classList.add("condition", "symbol");
                span1.innerHTML = symbol;
                const span2 = document.createElement("span");
                span2.classList.add("forecast-data");
                span2.innerHTML = cityName;
                const span3 = document.createElement("span");
                span3.classList.add("forecast-data");
                let value = `${forcastObj.low}&#176/${forcastObj.high}&#176`
                span3.innerHTML = value;
                const span4 = document.createElement("span");
                span4.classList.add("forecast-data");
                span4.innerHTML = forcastObj.condition;
                divForecasts.append(span1,spanOut);
                spanOut.append(span2,span3,span4)
                const upcURL = `${upcomingURL}${cityCode}`
                const upcResp = await fetch(upcURL, { method: "GET" })
                const upConditions = await upcResp.json();
                const upcArr = upConditions.forecast;
                const city = upConditions.name;
                upcArr.forEach(element => {
                    let spanOutUpc = document.createElement("span");
                    spanOutUpc.classList.add("upcoming");
                    divForecastInfo.appendChild(spanOutUpc)
                    const span1 = document.createElement("span");
                    let symbol = findSymbol(element.condition);
                    span1.classList.add("symbol");
                    span1.innerHTML = symbol;
                    const span2 = document.createElement("span");
                    span2.classList.add("forecast-data");
                    let value = `${element.low}&#176/${element.high}&#176`
                    span2.innerHTML = value;
                    const span3 = document.createElement("span");
                    span3.classList.add("forecast-data");
                    span3.innerHTML = element.condition;
                    spanOutUpc.append(span1, span2, span3);
                });

            }
        }
        catch {
            forecastDiv.style.display = "block";
            forecastDiv.textContent = "Fetch Error";
        }

        function findSymbol(condition) {
            switch (condition) {
                case "Sunny":
                    return `&#x2600`;
                case "Partly sunny":
                    return `&#x26C5`;
                case "Overcast":
                    return `&#x2601`;
                case "Rain":
                    return `&#x2614`;
                default:
                    break;
            }
        }
    }
}

attachEvents();