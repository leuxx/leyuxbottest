const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, params, args) => {
     if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('<a:x3:711295776055361617> Otomatik tag komudunun log kanalını ayarlamak için `Yönetici` yetkisine sahip olman gerek.')
     let otoTagkanal = message.mentions.channels.first();
     if (!otoTagkanal) return message.channel.send('<a:x3:711295776055361617> Otomatik tag komudunun log kanalını ayarlamak için bir kanal etiketlemeniz gerekli. `g!ototagkanal #kanal`')
     db.set(`ototagKanal_${message.guild.id}`, message.mentions.channels.first().id)
     let i = await db.fetch(`ototagKanal_${message.guild.id}`)
            	  	  const embed = new Discord.RichEmbed()
  .setDescription(`<a:tik3:711295763073728612> Ototag Kanalı Başarıyla Ayarlandı Kanal <#${i}> Olarak Ayarlandı!` + "\n\n Kapatmak için **`g!ototagkapat`** Yazabilirsiniz!")
    .setColor("#F0C30D")
    .setTimestamp();
  message.channel.send({ embed });
};

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0,
  kategori: "moderasyon"
};

exports.help = {
 name: 'ototagkanal',
 description: 'oto tag kanalı belirler',
 usage: 'ototagkanal'
};