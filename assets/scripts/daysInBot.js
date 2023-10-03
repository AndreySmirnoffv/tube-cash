const users = require('../../assets/db/db.json')
const fs = require('fs')

function calculateDaysBetweenDates() {
    const startDate = Date.now(); // Замените дату на нужную вам
    const endDate = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const start = new Date(startDate); 
    const end = new Date(endDate);    

    const days = Math.round(Math.abs((end - start) / oneDay));

    return days;
}

const daysBetweenDates = calculateDaysBetweenDates();
function updateDaysInBot() {
    const daysInBot = calculateDaysBetweenDates();

    for (const user of users) {
        user.daysInBot = daysInBot;
    }
    fs.writeFileSync('/Users/nikitamoussa/Documents/tubeCash/assets/db/db.json', JSON.stringify(users, null, '\t'));
}

const updateInterval = 24 * 60 * 60 * 1000;
setInterval(updateDaysInBot, updateInterval);


module.exports = {
    calculateDaysBetweenDates: calculateDaysBetweenDates,
    updateDaysInBot: updateDaysInBot,
}
