const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!';
const fs = require('fs');
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handlers', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)
})


const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', () => {
    client.guilds.cache.get("791477733351096360");
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message =>{
     if(!message.content.startsWith(prefix) || message.author.bot) return;

     const args = message.content.slice(prefix.length).split(/ +/);
     const command = args.shift().toLowerCase();

     if(command == 'ping'){
         client.commands.get('ping').execute(message, args);
     } else if (command == 'youtube'){}
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command == 'test'){
        client.commands.get('test').execute(message, args);
    } else if (command == 'test'){}
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'clear'){
        client.commands.get ('clear').execute(message.channel, args);
    } else if (command === 'play'){
        client.commands.get ('play').execute(message.channel, args);
    } else if (command === 'leave'){
        client.commands.get ('leave').execute(message.channel, args);
    }
});


client.login('YOUR_BOT_TOKEN');