const discord = require('discord.js');
var client = new discord.Client;
client.on("ready", () => {
    console.log("Ready!");
    client.user.setGame("discord.me/aboverblx | ;");
});
const prefix = ";";
const fs = require("fs");
const https = require("https");
const xml2js = require('xml2js');
client.memos = require("./memos.json");
client.xp = require("./xp.json");

client.on("message", (message) => {
    let AUTHOR = message.author
    if (message.author.bot) return;
    msg = message.content.toLowerCase();
    mention = message.mentions.users.first();
    // Prefix Commands
        // No Value Commands
    if (msg.startsWith(prefix + "check")) {
        message.channel.send("The bot is active and running v1.3.2! :white_check_mark:")
    };
    if (msg.startsWith(prefix + "invite")) {
        message.channel.send("Get your friends in! https://discord.me/aboverblx")
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
    if (msg.startsWith(prefix + "obfuscate")) {
        let embed = new discord.RichEmbed()
        .setColor("AQUA")
        .setTitle("Obfuscation Instructions")
        .setDescription(`
        :arrow_forward: Request a whitelist by private messaging the owner! <@307713559473815562>
        :arrow_forward: Install the plugin! https://www.roblox.com/library/3362835374/SIGHTS-Obfuscator
        :arrow_forward: Click the button in the plugins tab in studio and then enter your Discord ID!
        :arrow_forward: Submit the key and then select a script you want to obfuscate in the object explorer!
        :arrow_forward: Click on the button and then in the plugins tab in studio again to obfuscate!
        :white_check_mark: Now you have your obfuscated script!
        `)
        .setFooter("If you find a way to crack the source, please tell the developers! ")
        message.channel.send(embed)
    }
        // Value Commands
    if (msg.startsWith(prefix + "memo")) {
        editedmessage = message.content.slice(prefix.length + 5);
        client.memos[AUTHOR.id] = {
            message: editedmessage
        };
        fs.writeFile("./memos.json", JSON.stringify(client.memos, null, ), err => {
            if (err) throw err;
            message.channel.send("Memo has been saved!");
        });
    };
    if (msg.startsWith(prefix + "readmemo")) {
        let _MEMO = client.memos[AUTHOR.id].message;
        AUTHOR.send(_MEMO);
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
                        // console.log(r34Pic);
                        let embed = new discord.RichEmbed()
                            .setColor("LUMINOUS_VIVID_PINK")
                            .setTitle("Rule34: " + editedmessage)
                            .setFooter(r34Pic)
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
    // Leveling
        // System
    let xpAdd = Math.floor(Math.random() * 7) + 8;
    if (!client.xp[AUTHOR.id]) {
        client.xp[AUTHOR.id] = {
            xp: 0,
            level: 1
        };
    }
    let curXP = client.xp[AUTHOR.id].xp;
    let curLVL = client.xp[AUTHOR.id].level;
    let nxtLvl = client.xp[AUTHOR.id].level * 600;
    client.xp[AUTHOR.id].xp = curXP + xpAdd;
    if (nxtLvl <= client.xp[AUTHOR.id].xp) {
        client.xp[AUTHOR.id].level = curLVL + 1;
        client.xp[AUTHOR.id].xp = 0;
        let embed = new discord.RichEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`Level up: ${AUTHOR.username}`)
            .setFooter(`${AUTHOR.username} has leveled up!`)
            .setDescription(`${AUTHOR.username}, you have leveled up to ${client.xp[AUTHOR.id].level}!`)
        message.channel.send(embed);
        fs.writeFile("./xp.json", JSON.stringify(client.xp), (err) => {
            if (err) console.log("An error has been caught while trying to write in ./xp.json");
        });
    }
    if (client.xp[AUTHOR.id].level == 5) {
        let rMember = message.guild.member(AUTHOR) || message.guild.members.get(AUTHOR.username);
        if (!rMember) return message.reply("Failed to find the person that needs the rank role.");
        let role = "👌 E-Tier 👌";
        if (!role) return message.reply(`${role} does not exist!`);
        let gRole = message.guild.roles.find(`name`, role);
        if (!gRole) return message.reply(`Could not find the role, ${role}`)
        if (rMember.roles.has(gRole.id));
        await(rMember.addRole(gRole.id));
        let embed = new discord.RichEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`Rank up: ${AUTHOR.username}`)
            .setFooter(`${AUTHOR.username} has ranked up!`)
            .setDescription(`${AUTHOR.username}, you have ranked up to ${role}!`)
        message.channel.send(embed);
    }
    if (client.xp[AUTHOR.id].level == 10) {
        let rMember = message.guild.member(AUTHOR) || message.guild.members.get(AUTHOR.username);
        if (!rMember) return message.reply("Failed to find the person that needs the rank role.");
        let role = "😂 D-Tier 😂";
        if (!role) return message.reply(`${role} does not exist!`);
        let gRole = message.guild.roles.find(`name`, role);
        if (!gRole) return message.reply(`Could not find the role, ${role}`)
        if (rMember.roles.has(gRole.id));
        await(rMember.addRole(gRole.id));
        let embed = new discord.RichEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`Rank up: ${AUTHOR.username}`)
            .setFooter(`${AUTHOR.username} has ranked up!`)
            .setDescription(`${AUTHOR.username}, you have ranked up to ${role}!`)
        message.channel.send(embed);
    }
    if (client.xp[AUTHOR.id].level == 15) {
        let rMember = message.guild.member(AUTHOR) || message.guild.members.get(AUTHOR.username);
        if (!rMember) return message.reply("Failed to find the person that needs the rank role.");
        let role = "👍 C-Tier 👍";
        if (!role) return message.reply(`${role} does not exist!`);
        let gRole = message.guild.roles.find(`name`, role);
        if (!gRole) return message.reply(`Could not find the role, ${role}`)
        if (rMember.roles.has(gRole.id));
        await(rMember.addRole(gRole.id));
        let embed = new discord.RichEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`Rank up: ${AUTHOR.username}`)
            .setFooter(`${AUTHOR.username} has ranked up!`)
            .setDescription(`${AUTHOR.username}, you have ranked up to ${role}!`)
        message.channel.send(embed);
    }
    if (client.xp[AUTHOR.id].level == 20) {
        let rMember = message.guild.member(AUTHOR) || message.guild.members.get(AUTHOR.username);
        if (!rMember) return message.reply("Failed to find the person that needs the rank role.");
        let role = "❤️ B-Tier ❤️";
        if (!role) return message.reply(`${role} does not exist!`);
        let gRole = message.guild.roles.find(`name`, role);
        if (!gRole) return message.reply(`Could not find the role, ${role}`)
        if (rMember.roles.has(gRole.id));
        await(rMember.addRole(gRole.id));
        let embed = new discord.RichEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`Rank up: ${AUTHOR.username}`)
            .setFooter(`${AUTHOR.username} has ranked up!`)
            .setDescription(`${AUTHOR.username}, you have ranked up to ${role}!`)
        message.channel.send(embed);
    }
    if (client.xp[AUTHOR.id].level == 25) {
        let rMember = message.guild.member(AUTHOR) || message.guild.members.get(AUTHOR.username);
        if (!rMember) return message.reply("Failed to find the person that needs the rank role.");
        let role = "🔥 A-Tier 🔥";
        if (!role) return message.reply(`${role} does not exist!`);
        let gRole = message.guild.roles.find(`name`, role);
        if (!gRole) return message.reply(`Could not find the role, ${role}`)
        if (rMember.roles.has(gRole.id));
        await(rMember.addRole(gRole.id));
        let embed = new discord.RichEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`Rank up: ${AUTHOR.username}`)
            .setFooter(`${AUTHOR.username} has ranked up!`)
            .setDescription(`${AUTHOR.username}, you have ranked up to ${role}!`)
        message.channel.send(embed);
    }
    if (client.xp[AUTHOR.id].level == 30) {
        let rMember = message.guild.member(AUTHOR) || message.guild.members.get(AUTHOR.username);
        if (!rMember) return message.reply("Failed to find the person that needs the rank role.");
        let role = "👑 S-Tier 👑";
        if (!role) return message.reply(`${role} does not exist!`);
        let gRole = message.guild.roles.find(`name`, role);
        if (!gRole) return message.reply(`Could not find the role, ${role}`)
        if (rMember.roles.has(gRole.id));
        await(rMember.addRole(gRole.id));
        let embed = new discord.RichEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`Rank up: ${AUTHOR.username}`)
            .setFooter(`${AUTHOR.username} has ranked up!`)
            .setDescription(`${AUTHOR.username}, you have ranked up to ${role}!`)
        message.channel.send(embed);
    }
        // Commands
    if (msg.startsWith(prefix + "rank")) {
        let embed = new discord.RichEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`Rank: ${AUTHOR.username}`)
            .setFooter(`${AUTHOR.username}'s current rank`)
            .setDescription(`${AUTHOR.username}, your current level is ${client.xp[AUTHOR.id].level} and your current XP is ${client.xp[AUTHOR.id].xp}/${client.xp[AUTHOR.id].level * 600}!`)
        message.channel.send(embed);
    };
    if (msg.startsWith(prefix + "setlvl")) {
        let rMember = message.guild.member(AUTHOR) || message.guild.members.get(AUTHOR.username);
        if (!rMember) return message.reply("Could not find this user!");
        if (rMember.hasPermission("ADMINISTRATOR")) {
            params = message.content.slice(prefix.length + 7)
            let LEVELS = Number(params);
            client.xp[AUTHOR.id].level = LEVELS;
            fs.writeFile("./xp.json", JSON.stringify(client.xp), (err) => {
                if (err) console.log("An error has been caught while trying to write in ./xp.json");
            });
        }
    }
    if (msg.startsWith(prefix + "addlvl")) {
        let rMember = message.guild.member(AUTHOR) || message.guild.members.get(AUTHOR.username);
        if (!rMember) return message.reply("Could not find this user!");
        if (rMember.hasPermission("ADMINISTRATOR")) {
            params = message.content.slice(prefix.length + 7)
            let LEVELS = Number(params);
            client.xp[AUTHOR.id].level = client.xp[AUTHOR.id].level + LEVELS;
            fs.writeFile("./xp.json", JSON.stringify(client.xp), (err) => {
                if (err) console.log("An error has been caught while trying to write in ./xp.json");
            });
        }
    }
    if (msg.startsWith(prefix + "setxp")) {
        let rMember = message.guild.member(AUTHOR) || message.guild.members.get(AUTHOR.username);
        if (!rMember) return message.reply("Could not find this user!");
        if (rMember.hasPermission("ADMINISTRATOR")) {
            params = message.content.slice(prefix.length + 6)
            let EXP = Number(params);
            client.xp[AUTHOR.id].xp = EXP;
            fs.writeFile("./xp.json", JSON.stringify(client.xp), (err) => {
                if (err) console.log("An error has been caught while trying to write in ./xp.json");
            });
        }
    }
    if (msg.startsWith(prefix + "addxp")) {
        let rMember = message.guild.member(AUTHOR) || message.guild.members.get(AUTHOR.username);
        if (!rMember) return message.reply("Could not find this user!");
        if (rMember.hasPermission("ADMINISTRATOR")) {
            params = message.content.slice(prefix.length + 6)
            let EXP = Number(params);
            client.xp[AUTHOR.id].xp = client.xp[AUTHOR.id].xp + EXP;
            fs.writeFile("./xp.json", JSON.stringify(client.xp), (err) => {
                if (err) console.log("An error has been caught while trying to write in ./xp.json");
            });
        }
    }
});

client.login(process.env.BOT_TOKEN);
