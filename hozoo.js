const { Telegraf } = require('telegraf');
const axios = require('axios');
const chalk = require('chalk');

// Initialize bot with your token
const bot = new Telegraf('YOUR_TELEGRAM_BOT_TOKEN');

// Color functions
const color = (str, color) => {
  if (color.toLowerCase() === "green") {
    return `${chalk.white}[${chalk.green(str)}${chalk.white}]${chalk.green}`;
  } else if (color.toLowerCase() === "red") {
    return `${chalk.white}[${chalk.red(str)}${chalk.white}]${chalk.red}`;
  }
  return str;
};

// ASCII Art
const asciiArt = `
▄▄▄▄▄▄▪  ▄ •▄ ▄▄▄▄▄      ▄ •▄     ▄▄▄▄·       ▄▄▄▄▄▄▄▄▄▄▄▄▄ .▄▄▄  
  ██  ██ █▌▄▌▪•██  ▪     █▌▄▌▪    ▐█ ▀█▪▪     •██  •██  ▀▄.▀·▀▄ █·
  ▐█.▪▐█·▐▀▀▄· ▐█.▪ ▄█▀▄ ▐▀▀▄·    ▐█▀▀█▄ ▄█▀▄  ▐█.▪ ▐█.▪▐▀▀▪▄▐▀▀▄ 
  ▐█▌·▐█▌▐█.█▌ ▐█▌·▐█▌.▐▌▐█.█▌    ██▄▪▐█▐█▌.▐▌ ▐█▌· ▐█▌·▐█▄▄▌▐█•█▌
  ▀▀▀ ▀▀▀·▀  ▀ ▀▀▀  ▀█▄▀▪·▀  ▀    ·▀▀▀▀  ▀█▄▀▪ ▀▀▀  ▀▀▀  ▀▀▀ .▀  ▀
`.replace(/▪/g, chalk.green('▪') + chalk.magenta)
 .replace(/•/g, chalk.green('•') + chalk.magenta)
 .replace(/·/g, chalk.green('·') + chalk.magenta)
 .replace(/./g, chalk.green('.') + chalk.magenta);

// Menu functions
const showMainMenu = (ctx) => {
  const menu = `
╔═══════════════════════════════╗
║                               ║
║          ${color("1", "green")} ${chalk.magenta("Start")}${chalk.white}            ║
║          ${color("2", "green")} ${chalk.magenta("Info")}${chalk.white}             ║
║          ${color("3", "green")} ${chalk.magenta("Options")}${chalk.white}          ║
║          ${color("4", "green")} ${chalk.magenta("Clear")}${chalk.white}            ║
║          ${color("5", "green")} ${chalk.magenta("Exit")}${chalk.white}             ║
║                               ║
╚═══════════════════════════════╝
`;

  ctx.replyWithMarkdown(`\`\`\`${asciiArt}\`\`\``);
  ctx.replyWithMarkdown(`\`\`\`${menu}\`\`\``);
};

const showBotOptions = (ctx) => {
  const options = `
╔═══════════════════════════════╗
║                               ║
║          ${color("1", "green")} ${chalk.magenta("Follows")}${chalk.white}          ║
║          ${color("2", "green")} ${chalk.magenta("Hearts")}${chalk.white}           ║
║          ${color("3", "green")} ${chalk.magenta("Views")}${chalk.white}            ║
║          ${color("4", "green")} ${chalk.magenta("Shares")}${chalk.white}           ║
║          ${color("5", "green")} ${chalk.magenta("All")}${chalk.white}              ║
║                               ║
╚═══════════════════════════════╝
`;

  ctx.replyWithMarkdown(`\`\`\`${options}\`\`\``);
};

const showInfo = (ctx) => {
  const info = `
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                   ║
║          ${color(">", "green")} About: ${chalk.magenta("This is a TikTok Bot Telegram Interface.")}${chalk.white}                     ║
║          ${color(">", "green")} Updates: ${chalk.magenta("Error Fix & Adjustment")}${chalk.white}                          ║
║          ${color(">", "green")} Made By: ${chalk.magenta("618_Koda#0420")}${chalk.white}                                                ║
║          ${color(">", "green")} Github: ${chalk.magenta("https://github.com/618_Koda")}${chalk.white}                             ║
║                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
`;

  ctx.replyWithMarkdown(`\`\`\`${info}\`\`\``);
};

// Bot commands
bot.start((ctx) => {
  showMainMenu(ctx);
});

bot.command('menu', (ctx) => {
  showMainMenu(ctx);
});

// Message handling
bot.on('text', (ctx) => {
  const text = ctx.message.text;
  
  if (text === '1') {
    ctx.reply("Please enter the TikTok video URL:");
    // You would set up a state here to wait for the URL input
  } else if (text === '2') {
    showInfo(ctx);
  } else if (text === '3') {
    showBotOptions(ctx);
  } else if (text === '4') {
    ctx.reply("Chat cleared!");
    showMainMenu(ctx);
  } else if (text === '5') {
    ctx.reply("Exiting...");
    // Add any cleanup logic here
  } else if (text.match(/https?:\/\/(www\.)?tiktok\.com\/.+/)) {
    // This is where you'd handle the TikTok URL
    ctx.reply("URL received! Please choose a botting option:");
    showBotOptions(ctx);
    // Again, you'd set up a state to wait for the option selection
  } else if (['1', '2', '3', '4', '5'].includes(text) && /* check if in option selection state */) {
    // Handle the botting option selection
    const option = parseInt(text);
    ctx.reply(`Starting bot with option ${option}...`);
    // Start your botting process here
  } else {
    ctx.reply("Invalid option. Please select from the menu.");
    showMainMenu(ctx);
  }
});

// Error handling
bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}:`, err);
  ctx.reply("An error occurred. Please try again.");
});

// Start the bot
bot.launch()
  .then(() => console.log("Bot started successfully!"))
  .catch(err => console.error("Error starting bot:", err));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
