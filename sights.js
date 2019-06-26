const discord = require('discord.js');
var client = new discord.Client;
client.on("ready", () => {
    console.log("Ready!");
    client.user.setGame("discord.me/sights | ;");
});
const prefix = ";";
const fs = require("fs");
const https = require("https");
const xml2js = require('xml2js');
client.memos = require("./memos.json");

client.on("message", (message) => {
    if (message.author.bot) return;
    msg = message.content.toLowerCase();
    mention = message.mentions.users.first();
    // Prefix Commands
        // No Value Commands
    if (msg.startsWith(prefix + "check")) {
        message.reply("the bot is active and running V16! :white_check_mark:")
    };
    if (msg.startsWith(prefix + "invite")) {
        message.channel.send("Get your friends in! https://discord.me/sights")
    };
    if (msg.startsWith(prefix + "gfp")) {
        let embed = new discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle("The Guild")
            .setFooter("The yandere has sent you the guild photo!")
            .setImage(message.guild.iconURL)
            .setDescription("The yandere thinks that you deserve this.")
        message.channel.send(embed)
    };
        // Value Commands
    if (msg.startsWith(prefix + "memo")) {
        editedmessage = message.content.slice(prefix.length + 5);
        client.memos[message.author.username] = {
            message: editedmessage
        };
        fs.writeFile("./memos.json", JSON.stringify(client.memos, null, ), err => {
            if (err) throw err;
            message.channel.send("Memo has been saved!");
        });
    };
    if (msg.startsWith(prefix + "readmemo")) {
        let _MEMO = client.memos[message.author.username].message;
        message.author.send(_MEMO);
        message.channel.send("Sent your memo to your DMs!")
    };
    if (msg.startsWith(prefix + "r34")) {
        editedmessage = message.content.slice(prefix.length + 4)
        require('./booru').fn(msg, 'rule34 ' + editedmessage)
    };
    // Emoji Commands
    if (msg.startsWith("👀")) {
        message.channel.send("Hmm. :eyes:");
    };
});

client.login(process.env.BOT_TOKEN);
