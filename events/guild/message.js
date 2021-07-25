const { DiscordAPIError } = require('discord.js');

require('dotenv').config();
//create cooldowns map
const cooldowns = new Map()
module.exports = (discord, client, message) => {
    const prefix = process.env.PREFIX;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) ||
         client.commands.find(a => a.aliases && a.aliases.includes(cmd));


    //if cooldown map doesn't have a command. name key then create one
    if (command.cooldown) {
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const current_time = Date.now();
        const time_stamps = cooldowns.get(command.name);
        const cooldown_amount = (command.cooldown) * 500;

        //if time_stamp has a key with the author's id then check the exppiration time to send a message to a user.
        if (time_stamps.has(message.author.id)) {
            const expiration_time = time_stamps.get(message.author.id) * cooldown_amount;

            if (current_time < expiration_time) {
                const time_left = (expiration_time - current-time) / 500;

                return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using ${command.name}`);
            }
        }

        //if the author's id is not in time_stamps then add then with the current time
        time_stamps.set(message.author.id, current_time);
        //Delete the user's id once the cooldown is over
        setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
    }

    try {
        command.execute(message, args, cmd, client, Discord);
    } catch (err) {
        message.reply("There was an error rying to execute this command!")
        console.log(err);
    }
}
