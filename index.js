
require("dotenv").config({ path: "./assets/modules/.env" });
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(
  process.env.devStatus ? process.env.TOKEN_TEST : process.env.DEFAULT_TOKEN,
  { polling: true }
);
const fs = require("fs");
const { chatStates} = require("./assets/keyboard/keyboard");
const {withdrawCommand} = require('./assets/scripts/withDraw')
const {handleStartCommand} = require('./assets/scripts/commands/startCommand')
const {handleEarnCommand} = require('./assets/scripts/commands/hadleEarnCommand')
const {handleMyCabinetCommand} = require("./assets/scripts/commands/handleMyCabinetCommans")

const commands = JSON.parse(fs.readFileSync("./assets/db/commands/commands.json"));

bot.setMyCommands(commands);

bot.on("message", async (msg) => {
  const chatId = msg.chat.id
  if (msg.text === "/start") handleStartCommand(msg);
    else if (msg.text === "ЗАРАБОТАТЬ") handleEarnCommand(msg);
    else if (msg.text === "МОЙ КАБИНЕТ") handleMyCabinetCommand(msg);
    else if (msg.text === "ВЫВОД") withdrawCommand(msg);
    else{
      await bot.sendMessage(msg.chat.id, "такой команды не существует")
    }
  
});

bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (data === "prev" && chatStates[chatId].currentPage > 1) {
    chatStates[chatId].currentPage--; 
  } else if (data === "next") {
    chatStates[chatId].currentPage++;
  }
});

bot.on("polling_error", console.log);
