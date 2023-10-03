const users = require('../../db/db.json')

export async function handleMyCabinetCommand(msg) {
    const chatId = msg.chat.id;
    let user = users.find(x => x.user_id === msg.chat.id);
  
    if (user) {
      const message = `Ваш кабинет\n--------------------------\nДней в боте: ${user.daysInBot}\nМой ID: ${user.user_id}\nБаланс:\nОсновной: ${user.balance}\nВыведено: ${user.withDrawBalance}`;
      await bot.sendMessage(chatId, message);
    } else {
      await bot.sendMessage(chatId, "Пользователь не найден");
    }
  }
  
