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
        message.reply("the bot is active! :white_check_mark:")
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
        var url = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + editedmessage;
 
        https.get(url, function(res){
            var body = '';
   
            res.on('data', function(chunk){
                body += chunk;
            });
   
            res.on('end', function(){
                var parser = new xml2js.Parser();
                parser.parseString(body, function (err, result) {
                    var postCount = result.posts.$.count - 1;
                    if(postCount > 100) {
                        postCount = 100;
                    }
                    if(postCount > 0) {
                        var picNum = Math.floor(Math.random() * postCount) + 0;
                        var r34Pic = result.posts.post[picNum].$.file_url;
                        // console.log(result.posts.post[picNum].$.file_url);
                        let embed = new discord.RichEmbed()
                            .setColor("LUMINOUS_VIVID_PINK")
                            .setTitle("Rule34: " + editedmessage)
                            .setFooter(result.posts.post[picNum].$.file_url)
                            .setImage(r34Pic)
                            .setDescription("Enjoy~!")
                        message.channel.send(embed)
                   
                    } else {
                        console.log("Nothing found:", editedmessage);
                        message.channel.send(":regional_indicator_x: Nobody here but us chickens!");
                    }

                    });
                });
            }).on('error', function(e){
                console.log("Got an error: ", e);
        });
    };
    // Emoji Commands
    if (msg.startsWith("👀")) {
        message.channel.send("Hmm. :eyes:");
    };
    // Administrator Commands
    if (message.member.hasPermission("ADMINISTRATOR")) {
        if (msg.startsWith(prefix + "purge")) {
            let numMsgDelete = Number(message.content.slice(prefix.length + 6));
            if (isNaN(numMsgDelete)) { message.channel.send(":regional_indicator_x: Not a valid number!") }
            numMsgDelete = Math.round(numMsgDelete);
            message.channel.bulkDelete(numMsgDelete)
                .catch(console.error);
        };
    };
});

client.login(process.env.BOT_TOKEN);
