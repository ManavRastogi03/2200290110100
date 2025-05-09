let window = [];

const MAX_SIZE = 10;

function updateWindow(newNumbers) {
const prevState = [...window];

for (let num of newNumbers) {
    if (!window.includes(num)) {
    if (window.length >= MAX_SIZE) {
        window.shift(); // Remove oldest
    }
    window.push(num);
    }
}

return { prevState, currState: [...window] };
}

function getAverage() {
if (window.length === 0) return 0;
const sum = window.reduce((acc, val) => acc + val, 0);
return parseFloat((sum / window.length).toFixed(2));
}

module.exports = { updateWindow, getAverage };