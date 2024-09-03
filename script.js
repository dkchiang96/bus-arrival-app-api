const busStopIdInput = document.getElementById('busStopId');
const arrivalInfoOutput = document.getElementById('arrivalInfo');

async function fetchBusArrival(busStopId) {
  const response = await fetch(
    `https://sg-bus-arrivals-sigma-schoolsc1.replit.app/?id=${busStopId}`
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Error fetching bus arrival data.');
  }
}

function formatArrivalData(arrivalData) {
  const buses = arrivalData.services;
  const formattedData = [];
  for (const bus of buses) {
    let arrivalTimeString;
    if (bus.next_bus_mins < 0) {
      arrivalTimeString = 'Arriving';
    } else {
      arrivalTimeString = `${bus.next_bus_mins} min(s)`;
    }
    formattedData.push(`
      <div>
        <strong>Bus ${bus.bus_no}</strong>: ${arrivalTimeString}
      </div>
    `);
  }
  formattedData.push(`
  <div>
    ${buses.length} buses
  </div>
`);
  return formattedData.join('');
}

function displayBusArrival(busStopId) {
  arrivalInfoOutput.innerHTML = 'Loading...';
  fetchBusArrival(busStopId)
    .then((arrivalData) => {
      const formattedArrivalData = formatArrivalData(arrivalData);
      arrivalInfoOutput.innerHTML = formattedArrivalData;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  setInterval(displayBusArrival, 10000);
}

function getBusTiming() {
  const busStopId = busStopIdInput.value;
  displayBusArrival(busStopId);
  setInterval(displayBusArrival, 10000);
}
