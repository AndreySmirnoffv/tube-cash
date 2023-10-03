export async function handleMyCabinetCommand(msg) {
    const chatId = msg.chat.id;
    let user = users.find(x => x.user_id === msg.chat.id);
  
    if (user) {
      await bot.sendMessage(chatId, `Ваш кабинет\n--------------------------\nДней в боте: ${user.daysInBot}\nМой ID: ${user.user_id}\nБаланс:\nОсновной: ${user.balance}\nВыведено: ${user.withDrawBalance}`);
    } else {
      await bot.sendMessage(chatId, "Пользователь не найден");
    }
  }
  