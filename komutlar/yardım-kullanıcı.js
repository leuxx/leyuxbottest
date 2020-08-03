const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
 
var prefix = ayarlar.prefix;
 
exports.run = async(client, message, args) => {
   const kul = new Discord.RichEmbed()
 
                .setColor('#fff000')
                .setAuthor(`Kullanıcı Komutları`, client.user.avatarURL)
                .setThumbnail(client.user.avatarURL)
                .addField(`Komutlar`, `<a:yldz:735248836062085120>${prefix}**afk**: Afk olmanızı sağlar \n <a:yldz:735248836062085120>${prefix}**avatar**: Belirtilen Kişinin veya Komutu Yazan Kişinin Avatarını Atar. \n <a:yldz:735248836062085120>${prefix}**döviz**: Güncel Döviz Kurlarını Gösterir  \n <a:yldz:735248836062085120>${prefix}**gifara**: Mesajınızla ilgili gifleri arar.  \n <a:yldz:735248836062085120>${prefix}**havadurumu** :Yazılan konumun hava durumu bilgisini gösterir.   \n <a:yldz:735248836062085120>${prefix}**instagram**: Belirlenen Instagram Hesaplarinin bilgilerini verir!  \n <a:yldz:735248836062085120>${prefix}**istek**: İstek Atarsınız  \n <a:yldz:735248836062085120>${prefix}**kapaksöz**: Kapak söz atar  \n <a:yldz:735248836062085120>${prefix}**mcbaşarım**: Minecraft Başarılarınızı gösterir  \n <a:yldz:735248836062085120>${prefix}**ping**: Botun anlık pingini atar \n <a:yldz:735248836062085120>${prefix}**servericon**: Sunucunun profil fotoğrafını atar \n <a:yldz:735248836062085120>${prefix}**seslisürem**:  Ne kadardır sesli odada olduğunuzu söyler \n <a:yldz:735248836062085120>${prefix}**statlarm**: Toplam ne kadar seslide olduğuunuz söyler \n <a:yldz:735248836062085120>${prefix}**spotify**: Spotify dinlediği şarkıyı söyler `)
                .addField(`Linkler`, `[Sunucumuz](https://discord.gg/mhQ3Z4) [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=733681099280089138&scope=bot&permissions=8)`)
                .setImage("https://im7.ezgif.com/tmp/ezgif-7-926b5dad1090.gif")
                .setFooter(`Created by ! Baran#0001`, message.author.avatarURL)
              
            message.channel.send(kul);
}
  
 
exports.conf = {
        enabled : true,
        guildOnly : false,
        aliases : ['yardım-kullanıcı'],
        permLevel : 0
}

exports.help = {
        name : 'yardim-kullanıcı',
        description : 'Komut kategorilerini atar',
        usage : '!yardım'
}
 