const TelegramBot = require('node-telegram-bot-api');

const token = '6851010845:AAH23jdrIg8AORNgqAQzIlw6FKjPnumUSG8';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; 

  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Привет, октагон!');
});