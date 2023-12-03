function solve() {
    const baseURI = `http://localhost:3030/jsonstore/bus/schedule/`;
    const divRef = document.getElementById('info');
    const arriveBtn = document.getElementById('arrive');
    const departBtn = document.getElementById('depart');
    const spanRef = divRef.querySelector('span');
    let nextStop = `depot`;
    let currentStop = ``;
    async function depart() {
        const response = await fetch(baseURI + nextStop)
        if (response.status !== 200) {
            spanRef.textContent = `Error`;
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
        const data = await response.json();

        currentStop = data.name;
        spanRef.textContent = `Next stop ${currentStop}`;
        nextStop = data.next;

        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {
        currentStop = `Arriving at ${currentStop}`;
        spanRef.textContent = currentStop;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();