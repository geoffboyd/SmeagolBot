const Telegraf = require('telegraf').Telegraf;
const { token } = require('masterTG.json')
const bot = new Telegraf('2012369606:AAEplvadCqKbEN34Fs-7lo9dyZBl8WkqAuA');
const { exec } = require('child_process');

bot.command('restart', ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, action="typing");
    setTimeout(function(){
		bot.telegram.sendMessage(ctx.chat.id, 'Restarting SmeagolBot...');  
    }, 1500);
	exec('pm2 restart telegram-smeagol', (error, stdout, stderr) => {
		if (error) {
			console.log(`Error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`StdErr: ${stderr}`);
			return;
		}
		console.log(`StdOut: ${stdout}`);
	})
})

bot.command('stop', ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, action="typing");
    setTimeout(function(){
		bot.telegram.sendMessage(ctx.chat.id, 'Stopping SmeagolBot...');  
    }, 1500);
	exec('pm2 stop telegram-smeagol', (error, stdout, stderr) => {
		if (error) {
			console.log(`Error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`StdErr: ${stderr}`);
			return;
		}
		console.log(`StdOut: ${stdout}`);
	})
})

bot.command('start', ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, action="typing");
    setTimeout(function(){
		bot.telegram.sendMessage(ctx.chat.id, 'Starting SmeagolBot...');  
    }, 1500);
	exec('pm2 start telegram-smeagol', (error, stdout, stderr) => {
		if (error) {
			console.log(`Error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`StdErr: ${stderr}`);
			return;
		}
		console.log(`StdOut: ${stdout}`);
	})
})

bot.launch();