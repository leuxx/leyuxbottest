const Discord = require("discord.js")
const db = require("quick.db")
const moment = require('moment');
exports.run = async(client, message, args) => {
  
      function destructMS(milli) {
      if (isNaN(milli) || milli < 0) {
        return null;
      }
    
      var d, h, m, s;
      s = Math.floor(milli / 1000);
      m = Math.floor(s / 60);
      s = s % 60;
      h = Math.floor(m / 60);
      m = m % 60;
      d = Math.floor(h / 24);
      h = h % 24;
      var yazi;
      if (d !== 0) yazi = `${d} gün`;
      if (h !== 0 && yazi) yazi = yazi + `, ${h} saat`;
      if (h !== 0 && !yazi) yazi = `${h} saat`;
      if (m !== 0 && yazi) yazi = yazi + `, ${m} dakika`;
      if (m !== 0 && !yazi) yazi = `${m} dakika`;
      if (s !== 0 && yazi) yazi = yazi + `, ${s} saniye`;
      if (s !== 0 && !yazi) yazi = `${s} saniye`;
      if (yazi) return yazi;
      if (!yazi) return `1 saniye`;
    };
  
   const yetkimyok = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Bu Komutu Kullanmak İçin Yeterli İzine Sahip Değilsin`, message.author.avatarURL)
  
  let rol = await db.fetch(`kskgrol${message.guild.id}`)
  let rolbul = message.guild.roles.get(rol)
  
  if(!message.member.roles.has(rolbul.id))
     return message.channel.send(yetkimyok)
  
let kayitedilcekkisi = message.mentions.users.first()

    const kisifyo = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir Kişi Etiketlemelisin`, message.author.avatarURL)
    
    if (!kayitedilcekkisi)
      return message.channel.send(kisifyo)
    
    const kayitkisi = message.guild.member(kayitedilcekkisi)
    
    var isim = args.slice(1).join(" ")
    
    const ama = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Bir İsim Ve Yaş Belirtmelisin`, message.author.avatarURL)
    
    if (!isim)
      return message.channel.send(ama)
    
    let tag = db.get(`kstag${message.guild.id}`)
    
    kayitkisi.setNickname(` ${isim}`)
    
    kayitkisi.removeRole(db.fetch(`ksalinacakrol${message.guild.id}`))
    
    kayitkisi.addRole(db.fetch(`ksverilecekrol${message.guild.id}`))
    
    const tmyaptm = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Kullanıcı Başarıyla Kayıt Edildi`, kayitedilcekkisi.avatarURL)
    .addField('Kayıt Eden Yetkili;', message.author.username + '#' + message.author.discriminator)
    .addField('ID;', message.author.id)
    .addField(`Hesabı Kaç Gündür Var`, destructMS(Date.now() - kayitedilcekkisi.createdTimestamp) )
    
    message.channel.send(tmyaptm)
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıt-et"],
  perm: 2,
  kategori: "moderasyon"
}

exports.help = {
  name: "kayıt",
  description: "Kayıt Eder",
  usage: "kayıt-et @Kişi (İsim) (Yaş)"
}