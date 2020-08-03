const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
 if (!message.member.hasPermission("MANAGE_MESSAGES")) {
  const bilgi = new Discord.RichEmbed()
  .setDescription('Bu komutu kullanabilmek için **Mesajları Yönet** yetkisine sahip olmanız gerek.')
  .setColor("0000A0")
return message.channel.sendEmbed(bilgi).then(m => m.delete(150000)); return
       }
  let mlog = message.mentions.channels.first()
  let sıfırla = db.fetch(`seslog_${message.guild.id}`)
if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(`Ses Log Kanalı zaten ayarlı değil.`)                
      return
    }
    db.delete(`seslog_${message.guild.id}`)
    message.channel.send(`Ses Log Kanalı başarıyla sıfırlandı.`)           
    return
  }
  if (!mlog) {
    return message.channel.send(
    `Ses Log Olacak Kanalı etiketlemelisin.`)                       
  }
  db.set(`seslog_${message.guild.id}`, mlog.id)
    message.channel.send(`✅ Ses Log Kanalı başarıyla ${mlog} olarak ayarlandı.`)
  };
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ses-log'],
    permLevel: 0
}

exports.help = {
    name: 'ses-log-ayarla',
    description: 'Ses Logu ayarlar.',
    usage: '!ses-log-ayarla #kanal'
}