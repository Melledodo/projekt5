//signe
console.log("loader temperatur");
document.addEventListener("DOMContentLoaded", function () {
    const temperatureDisplay = document.getElementById("temperature");

    const temperatureValues = [-1, 0, 4, 8, 10, 12, 15, 20, 22, 25,];
    let currentTemperatureIndex = temperatureValues.indexOf(22);

    function updateTemperature() {
        const currentTemperature = temperatureValues[currentTemperatureIndex];
        temperatureDisplay.textContent = `${currentTemperature} °`;
        updateColor(currentTemperature);
    }

    function updateColor(temperature) {
        const color = getColorForTemperature(temperature);
        temperatureDisplay.style.backgroundColor = color;
    }

    function getColorForTemperature(temperature) {
        if (temperature >= -1 && temperature <= 12) {
            return "#23B5D3";
        } else if (temperature >= 15 && temperature <= 20) {
            return "#FABC3C";
        } else {
            return "#E85F5C";
        }
    }

    function temperatureLoop() {
        updateTemperature();
        currentTemperatureIndex = (currentTemperatureIndex + 1) % temperatureValues.length;
        setTimeout(temperatureLoop, 4000);
    }

    // Start loop
    temperatureLoop();
});
//signe slut
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Temperatur',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const målinger = document.getElementById('målinger');
målinger.addEventListener('change', grafTracker);
function grafTracker(){
    const label = målinger.options[målinger.selectedIndex].text;
    
    myChart.data.datasets[0].data = målinger.value.split(',');

    myChart.update();
}