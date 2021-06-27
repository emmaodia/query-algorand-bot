const fs = require('fs');
const Discord = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {
	const args = message.content.split(/ +/);
	const commandName = args.shift().toLowerCase();


	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(process.env.token);