const {bot} = require('../../../index')
const users = require('../../db/db.json');
const { calculateDaysBetweenDates } = require('../daysInBot');

async function handleStartCommand(msg) {
    const chatId = msg.chat.id;
    let user = users.find(x => x.user_id === msg.chat.id);

    if (!user) {
      users.push({
        daysInBot: calculateDaysBetweenDates(),
        username: msg.from.username,
        user_id: msg.chat.id,
        balance: 0,
        withDrawBalance: 0,
      });
      await bot.sendMessage(chatId, "Пользователь добавлен", startKeyboard);
      fs.writeFileSync("./assets/db/db.json", JSON.stringify(users, null, "\t"));
    } else {
      // Обновление информации для существующего пользователя
      user.daysInBot = calculateDaysBetweenDates();
      await bot.sendMessage(chatId, "Пользователь уже существует", startKeyboard);
    }
  }

module.exports = {
    handleStartCommand
}