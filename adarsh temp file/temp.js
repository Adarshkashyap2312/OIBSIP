var mascotSVGs = {
  cold: `<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="16" fill="#e0f7fa" /><g stroke="#00bcd4" stroke-width="2.5"><line x1="40" y1="16" x2="40" y2="64"/><line x1="16" y1="40" x2="64" y2="40"/><line x1="24" y1="24" x2="56" y2="56"/><line x1="56" y1="24" x2="24" y2="56"/></g></svg>`,
  moderate: `<svg viewBox="0 0 80 80"><rect x="34" y="18" width="12" height="32" rx="6" fill="#b0c4de"/><rect x="37" y="21" width="6" height="26" rx="3" fill="#fff"/><circle cx="40" cy="58" r="12" fill="#ff6f61" stroke="#b0c4de" stroke-width="2"/><circle cx="40" cy="58" r="5" fill="#fff"/></svg>`,
  hot: `<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="18" fill="#ffd700" /><g stroke="#ffd700" stroke-width="3"><line x1="40" y1="8" x2="40" y2="24"/><line x1="40" y1="56" x2="40" y2="72"/><line x1="8" y1="40" x2="24" y2="40"/><line x1="56" y1="40" x2="72" y2="40"/><line x1="18" y1="18" x2="28" y2="28"/><line x1="62" y1="18" x2="52" y2="28"/><line x1="18" y1="62" x2="28" y2="52"/><line x1="62" y1="62" x2="52" y2="52"/></g></svg>`
};

function convertTemperature(value, unit) {
  var celsius, fahrenheit, kelvin;
  if (unit === "C") {
    celsius = value;
    fahrenheit = (value * 9/5) + 32;
    kelvin = value + 273.15;
  } else if (unit === "F") {
    celsius = (value - 32) * 5/9;
    fahrenheit = value;
    kelvin = celsius + 273.15;
  } else if (unit === "K") {
    celsius = value - 273.15;
    kelvin = value;
    fahrenheit = (celsius * 9/5) + 32;
  }
  return {
    c: celsius.toFixed(2),
    f: fahrenheit.toFixed(2),
    k: kelvin.toFixed(2)
  };
}

function updateMood(celsius) {
  var mascot = document.getElementById('mascot');
  document.body.classList.remove('cold', 'moderate', 'hot');
  mascot.classList.remove('cold', 'moderate', 'hot');
  if (celsius <= 0) {
    document.body.classList.add('cold');
    mascot.classList.add('cold');
    mascot.innerHTML = mascotSVGs.cold;
  } else if (celsius > 0 && celsius < 30) {
    document.body.classList.add('moderate');
    mascot.classList.add('moderate');
    mascot.innerHTML = mascotSVGs.moderate;
  } else {
    document.body.classList.add('hot');
    mascot.classList.add('hot');
    mascot.innerHTML = mascotSVGs.hot;
  }
}

function updateAll(fromInput) {
  var tempInput = document.getElementById('tempInput');
  var tempRange = document.getElementById('tempRange');
  var unitSelect = document.getElementById('unitSelect');
  var result = document.getElementById('result');

  var val = parseFloat(fromInput === 'range' ? tempRange.value : tempInput.value);
  if (isNaN(val)) {
    result.textContent = "Please enter a valid number.";
    return;
  }
  tempInput.value = val;
  tempRange.value = val;
  var unit = unitSelect.value;
  var conv = convertTemperature(val, unit);
  updateMood(parseFloat(conv.c));
  var output = '';
  if (unit !== "C") output += conv.c + ' °C  ';
  if (unit !== "F") output += conv.f + ' °F  ';
  if (unit !== "K") output += conv.k + ' K';
  result.textContent = output.trim();
}

var tempInput = document.getElementById('tempInput');
var tempRange = document.getElementById('tempRange');
var unitSelect = document.getElementById('unitSelect');
tempInput.addEventListener('input', function() { updateAll('input'); });
tempRange.addEventListener('input', function() { updateAll('range'); });
unitSelect.addEventListener('change', function() { updateAll('input'); });

var themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', function() {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

updateAll('input');