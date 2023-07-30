const botconfig = require("./botconfig.json");

const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone : true});

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online!`);

  //bot.user.setActivity("BoobBot", {type: "USING"});
  //bot.user.setActivity("ButtBot", {type: "WATCHING"});
  //bot.user.setActivity("OverWatch", {type: "PLAYING"});
  //bot.user.setActivity("Minecraft", {type: "PLAYING"});
  bot.user.setActivity("Bepis", {type: "WATCHING"});
});

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


  if(cmd === `${prefix}help`){
    let helpEmbed = new Discord.RichEmbed()
    .setColor("#7e19c1")
    .addField("/?help", `displays this help command`)
    .addField("/?bot", `displays bot information`)
    .addField("/?server", `displays server information`)
    .addField("/?report", `lets you report someone`)
    .addField("/?kick", `lets you kick assholes`)
    .addField("/?test", `just shows you a box if my testing for errors`);

    message.channel.send(helpEmbed);

    return;
  }

    if(cmd === `${prefix}test`){
      let testEmbed = new Discord.RichEmbed()
      .setColor("#7e19c1")
      .addField("testin for errors", true)
      .addField("dont be a cunt", true)
      .addField("try the none existing ban command :)", false)
      .addField("can someone help with my ban and kick commands?", true)

message.channel.send(testEmbed);

      return;
    }

  if(cmd === `${prefix}server`){

    let sicon = message.guild.displayAvatarURL;
    let serverembed = new Discord.RichEmbed()

    .setDescription("server information")
    .setColor("#7e19c1")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount)
    .addField("A describtion of the server")
    .addField("this server is just to chatt with members", true);

    return message.channel.send(serverembed).catch(console.error);
  }

  if(cmd === `${prefix}bot`){

  let bicon = bot.user.displayAvatarURL
  let botembed = new Discord.RichEmbed()
  .setDescription("bot information")
  .setColor("#7e19c1")
  .setThumbnail(bicon)
  .addField("Bot Name", bot.user.username)
  .addField("Created On", bot.user.createdAt);

  return message.channel.send(botembed).catch(console.error);
}

if(cmd === `${prefix}kick`){

   let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!kUser) return message.channel.send("Can´t find user!");
   let kReason = args.join(" ").slice(22);
   if(!message.member.hasPermission("MANAGAE_MESSAGES")) return message.channel.send("No can do cunt!");
   if(kUser.hasPermission("MANAGAE_MESSAGES")) return message.channel.send("That person can´t be kicked!");

   let kickEmbed = new Discord.RichEmbed()
   .setDescription("~Kick~")
   .setColor("#7e19c1")
   .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
   .addField("kicked by", `<@${message.author.id}> with ID ${message.author.id}`)
   .addField("Kicked In", message.channel)
   .addField("Time", message.createdAt)
   .addField("Reason", kReason);

   let kickChannel = message.guild.channels.find(`name`, "sr-log");
   if(!kickChannel) return message.channel.send("Can´t find my log channel.");

   message.guild.member(kUser).kick(kReason);
   kickChannel.send(kickEmbed);

 return;
}




if(cmd === `${prefix}report`){

  let rUser = message.guild.member(message.mentions.users.first()|| message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Couldn´t find user.");
  let reason = args.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Reports")
  .setColor("#7e19c1")
  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  .addField("Reported By", `${message.author} with ID: ${rUser.id}`)
  .addField("Channel", message.channel)
  .addField("time", message.createdAt)
  .addField("Reason", reason);

  let reportschannel = message.guild.channels.find(`name`, "sr-log");
  if(!reportschannel) return message.channel.send("couldn`t find logs channel.");

  message.delete().catch(O_o=>{});
  reportschannel.send(reportEmbed);

return;
}

});

bot.login(botconfig.token);
