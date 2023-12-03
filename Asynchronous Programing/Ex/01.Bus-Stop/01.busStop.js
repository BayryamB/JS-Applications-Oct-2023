function getInfo() {
    const stopID = document.getElementById('stopId');
    const resultUl = document.getElementById('buses');
    const divStopName = document.getElementById('stopName');
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopID.value}`;
    fetch(url, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
        let stopName = data.name;
        let buses = data.buses;
        divStopName.textContent = stopName;
        let busInfo = Object.entries(buses)
        busInfo.forEach(bus => {
            let busId = bus[0];
            let time = bus[1];
            let content = `Bus ${busId} arrives in ${time} minutes`;
            let li = document.createElement('li');
            li.textContent = content;
            resultUl.appendChild(li);

        })
    })
    .catch(err => {
        divStopName.textContent = 'Error';
    })
    
}