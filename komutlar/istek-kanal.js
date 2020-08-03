const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

exports.run = async(client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Yeterli yetkiye sahip değilsin");

if(!args[0])return message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')
    .setTitle(':x: Hata :x:')
    .setDescription(`\n\nKullanımı ${ayarlar.prefix}istek-kanal [ayarla/sıfırla]`))

if(args[0]!=="ayarla"&& args[0]!=="sıfırla")return message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')
    .setTitle(':x: Hata :x:')
    .setDescription(`\n\nKullanımı ${ayarlar.prefix}istek-kanal [ayarla/sıfırla]`))

if (args[0] === 'ayarla') {

if(!message.mentions.channels.first())return message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')
    .setTitle(':x: Hata :x:')
    .setDescription(`\n\nBir kanal etiketlemelisin`))

db.set(`istekkanal_${message.guild.id}`, message.mentions.channels.first().id)
message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')
    .setTitle(':white_check_mark: Başarılı :white_check_mark:')
    .setDescription(`\n\nİstek kanalı ayarlandı`))}

if (args[0] === 'sıfırla') {
db.delete(`istekkanal_${message.guild.id}`)
message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')
    .setTitle(':white_check_mark: Başarılı :white_check_mark:')
    .setDescription(`\n\nİstek kanalı sıfırlandı`))
}

}
exports.conf = {
	enabled : true,
	guildOnly : false,
	aliases : ['istek-kanal'],
	permLevel : 0,
  kategori: "moderasyon"
}
exports.help = {
	name : 'istek-kanal',
	description : 'İstek Kanalını Belirtir.',
	usage : 'istek-kanal'
}