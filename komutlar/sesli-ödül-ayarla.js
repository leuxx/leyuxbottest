const Discord = require("discord.js"),
      db = require("quick.db")

exports.run = async (client, message, args ) => {
let süre = db.fetch(`seslisüredakikası_${message.guild.id}`)
if(!süre) return message.channel.send("İlk Önce Rol Almaları İçin Gereken Zamanı Belirlemelisin!")
 if (!message.member.hasPermission("MANAGE_ROLES")) {
  const bilgi = new Discord.RichEmbed()
  .setDescription('Bu komutu kullanabilmek için **Rolleri Yönet** yetkisine sahip olmanız gerek.')
  .setColor("0000A0")
return message.channel.sendEmbed(bilgi).then(m => m.delete(150000)); return
       }
let sıfırla = db.fetch(`sesödül_${message.guild.id}`)

if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(`Ses Rolü zaten ayarlı değil.`)
                     
      return
    }
    
    db.delete(`sesödül_${message.guild.id}`)
    message.channel.send(`Ses ödül Rolü başarıyla sıfırlandı.`)
                
    return
  }


  
let rol = message.mentions.roles.first()
if(!rol) return message.channel.send("Bir Rol Etiketlemelisin!")
if(rol) {
db.set(`sesödül_${message.guild.id}` , rol.id)
  message.channel.send(`✅ Ses Ödül başarıyla ${rol.name} olarak ayarlandı.`)
}

 }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sesli-ödül"],
  permLevel: 0,
  kategori: "moderasyon"
};

exports.help = {
  name: 'sesli-rol',
  description: "Sesliyi süren dolunca rol verir.",
  usage: "!sesli-rol"
};