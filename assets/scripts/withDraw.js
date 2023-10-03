async function withdrawCommand(msg) {
    const chatId = msg.chat.id;
    let user = users.find(x => x.user_id === msg.chat.id);
  
    if (user) {
      await bot.sendMessage(chatId, `Ваш баланс: ${user.balance}\nМинимальная суммма для вывода: 350`, withDrawKeyboard);
    } else {
      await bot.sendMessage(chatId, "Пользователь не найден");
  
}
}

module.exports = {
    withdrawCommand: withdrawCommand
}