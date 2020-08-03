const Discord = require('discord.js');

exports.run = async (client, message) => {
 
  var str = ''
for(var i = 0; i < message.guild.members.size; i++) {
   if(message.guild.members.array()[i].hasPermission("MANAGE_MESSAGES") && message.guild.members.array()[i].presence.status === "dnd" && !message.guild.members.array()[i].user.bot) {
      str += `<:rahatsiz:711187057711513611>${message.guild.members.array()[i].user.tag}\n`
    }
    else if(message.guild.members.array()[i].hasPermission("MANAGE_MESSAGES") && message.guild.members.array()[i].presence.status === "online" && !message.guild.members.array()[i].user.bot){
      str += `<a:online:711187112959148073> ${message.guild.members.array()[i].user.tag}\n`
    }
    else if(message.guild.members.array()[i].hasPermission("MANAGE_MESSAGES") && message.guild.members.array()[i].presence.status === "idle" && !message.guild.members.array()[i].user.bot){
      str += `<:bosta:711187074337996802> ${message.guild.members.array()[i].user.tag}\n`
    }
      else if (message.guild.members.array()[i].hasPermission("MANAGE_MESSAGES") && message.guild.members.array()[i].presence.status === "offline" && !message.guild.members.array()[i].user.bot){
      str += `<a:aktifdeil:711187137483243599> ${message.guild.members.array()[i].user.tag}\n`//ayarlancak
    }
}

  var embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${message.guild.name} - Sunucu Yetkilileri`)
  .setDescription(str.replace(message.guild.owner.user.tag, `:crown: **${message.guild.owner.user.tag}**`))
  .setThumbnail(message.guild.iconURL)
  .setFooter("NOT: Bu komut sunucudaki \"Mesajları Yönet\" iznine sahip kullanıcıları listeler.")
message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yetkili-listesi', 'sunucu-yetkilileri', 'moderatorler', 'modlar', 'moderatörler', 'staffs'],
  permLevel: 2,
   kategori: "moderasyon"
};

exports.help = {
  name: 'yetkililer',
 description: 'Yetkilileri gösterir.',
  usage: 'yetkililer'
};