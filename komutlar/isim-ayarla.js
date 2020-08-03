const Discord = require('discord.js')
//var ayarlar = require('../ayarlar.json');
  const db = require('quick.db');

exports.run = async (client, message, args) => {
  const dil = db.fetch(`${message.guild.id}.dil`)
  if (dil === 'en') {
    if (!args.slice(0).join(' ')) return message.channel.send('Please enter your name!')
  if (10 < args.slice(0).join(' ').length) return message.channel.send('Please do not type a name longer than 10 characters!')

      let e = new Discord.RichEmbed()
      .setDescription('Name set ' + args.slice(0).join(' '))
      .setColor("#cfc9c9")
      message.channel.send(e)
  
    db.set(`${message.author.id}.isim`, args.slice(0).join(' '))
  return
  }
  if (!args.slice(0).join(' ')) return message.channel.send('Lütfen İsminizi Giriniz!')
  if (10 < args.slice(0).join(' ').length) return message.channel.send('Lütfen 10 Karakterden Uzun Bir İsim Yazmayınız.')

      let e = new Discord.RichEmbed()
      .setDescription('Ayarlanan İsim ' + args.slice(0).join(' '))
      .setColor("#cfc9c9")
      message.channel.send(e)
  
    db.set(`${message.author.id}.isim`, args.slice(0).join(' '))
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    kategori: "kullanıcı"
  };

  exports.help = {
    name: 'isim-ayarla',
    description: 'isim-ayarlar',
    usage: '!isim ayarla'
  };