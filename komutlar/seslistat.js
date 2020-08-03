const Discord = require("discord.js");
const db = require('quick.db');
 
exports.run = async (client, message, args) => {
let newMember = message.mentions.members.first || message.author
let oldMember = message.mentions.members.first || message.author
let rol = db.fetch(`sesödül_${message.guild.id}`)
  var u = message.mentions.users.first() || message.author;
let kullanıcı = message.mentions.members.first || message.author
let kullanıcı1 = message.mentions.users.first || message.author
let mesaj = db.fetch(`mesajsayısı_${message.guild.id + u.id}`)
let saniye = db.fetch(`seslisaniye_${message.guild.id + u.id}`)
let dakika = db.fetch(`seslidakika_${message.guild.id + u.id}`)
let saat = db.fetch(`seslisaat_${message.guild.id + u.id}`)
let gün = db.fetch(`sesligün_${message.guild.id + u.id}`)
 
 let dakikaek = Math.floor(saniye / 60)
let saatek = Math.floor(dakika / 60 )
let günek = Math.floor(saat / 24 )
let dakikaeksi = saatek * 60
let saateksi = günek * 24
 let saniyeeksi = dakikaek * 60
if(saniye => 60) {dakika = Math.floor(dakika + dakikaek) ; saniye = Math.floor(saniye - saniyeeksi)}
if(dakika => 60) {saat = Math.floor(saat + saatek) ; dakika = Math.floor(dakika - dakikaeksi)}
if(saat => 24) {gün = Math.floor(gün + günek) ; saat = Math.floor(saat - saateksi)}
let embed = new Discord.RichEmbed()
.setTitle(`İşte Statların!`)
.setDescription(`Toplam Seslide Bulunma Süren : ** ${gün} gün , ${saat} saat , ${dakika} dakika , ${saniye} saniye**\nMesaj Sayın : **${mesaj ? mesaj : '0'}**`)
.setThumbnail(u.avatarURL)
.setColor("RANDOM")
message.channel.send(embed)
let saati = db.fetch(`seslisüredakikası_${message.guild.id}`)
let dilimi = db.fetch(`seslisüredilimi_${message.guild.id}`)
if(!rol) return
if (!message.member.roles.some(Rol => Rol.id === rol)) {
if(dilimi == "saniye") {
if(saniye >= saati) {
message.member.addRole(rol)
}
}
if(dilimi == "dakika") {
if(dakika >= saati) {
message.member.addRole(rol)
}
}
if(dilimi == "saat") {
if(saat >= saati) {
message.member.addRole(rol)
}
}
if(dilimi == "gün") {
if(gün >= saati) {
message.member.addRole(rol)
}
}
 }
 
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["statlar"],
    permLevel: 0,
    kategori: "kullanıcı"
 
  };
 
  exports.help = {
    name: 'statlarım',
    description: 'Toplam ne kadar seslide olduğuunuz söyler',
    usage: '!statlarım'
  };