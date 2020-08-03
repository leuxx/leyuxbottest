const Discord = require("discord.js"),
      db = require("quick.db")
 
exports.run = async (client, message, args ) => {
 
 if (!message.member.hasPermission("MANAGE_ROLES")) {
  const bilgi = new Discord.RichEmbed()
  .setDescription('Bu komutu kullanabilmek için **Rolleri Yönet** yetkisine sahip olmanız gerek.')
  .setColor("0000A0")
return message.channel.sendEmbed(bilgi).then(m => m.delete(150000)); return
       }
 
let sayı = args[0]
if(!sayı) return message.channel.send('Lütfen Bir Sayı Giriniz! Örnek Kullanım -sesli-ayarla 15 saniye')
if(isNaN(args[0])) return message.channel.send('Lütfen Bir Sayı Giriniz! Örnek Kullanım -sesli-ayarla 15 saniye')
let süre = args[1]
if(!süre) return message.channel.send('Lütfen Bir Saat Dilimi Giriniz! Örnek Kullanım -sesli-ayarla 15 saniye')
 
if(args[1] !== "saniye" && "dakika" && "saat" && "gün") return message.channel.send("Sadece saniye , dakika , saat ve gün kullanabilirsin!")
message.channel.send("Başarıyla Ayarlandı!")
db.set(`seslisüredakikası_${message.guild.id}`, sayı)
db.set(`seslisüredilimi_${message.guild.id}`, süre)
 
 
 
 
 
 }
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sesli-süre-ayarla"],
  permLevel: 0,
  kategori : "moderasyon"
};
 
exports.help = {
  name: 'sesli-ayarla',
 description: "Sesliyi süren dolunca rol verir.",
  usage: "!sesli-ayarla"
};