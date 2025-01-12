function updateClock() {
    const now = new Date();
    const timeFormat = document.getElementById('timeFormat').value;
    const time = formatTime(now, timeFormat);
    const date = now.toDateString();
    const endOfYear = new Date(now.getFullYear(), 11, 31);
    const daysLeft = Math.floor((endOfYear - now) / (1000 * 60 * 60 * 24));

    document.getElementById('time').textContent = time;
    document.getElementById('date').textContent = date;
    document.getElementById('daysLeft').textContent = `Days left in the year: ${daysLeft}`;

    updateHistoricalSignificance(now);
    updateBackground();
}

function formatTime(date, format) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (format === "12") {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
    } else {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function updateHistoricalSignificance(date) {
    const historicalEvents = {
        "1-7": "On this day in 1990, the Leaning Tower of Pisa was closed to the public due to safety concerns. It reopened in 2001 after extensive repairs. This teaches us that sometimes, we need to take a step back and make necessary improvements to stand tall again."
        // Add more dates and events here
    };
    const key = `${date.getMonth() + 1}-${date.getDate()}`;
    const event = historicalEvents[key];

    if (event) {
        document.getElementById('historicalSignificance').textContent = event;
    } else {
        document.getElementById('historicalSignificance').textContent = "Make today a great day!";
    }
}

function updateBackground() {
    const holiday = document.getElementById('holiday').value;
    const colors = {
        "world-cancer-day":["#E3B2C8", "#541C6B"],
        "international-womens-day": ["#FFC0CB", "#FF69B4"],
        "world-environment-day": ["#32CD32", "#228B22"],
        "earth-day": ["#00FF00", "#008000"]
    };
    const colorGradient = colors[holiday] || ['#f0f0f0', '#e0e0e0'];
    document.body.style.background = `linear-gradient(45deg, ${colorGradient[0]}, ${colorGradient[1]})`;
}

setInterval(updateClock, 1000);
updateClock();