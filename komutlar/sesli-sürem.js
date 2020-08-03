const Discord = require('discord.js');
const db = require('quick.db')
const ms = require('parse-ms')
let ms1 = require('parse-ms')
exports.run = async (client, message, args ) => {
 let seslikanal = message.member.voiceChannel
let süre = db.fetch(`seslisüre_${message.guild.id + message.author.id}`)
 let timeObj = ms1(Date.now() - süre)
if(!seslikanal) return message.channel.send("Bir Kanalda Bulunmuyorsun!")
let embed = new Discord.RichEmbed()
.setDescription(`Bulunduğun Sesli Kanal : ${seslikanal} \nSesli Kanalda Bulunma Süren : **${timeObj.days} gün ${timeObj.hours} saat ${timeObj.minutes} dakika ${timeObj.seconds} saniye!**`)
.setColor("RANDOM")
message.channel.send(embed)
 }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sesli-sürem"],
  permLevel: 0,
  kategori: "kullanıcı"
};

exports.help = {
  name: 'seslisürem',
  description: "Ne kadardır sesli odada olduğuunuz söyler",
  usage: "!seslisürem"
};