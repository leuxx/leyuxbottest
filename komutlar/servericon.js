const Discord = require('discord.js');
module.exports.run = (client, message) => {

let embed = new Discord.RichEmbed()
.setImage(message.guild.iconURL)
.setColor('RANDOM');

message.channel.send(embed)
};

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sicon'],
  permLevel: 0,
  kategori: "kullanıcı"
};

module.exports.help = {
  name: 'servericon',
  description: 'Sunucunun ppsini atar.',
  usage: 'servericon'
};