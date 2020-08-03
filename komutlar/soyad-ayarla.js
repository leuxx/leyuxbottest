const Discord = require('discord.js')
//var ayarlar = require('../ayarlar.json');
  const db = require('quick.db');
  
exports.run = async (client, message, args) => {
  const dil = db.fetch(`${message.guild.id}.dil`)
  if (dil === 'en') {
    if (!args.slice(0).join(' ')) return message.channel.send('Please enter your last name!')
if (10 < args.slice(0).join(' ').length) return message.channel.send('Please do not type more than 10 characters!')
      let e = new Discord.RichEmbed()
      .setDescription('Set surname ' + args.slice(0).join(' '))
      .setColor("#cfc9c9")
      message.channel.send(e)
  
    db.set(`${message.author.id}.soy`, args.slice(0).join(' '))
    return
  }
  if (!args.slice(0).join(' ')) return message.channel.send('Lütfen Soy İsminizi Giriniz!')
  
if (10 < args.slice(0).join(' ').length) return message.channel.send('Lütfen 10 Karakterden Uzun Bir Soyisim Yazmayınız!')
      let e = new Discord.RichEmbed()
      .setDescription('Ayarlanan Soyisim ' + args.slice(0).join(' '))
      .setColor("#cfc9c9")
      message.channel.send(e)
  
    db.set(`${message.author.id}.soy`, args.slice(0).join(' '))
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
   kategori: "kullanıcı"
  };

  exports.help = {
    name: 'soyisim-ayarla',
    description: 'Gelişmiş Destek Sistemindeki destek kanalını değiştirmenizi sağlar.',
    usage: 'destek-kanal-ayarla [#kanal/kanal adı]'
  };