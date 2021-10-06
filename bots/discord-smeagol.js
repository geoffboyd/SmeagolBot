const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, owner } = require('../config/discord.json');
const SQLite = require("better-sqlite3");
const sql = new SQLite('../userinputs.sqlite');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const MarkovChain = require('markovchain');
const commandFiles = fs.readdirSync('../discommands').filter(file => file.endsWith('.js'));
const puppeteer = require('puppeteer-core');
const Filter = require('bad-words');
var filter = new Filter();



const Twitter = require('twit');
const twitterConf = {
    consumer_key: 'CWzf5Sg9Ajy8ygBPpDsSKtjoz',
    consumer_secret: 'zvOPRoR1e1uqBD0p4H02cwjbGuS3zYjYYcbby89eYGDXH6aSz8',
    access_token: '1430181981078294532-9M5bGTh5r5KlLTHW9MJN5A631xKeG8',
    access_token_secret: 'JNDUrqS9uolLMnAoLIkQRpox4vW0zFDoudbDezSxtykXy',
  }
  
const twitterClient = new Twitter(twitterConf);

// Specify destination channel ID below
const dest = '876081200379338765'; 
// const dest = '879870462207877143';

// Create a stream to follow tweets
const stream = twitterClient.stream('statuses/filter', {
  follow: '1411694171409326083', // @TheTokenOfPower
//  follow: '1430181981078294532', // boydster
});

stream.on('tweet', tweet => {
  const twitterMessage = `@everyone ${tweet.user.name} just tweeted: https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
  client.channels.cache.get(dest).send(twitterMessage);
  return false;
});


for (const file of commandFiles) {
  const command = require(`../discommands/${file}`);
  client.commands.set(command.name, command);
}

client.on('message', message => {
  if (message.channel.type !== "text") return; 
  let botName = client.user.username;
  if (message.guild.me.nickname) {
    botName = message.guild.me.nickname;
  }
	if (message.guild !== null && !fs.existsSync(`discordHistory.txt`)) {
		fs.writeFile(`discordHistory.txt`, `Welcome to ${message.guild.name}!`, function (err) {
			if (err) throw err;
		})
	}
 	var words = message['content'].trim().split(/ +/);
        words = words.filter(function(e, botName) { return e.toLowerCase() !== botName.toString().toLowerCase() });
	var randomFuckery = Math.ceil(Math.random()*50);
	if (!message.author.bot && message.guild !== null && !message['content'].startsWith(prefix)) {
		fs.appendFile(`discordHistory.txt`, `\n${message['content']}`, function (err) {
			if (err) throw err;
		});
	}
//	let score;
	if (message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if ((!message.author.bot) && (message['content'].toLowerCase().includes('smeagol')) && message['content'].toLowerCase().includes('love you')){
		return message.channel.send('https://tenor.com/view/lotr-gollum-lord-of-the-rings-lord-of-gif-5398462');
	}
	
	if ((!message.author.bot) && (filter.isProfane(message['content']))){
			message.channel.bulkDelete(1, true).catch(err => {
				console.error(err);
				message.channel.send('there was an error trying to prune messages in this channel!');
			});
		return message.reply(`Filthy mouths won't be around long, precious. Master should be more careful. GOLLUM`);
	}


  if ((!message.author.bot) && (message['content'].toLowerCase().includes(botName.toString().toLowerCase()) && (!command))  || (randomFuckery === 10)) {
	  	message.channel.startTyping();
		if (words[1]) {
        var startWord = words[Math.floor(Math.random()*words.length)];
        var phraseLength = (Math.ceil(Math.random()*((words.length + 10)*2)));
      } else {
        var startWord = message.member.displayName;
        var phraseLength = Math.ceil(Math.random()*20);
      }
    wordSalad = new MarkovChain(fs.readFileSync(`./discordHistory.txt`, 'utf8'))
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
        message.channel.send(phrase+'.');
		message.channel.stopTyping();
    }, Math.floor((Math.random()*3000))+ Math.floor(Math.random()*10*phrase.length));

    }


    if (message.content.indexOf(prefix) !== 0) return;

	if (commandName === "contract"){
		return message.channel.send('0x8d46739bb6ad55ae438d921cb130afb27e74b46e');
	}

/*
	if (commandName === "activities"){
		return message.channel.send('**Daily tasks to help JRR grow:**\n\n🧝🏽‍♂️https://tokenhunter.co/coin/jrr-token one vote per day\n\n🧝🏻‍♀️https://coinsniper.net/coin/11747 one vote per day\n\n🧙🏼‍♂️https://coinmooner.com/coin/2406 one vote per day\n\n🧝🏼‍♂️https://coinhunters.cc/tokens/JRRToken Vote as often as once per minute\n\n💲Search for JRR Token on Google a couple times per day: https://www.google.com/search?q=jrr+token+crypto \n\n🤑Visit the Dextools page a few times per day https://www.dextools.io/app/pancakeswap/pair-explorer/0xf2e2e720fa9930b26cd38228eb352d748922aa53 (the first time there click on the star)');
	}
*/

	if (commandName === "chart"){
		(async () => {
			const browser = await puppeteer.launch({
        		headless: true,
        		executablePath: '/usr/bin/chromium-browser',
        		args: ['--no-sandbox', '--disable-setuid-sandbox', '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36']
    		});
    	const page = await browser.newPage();
    	await page.setViewport({width: 1920, height: 1080});
    	await page.goto('https://poocoin.app/tokens/0x8d46739bb6ad55ae438d921cb130afb27e74b46e', {waitUntil: 'networkidle0',});
    	await page.screenshot({ path: 'poochartJRR.png' });
    	await browser.close();
    	await message.reply('the precious is ready. GOLLUM', {files: ['./poochartJRR.png']});
		})();
    message.channel.send('I will fetch the precious, please wait. GOLLUM GOLLUM');
	}

	if (commandName === "buy"){
		return message.channel.send('https://pancakeswap.finance/swap#/swap?inputCurrency=0x8d46739BB6ad55Ae438D921CB130aFb27E74B46E');
	}
	
	if (commandName === "website"){
		return message.channel.send('https://www.thetokenofpower.com');
	}
	
	if (commandName === 'guide'){
		return message.channel.send('**Step 1:** Buy Smart Chain BNB in Trust Wallet.\nhttps://i.ibb.co/N9Kc38K/Step1.png\n\n**Step 2:** Wait for BNB to be delivered, this can take anywhere from a few minutes to several hours.\n\n**Step 3:** Open PancakeSwap and connect your wallet.\nhttps://i.ibb.co/4JcKw0b/Step3.png\n\n**Step 4:** Add JRR Token Contract address into the search field and adjust Slippage Tolerance to 12%\nhttps://i.ibb.co/rbXLLrr/Step4.png\n\n**Step 5:** Click Swap and your JRR is on the way!');
	}
	
    if (!command) return;

    if (command.guildOnly && message.channel.type !== 'text') {
      return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;

      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }

      return message.channel.send(reply);
    }

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
    message.channel.stopTyping();
});

client.login(token);
