const Telegraf = require('telegraf').Telegraf;
const { token } = require('../config/telegram.json');
const bot = new Telegraf(token);
const Filter = require('bad-words');
var filter = new Filter();

// These items add database functionality and the ability to get website screenshots
/*
const SQLite = require("better-sqlite3");
const db = new SQLite('../userinputs.sqlite');
const puppeteer = require('puppeteer-core');
*/

// Markov generator
var MarkovChain = require('markovchain'), 
	fs = require('fs'), 
	wordSalad = new MarkovChain(fs.readFileSync('./telegramHistory.txt', 'utf8'))

bot.telegram.getMe().then((botInfo) => {
	bot.options.username = botInfo.username
})

// Add a cron job to post activities automatically. Delete the previous activities post at the same time.
var latestCronMessage;
var CronJob = require('cron').CronJob;
var job = new CronJob('0 0 */4 * * *', function() {
	if (latestCronMessage) { bot.telegram.deleteMessage(-1001276103478, latestCronMessage)};
  	if (!latestCronMessage & fs.existsSync(`lastCronMessage.txt`)) {
		fs.readFile(`lastCronMessage.txt`, `utf8`, function (err, data) {
	  	if (err) throw err;
	  	latestCronMessage = data;
	  	bot.telegram.deleteMessage(-1001276103478, latestCronMessage);
	  	console.log(latestCronMessage);
		})		
  	}
	bot.telegram.sendMessage(-1001276103478, '<b>Daily tasks to help JRR grow:</b>\n\n🧙🏼‍♂️https://gemhunters.net/coin/jrr-token/ Vote once per day\n\n‍🧝🏽‍♂️https://coinmooner.com/coin/2406 Vote once per day\n\n🧝🏼‍♂️https://tokenhunter.co/coin/jrr-token/ Vote once per day\n\n🧝https://coinsniper.net/coin/11747 Vote once per day\n\n🧝🏻‍♀️https://www.rugfreecoins.com/details/2975 Vote once per day\n\n💲Search for JRR Token on Google a couple times per day: https://www.google.com/search?q=jrr+token+crypto \n\n🤑Visit the Dextools page a few times per day https://www.dextools.io/app/pancakeswap/pair-explorer/0xf2e2e720fa9930b26cd38228eb352d748922aa53 (the first time there click on the star)\n\n', {parse_mode: 'HTML'}).then(({ message_id }) => {
    	latestCronMessage = message_id;	
		fs.writeFile(`lastCronMessage.txt`, `${message_id}`, function (err) {
			if (err) throw err;
		}) 	
  	});
}, null, true, 'America/New_York');
job.start();

// Let's run through the commands
bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendChatAction(ctx.chat.id, action="typing");
    setTimeout(function(){
      bot.telegram.sendMessage(ctx.chat.id, 'Smeagol is already running, master. Smeagol is a good bot. GOLLUM GOLLUM', {})    
    }, 2500);
})

bot.command('chart', ctx => {
	bot.telegram.sendChatAction(ctx.chat.id, action='typing');
	setTimeout(function(){
    	bot.telegram.sendMessage(ctx.chat.id, 'https://www.dextools.io/app/pancakeswap/pair-explorer/0xf2e2e720fa9930b26cd38228eb352d748922aa53', {})	
	}, 2000);
})

// This version of the chart command is great when the chart looks good. It's great always, but people like it less when the chart doesn't look sexy.
/*
bot.command('chart', ctx => {
  (async () => {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/chromium-browser',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36']
    });
    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1080});
    await page.goto('https://poocoin.app/tokens/0x8d46739bb6ad55ae438d921cb130afb27e74b46e', {waitUntil: 'networkidle3',});
    await page.screenshot({ path: 'poochartJRR.png' });
    await browser.close();
    await bot.telegram.sendPhoto(ctx.chat.id, {source: './poochartJRR.png'});
  })();
    bot.telegram.sendMessage(ctx.chat.id, 'I will fetch the precious, please wait. GOLLUM GOLLUM', {
    })
})
*/

bot.command('contract', ctx => {
	bot.telegram.sendChatAction(ctx.chat.id, action='typing');
	setTimeout(function(){
	    bot.telegram.sendMessage(ctx.chat.id, '0x8d46739bb6ad55ae438d921cb130afb27e74b46e', {})
	}, 2000);
})

bot.command('buy', ctx => {
	bot.telegram.sendChatAction(ctx.chat.id, action='typing');
	setTimeout(function(){
		bot.telegram.sendMessage(ctx.chat.id, 'https://pancakeswap.finance/swap#/swap?inputCurrency=0x8d46739BB6ad55Ae438D921CB130aFb27E74B46E', {})
	}, 2000);
})

bot.command('website', ctx => {
	bot.telegram.sendChatAction(ctx.chat.id, action='typing');
	setTimeout(function(){
	    bot.telegram.sendMessage(ctx.chat.id, 'https://www.thetokenofpower.com', {})
	}, 2000);
})

bot.command('activities', ctx => {
	bot.telegram.sendChatAction(ctx.chat.id, action='typing');
	setTimeout(function(){
		bot.telegram.sendMessage(ctx.chat.id, '<b>Daily tasks to help JRR grow:</b>\n\n🧙🏼‍♂️https://gemhunters.net/coin/jrr-token/ Vote once per day\n\n‍🧝🏽‍♂️https://coinmooner.com/coin/2406 Vote once per day\n\n🧝🏼‍♂️https://tokenhunter.co/coin/jrr-token/ Vote once per day\n\n🧝https://coinsniper.net/coin/11747 Vote once per day\n\n🧝🏻‍♀️https://www.rugfreecoins.com/details/2975 Vote once per day\n\n💲Search for JRR Token on Google a couple times per day: https://www.google.com/search?q=jrr+token+crypto \n\n🤑Visit the Dextools page a few times per day https://www.dextools.io/app/pancakeswap/pair-explorer/0xf2e2e720fa9930b26cd38228eb352d748922aa53 (the first time there click on the star)\n\n', {parse_mode: 'HTML'})
	}, 2000);
})

bot.command('guide', ctx => {
	bot.telegram.sendChatAction(ctx.chat.id, action='typing');
	setTimeout(function(){
		bot.telegram.sendMessage(ctx.chat.id, '<b>Step 1:</b> Buy Smart Chain BNB in Trust Wallet.\nhttps://i.ibb.co/N9Kc38K/Step1.png\n\n<b>Step 2:</b> Wait for BNB to be delivered, this can take anywhere from a few minutes to several hours.\n\n<b>Step 3:</b> Open PancakeSwap and connect your wallet.\nhttps://i.ibb.co/4JcKw0b/Step3.png\n\n<b>Step 4:</b> Add JRR Token Contract address into the search field and adjust Slippage Tolerance to 12%\nhttps://i.ibb.co/rbXLLrr/Step4.png\n\n<b>Step 5:</b> Click Swap and your JRR is on the way!', {parse_mode: 'HTML'});
	}, 2000);
})

bot.command('roll', ctx => {
	bot.telegram.sendChatAction(ctx.chat.id, action='typing');
	let roll = [];
	let diceQuantity = 1;
	let text = ctx.message.text;
	args = text.split(' ');
	let diceSides = args[1];
	if (!args[1] || args[2]){
		return bot.telegram.sendMessage(ctx.chat.id, 'Usage: /roll [number of sides on die] (or "d" notation, like 3d12)')
	}
	if (args[1].toString().toLowerCase().includes('d')){
		let diceInfo = args[1].split('d');
		diceQuantity = Math.abs(diceInfo[0]);
    	diceSides = Math.abs(diceInfo[1]);
    	if (isNaN(diceQuantity) || isNaN(diceSides)){
    		return bot.telegram.sendMessage(ctx.chat.id, 'Usage: /roll [number of sides on die] (or "d" notation, like 3d12)')
    	}
  	} else {
    	let diceSides = args[1];
  	}
  	for (let i = 0; i < diceQuantity; i++) {
      	roll.push(Math.ceil(Math.random()*Math.abs(Math.floor(diceSides))));
  	}
  	roll = roll.join(', ');
  	setTimeout(function(){
  		bot.telegram.sendMessage(ctx.chat.id, `You rolled: ${roll}.`);
  	}, 2500)
})

// Let's do some important stuff when we see a text-type message has been posted. 
bot.on('text', ctx => {
  let badStrings = 
  	[
  	'i-58xPAFjGgwOTZi',
  	'kT5FAKgncmQ1NGMy',
  	'i-58xPAFjGgwOTZi', 
  	'honeypotscan.com',
  	'THE FIRST MOBILE APPLICATION FOR CHECKING SMART CONTRACTS',
  	'✅HONEYPOT SCAN ($HPST)',
  	'🚀LAUNCH ON PANCAKESWAP ON OCTOBER 5',
  	'Time for our daily activity',
  	'It\'s time for our daily task',
  	'Our coin is listed on coindiscovery .app',
  	'Please, guys, make a vote for JRRToken',
  	'🔥 TIME TO VOTE 🔥',
  	'JRR Token is listed on Coin Scout!',
  	]
  	
  for (let j = 0; j < badStrings.length; j++) {
  	  badStrings[j] = badStrings[j].toLowerCase();
	  if (ctx.message.text.toString().toLowerCase().includes(badStrings[j])) {
	  	console.log(`Match found: ${badStrings[j]}`);
	    let gifArray = 
	      [
	      'https://tenor.com/view/mad-argh-angry-rage-smeagol-gif-3556295', 
	      'https://i.gifer.com/origin/15/159a9b30970ea896703410cf33bf96b5_w200.gif', 
	      'https://64.media.tumblr.com/211a4c412969d76d15b7795c479c7566/tumblr_n6g8s30HNc1sjd8gao1_500.gif', 
	      'https://c.tenor.com/jhJp2A-K5HwAAAAd/gollum-leave-now.gif', 
	      'https://c.tenor.com/hhXSacrSG2YAAAAM/gollum-lotr.gif', 
	      'https://c.tenor.com/CMEj8VIJC34AAAAC/gollum-angry.gif', 
	      'https://c.tenor.com/q7AIgBX-i4QAAAAC/sneaky-lordoftherings.gif'
	      ]
		bot.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id, {
		})

//   **** this is the part where it would ban someone for spam and send a notification about it ****
/*
		bot.telegram.kickChatMember(ctx.chat.id, ctx.message.from.id, {});
		bot.telegram.sendMessage(-1563391102, `I just banned ${ctx.message.from.id}`);
*/

		bot.telegram.sendChatAction(ctx.chat.id, action='typing');
		setTimeout(function(){		
			ctx.replyWithMarkdown(gifArray[Math.floor(Math.random()*gifArray.length)]).then(
  	  		({ message_id }) => {
	    	setTimeout(
	    		() => ctx.deleteMessage(message_id),
	    	    10 * 1000)
	    	// console.log(message_id)
	    	})		
		}, 2000);
		return;
	}
  }

  if ((!ctx.message.from.is_bot) && (filter.isProfane(ctx.message.text))){
	bot.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
	return bot.telegram.sendMessage(ctx.chat.id, `Filthy mouths won't be around long, precious. Master should be more careful. GOLLUM`);
  }
	
  if (!fs.existsSync(`telegramHistory.txt`)) {
	fs.writeFile(`telegramHistory.txt`, `Welcome to JRR Token!`, function (err) {
	  if (err) throw err;
	})
  }

  var randomFuckery = Math.ceil(Math.random()*50);
	if (!ctx.message.from.is_bot) {
	  fs.appendFile(`telegramHistory.txt`, `\n${ctx.message.text}`, function (err) {
		if (err) throw err;
	  });
	}

  if ((ctx.message.text.toString().toLowerCase().includes('smeagol') || ctx.message.text.toString().toLowerCase().includes('smeags') || ctx.message.text.toString().toLowerCase().includes('gollum')) && (ctx.message.text.toString().toLowerCase().includes('love you')) ||ctx.message.text.toString().toLowerCase().includes('love ya')) {
	bot.telegram.sendChatAction(ctx.chat.id, action='typing');
  	setTimeout(function(){  	
		bot.telegram.sendMessage(ctx.chat.id, 'https://c.tenor.com/j6aYNh_8znYAAAAM/nobody-likes-you-gollum.gif', {
  		}, 2000);
  	})
  } else if (ctx.message.text.toString().toLowerCase().includes('smeagol') || ctx.message.text.toString().toLowerCase().includes('gollum') || randomFuckery == 10) {
  	  bot.telegram.sendChatAction(ctx.chat.id, action='typing');
    // Markov chain goes here
      let words = ctx.message.text.split(' ');
      if (words[1]) {
        var startWord = words[Math.floor(Math.random()*words.length)];
        var phraseLength = (Math.ceil(Math.random()*((words.length + 10)*2)));
      } else {
        var startWord = ctx.message.from.first_name;
        var phraseLength = Math.ceil(Math.random()*20);
      }
    wordSalad = new MarkovChain(fs.readFileSync(`./telegramHistory.txt`, 'utf8'))
    var phrase = wordSalad.start(startWord).end(phraseLength).process();
    var firstLetter = phrase.slice(0, 1);
    firstLetter = firstLetter.toUpperCase();
    var restOfPhrase = phrase.slice(1, phrase.length);
    phrase = firstLetter + restOfPhrase;
    while (phrase.endsWith('?') || phrase.endsWith('.') || phrase.endsWith('!') || phrase.endsWith('"') || phrase.endsWith(',')) {
      phrase = phrase.slice(0, -1)
    }
    while (phrase.includes('@')) {
      phrase.replace('@', '');
    }
    setTimeout(function(){
    	bot.telegram.sendMessage(ctx.chat.id, phrase+'.');  
    }, 2500);  
  }
});

bot.launch();
