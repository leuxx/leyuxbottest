const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
 
var prefix = ayarlar.prefix;
 
exports.run = async(client, message, args) => {
    const mod = new Discord.RichEmbed()
 
                .setColor('#fff000')
                .setAuthor(`Moderasyon  Komutları`, client.user.avatarURL)
                .setThumbnail(client.user.avatarURL)
                .addField(`Komutlar`, `<a:yldz:735248836062085120>${prefix}**giriş-çıkış-ayarla**: Giriş Çıkış Kanalını Ayarlar. \n <a:yldz:735248836062085120>${prefix}**giriş-çıkış-kapat**:Giriş Çıkışı Kapatır.\n <a:yldz:735248836062085120>${prefix}**istek-kanal**: istek kanal ayarlar.  \n <a:yldz:735248836062085120>${prefix}**jail**:  Belirtiğiniz kişiyi hapise yollar!  \n <a:yldz:735248836062085120>${prefix}**kanalkilitle** : Belirli sürede kanal kilitler   \n <a:yldz:735248836062085120>${prefix}**kayıt**: Kayıt Eder  \n <a:yldz:735248836062085120>${prefix}**kanalaç**: Kişiye özel kanal açar.  \n <a:yldz:735248836062085120>${prefix}**küfür-ayarla**: Küfür korumasını açar.  \n <a:yldz:735248836062085120>${prefix}**modlogayarla**: Log kanalını ayarlar\n <a:yldz:735248836062085120>${prefix}**modlog-sıfırla**: Log kanalını sıfırlar\n <a:yldz:735248836062085120>${prefix}**otorol**: Sunucuya girenlere otomatik rol verir\n <a:yldz:735248836062085120>${prefix}**ototag**: Sunucuya girenlere otomatik tag verir\n <a:yldz:735248836062085120>${prefix}**ototagkanal**: ototag kanalını belirler\n <a:yldz:735248836062085120>${prefix}**ototagkapat**: ototag log kanalını kapatır\n <a:yldz:735248836062085120>${prefix}**renk-değiştir**: Rolün rengini değiştirir\n <a:yldz:735248836062085120>${prefix}**roller**: Sunucuda ki rolleri gösterir\n <a:yldz:735248836062085120>${prefix}**say**: Sunucuda sayım yapar\n <a:yldz:735248836062085120>${prefix}**sayaç-ayarla**: Sunucunuz için sayaç ayarlarsınız.\n <a:yldz:735248836062085120>${prefix}**sayaç-sıfırla**: Sayaç ayarlamasını siler\n <a:yldz:735248836062085120>${prefix}**sesli-ayarla**: Sesliyi doldurunca rol verir\n <a:yldz:735248836062085120>${prefix}**sesli-rol**: Sesliyi süren dolunca rol verir\n <a:yldz:735248836062085120>${prefix}**backup**: Sunucuyu yedekler\n <a:yldz:735248836062085120>${prefix}**temizle**: Belirtiğiniz mesaj kadar mesaj siler\n <a:yldz:735248836062085120>${prefix}**yasaklı-tag**: Yasaklanan tagdan biri gelince kickler\n <a:yldz:735248836062085120>${prefix}**yetkililer**: Yetkilileri gösterir \n <a:yldz:735248836062085120>${prefix}**çekilişyap**: çekiliş yapar.`)
                .addField(`Linkler`, `[Sunucumuz](https://discord.gg/mhQ3Z4) [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=733681099280089138&scope=bot&permissions=8)`)
                .setImage("https://im7.ezgif.com/tmp/ezgif-7-926b5dad1090.gif")
                .setFooter(`Created by ! Baran#0001`, message.author.avatarURL)
                            
              
            message.channel.send(mod);
}
  
 
exports.conf = {
        enabled : true,
        guildOnly : false,
        aliases : ['yardım-mod'],
        permLevel : 0
}

exports.help = {
        name : 'yardim-mod',
        description : 'Komut kategorilerini atar',
        usage : '!yardım'
}