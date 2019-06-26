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
    if (msg.startsWith(prefix + "e6")) {
        params = message.content.slice(prefix.length + 5)
        var tagesto = "";
        var tagestosplit = params.split(",");
        for (var i = 0; i < tagestosplit.length; i++) {
            tagestosplit[i] = tagestosplit[i].trim();
            tagestosplit[i] = tagestosplit[i].replace(/\s/g, "_");
        }
        tagesto = tagestosplit.join("+");
        if (message.channel.type === "dm" || message.channel.name.indexOf("the_art_gallery") != -1 || message.channel.name.indexOf("furry") != -1 || message.channel.name.indexOf("2am") != -1 || message.channel.name.indexOf("nsfw") != -1) {
            console.log("Safe to post NSFW content.");
        }
        else {
            tagesto += "+rating:safe";
            if ((tagesto.indexOf("rating:explicit") != -1) || (tagesto.indexOf("penis") != -1) || (tagesto.indexOf("pussy") != -1) || (tagesto.indexOf("anus") != -1) || (tagesto.indexOf("dick") != -1) || tagesto.indexOf("rating:questionable") != -1 || tagesto.indexOf("genitalia") != -1 || tagesto.indexOf("genitals") != -1 || tagesto.indexOf("genital") != -1 || tagesto.indexOf("vagina") != -1 || tagesto.indexOf("cunt") != -1 || tagesto.indexOf("vaginal") != -1 || tagesto.indexOf("vaginal_penetration") != -1 || tagesto.indexOf("sex") != -1 || tagesto.indexOf("fuck") != -1 || tagesto.indexOf("intercourse") != -1 || tagesto.indexOf("cock") != -1) {
                message.channel.send(":regional_indicator_x: That content isn't appropiate for this channel. Go be naughty elsewhere.", {files:[{attachment: __dirname + bruh.jpg}]});
                return;
            }
        }
        https.get(url, function(res){
            var body = '';
            res.on('data', function(chunk){
                body += chunk;
            });
            res.on('end', function(){
                var estoThing = JSON.parse(body);
                if (typeof (estoThing[0]) != "undefined") {
                    let embed = new discord.RichEmbed()
                        .setColor("LUMINOUS_VIVID_PINK")
                        .setTitle("E621: " + editedmessage)
                        .setFooter(estoThing[0].file_url.toString())
                        .setImage("https://e621.net/post/show/" + estoThing[0].id.toString())
                        .setDescription("Enjoy~! OwO")
                    message.channel.send(embed)
                } else {
                    msg.channel.send(":regional_indicator_x: No images found. Try different tags.")
                }
                });
            }).on('error', function(e){
                console.log("Got an error: ", e);
        });
    };
    // Emoji Commands
    if (msg.startsWith("👀")) {
        message.channel.send("Hmm. :eyes:");
    };
});

client.login(process.env.BOT_TOKEN);
