const Discord = require("discord.js");
const instagram = require("user-instagram");
exports.run = (client, message, args) => {
   var x = args.slice(0).join(' ')
   if (!x) return message.reply("Kullanıcı Adı Girmelisin!")

  let kullanici = args.join(" ");
  if (!kullanici) return message.reply(`❌ Bir Kullanıcı İsmi Girmelisin!`);
  instagram("https://www.instagram.com/" + kullanici).then(data => {
    const biocuk = data.bio.length === 0 ? "Yok" : data.bio;
    const isimcik = data.fullName.length === 0 ? "Yok" : data.fullName;
    var gizlimi;
    var onaylimi;
    if (data.isPrivate === false) gizlimi = "Hayır";
    if (data.isPrivate === true) gizlimi = "Evet";
    if (data.isVerified === false) onaylimi = "Hayır";
    if (data.isVerified === true) onaylimi = "Evet";
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setThumbnail(`${data.avatarHD}`)
      .addField("🔱 Kullanıcı İsmi: ", `${kullanici}`)
      .addField("👦 Tam İsmi: ", isimcik)
      .addField("👥 Takipçi Sayısı: ", `${data.subscriberCount}`)
      .addField("🔃 Takip Ettiği Kişi Sayısı: ", `${data.subscribtions}`)
      .addField("🏰 Gönderi Sayısı: ", `${data.postCount}`)
      .addField("📑 Kullanıcı Biografisi: ", biocuk)
      .addField("🔐 ID: ", `${data.id}`)
  

      .addField("🎭 Gizli Profil Mi: ", `${gizlimi}`)
      .addField("💯 Onaylı Hesapmı: ", `${onaylimi}`)
      .addField("🌐 Hesabın Linki: ", `${data.profileLink}`)
       .addField("Profil Linki", `${data.avatar}`)
      .setFooter(`İnstagram Bilgi Sistemi`)
      .setTimestamp();

   if (message.channel.send(embed)){
     
   } else message.channel.send('Bir hata oluştı. Kullanıcı adını doğru giriniz.')
  }) 
   }
exports.conf = {
  enabled: true,
  guildOnly: false,
    kategori: 'kullanıcı',
  aliases: ["instagram-bilgi", "instagram-info"],
  permLevel: 0,
  kategori: "kullanıcı"
};
exports.help = {
  name: "instagram",
  description: "Belirlenen Instagram Hesaplarinin bilgilerini verir!",
  usage: "instagram <instagram-ismi>"
};