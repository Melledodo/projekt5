//Lillian
let hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    navMenu.classList.toggle("menu-open"); 
});
let menuitemArray = document.querySelectorAll(".nav-link");
menuitemArray.forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    navMenu.classList.remove("menu-open");
}));
//Lillian slut

//signe
console.log("loader temperatur");
    const temperatureDisplay = document.getElementById("temperature");

    const temperatureValues = [-1, 0, 4, 8, 10, 12, 15, 20, 22, 25,];
    let currentTemperatureIndex = temperatureValues.indexOf(22);

    function updateTemperature() {
        const currentTemperature = temperatureValues[currentTemperatureIndex];
        temperatureDisplay.textContent = `${currentTemperature} °C`;
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
//+1 % øger dette udtryk indekset med 1 og sikrer, at det forbliver inden for grænserne af arrayet temperatureValues
    function temperatureLoop() {
        updateTemperature();
        currentTemperatureIndex = (currentTemperatureIndex + 1) % temperatureValues.length;
        setTimeout(temperatureLoop, 4000);
    }

    // skifter temperatur med 4 sekunder 
    temperatureLoop();

    let temperatureArray = ["-1", "0", "4", "8", "10", "12", "15", "20", "22", "25"];
    let arrayLength = temperatureArray.length;
    
    // printer temperatur med forloop
    for (let i = 0; i < arrayLength; i++) {
        console.log(`${temperatureArray[i]} °C`);
    }
//signe slut


// Michelle
const ctx = document.getElementById('grafChart').getContext('2d');
const grafChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['10:15', '10:30', '10:45', '11:00', '11:15', '11:30'],
        datasets: [{
            label: 'Temperatur',
            data: [12, 19, 13, 15, 21, 10],
            backgroundColor: 'rgba(3, 133, 91, 0.2)',
            borderColor: 'rgba(3, 133, 91, 1)',
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
const fejlMeddelelse = document.getElementById('fejlMeddelelse');

grafTracker();

målinger.addEventListener('change', grafTracker);

function grafTracker() {
    fejlMeddelelse.textContent = '';

    // Kontroller om der er valgt en option
    if (målinger.value !== 'default') {
        const label = målinger.options[målinger.selectedIndex].text;
        grafChart.data.datasets[0].label = label;

        // Kontroller om værdien ikke er tom
        if (målinger.value.trim() !== '') {
            grafChart.data.datasets[0].data = målinger.value.split(',');

            // Konverter værdierne til tal
            for (let i = 0; i < grafChart.data.datasets[0].data.length; i++) {
                grafChart.data.datasets[0].data[i] = parseFloat(grafChart.data.datasets[0].data[i]);
            }

            grafChart.update();
        } else {
            // Vis fejlmeddelelse, hvis værdien er tom
            fejlMeddelelse.textContent = 'Vælg venligst mindst én måling.';
        }
    } else {
        // Vis fejlmeddelelse, hvis der ikke er valgt nogen option
        fejlMeddelelse.textContent = 'Vælg venligst en gyldig måling.';
    }
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