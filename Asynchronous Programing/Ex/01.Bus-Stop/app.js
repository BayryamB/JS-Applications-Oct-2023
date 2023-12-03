async function getInfo() {
    const stopID = document.getElementById('stopId');
    const resultUl = document.getElementById('buses');
    const divStopName = document.getElementById('stopName');
    const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopID.value}`);
    if( response.status !== 200){
        console.log(response.statusCode);
        divStopName.textContent = 'Error';
    }
    const data = await response.json();
    divStopName.textContent = ``;
    stopID.value = ``;
    resultUl.textContent = ``;
    divStopName.textContent = data.name;
    let busInfo = Object.entries(data.buses);
    for (const element of busInfo) {
        let busId = element[0];
        let time = element[1];
        let content = `Bus ${busId} arrives in ${time} minutes`;
        let li = document.createElement('li');
        li.textContent = content;
        resultUl.appendChild(li);
    }
}