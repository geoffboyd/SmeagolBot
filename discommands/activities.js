const config = require("../config/discord.json");

module.exports = {
  name: 'activities',
  description: 'Display JRR boost activities',
  execute(msg, args) {
    msg.channel.send(
        {
        "embed": {
        "title": "Daily Activities list",
        "color": 12343625,
        "fields":[
		{
			name: `Vote once per day:`,
			value: '🧝🏽‍♂️https://tokenhunter.co/coin/jrr-token',
//			inline: true,
		},
		{
			name: `Vote once per day:`,
			value: '🧝🏻‍♀️https://coinsniper.net/coin/11747',
//			inline: true,
		},
		{
			name: `Vote once per day:`,
			value: '🧙🏼‍♂️https://coinmooner.com/coin/2406',
//			inline: true,
		},
		{
			name: `Vote once per day:`,
			value: '🧝🏼‍♂️https://coinhunters.cc/tokens/JRRToken',
//			inline: true,
		},
		{
			name: `Search for JRR Token on Google a couple times per day:`,
			value: '💲 https://www.google.com/search?q=jrr+token+crypto',
//			inline: true,
		},
		{
			name: `Visit the Dextools page a few times per day`,
			value: '🤑https://www.dextools.io/app/pancakeswap/pair-explorer/0xf2e2e720fa9930b26cd38228eb352d748922aa53',
//			inline: true,
		},
        ]
        }
      }
    );
  },
};
