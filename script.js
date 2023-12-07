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
        labels: ['10:15', '10:30', '10:45', '11:00', '11:15', '11:30'],
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
    myChart.data.datasets[0].label = label;
    myChart.data.datasets[0].data = målinger.value.split(',');

    myChart.update();
}

// Sarah
const currentDate = document.querySelector(".datonu"),
    daysTag = document.querySelector(".dage"),
    prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["Januar", "Febuar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"];

const renderCalendar = () => {
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayOfMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = 1; i <= 6 - (lastDateofMonth + firstDayOfMonth) % 7; i++) {
        liTag += `<li class="inactive">${i}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
};

renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }

        renderCalendar();
    });
});