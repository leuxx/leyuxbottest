const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
 
var prefix = ayarlar.prefix;
 
exports.run = async(client, message, args) => {
      const seviye = new Discord.RichEmbed()
 
                .setColor('#fff000')
                .setAuthor(`Seviye  Komutları`, client.user.avatarURL)
                .setThumbnail(client.user.avatarURL)
                .addField(`Komutlar`, `<a:yldz:735248836062085120>${prefix}**seviye-ayarlar**: Seviye ayarları açar. \n <a:yldz:735248836062085120>${prefix}**seviye-açt**: seviye sistemini açar.\n <a:yldz:735248836062085120>${prefix}**seviye-kapat**:Seviye Sistemini Kapatır.\n <a:yldz:735248836062085120>${prefix}**seviye-log**: Seviye log kanalını belirler.\n <a:yldz:735248836062085120>${prefix}**seviye-rol**:  seviye karlığında verilcek rol.\n <a:yldz:735248836062085120>${prefix}**seviye-xp**: Kelime başına verilcek xpyi ayarlar.\n <a:yldz:735248836062085120>${prefix}**seviye**: Seviyenizi gösterir.`)
                .addField(`Linkler`, `[Sunucumuz](https://discord.gg/mhQ3Z4) [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=733681099280089138&scope=bot&permissions=8)`)
                .setImage("https://im7.ezgif.com/tmp/ezgif-7-926b5dad1090.gif")
                .setFooter(`Created by ! Baran#0001`, message.author.avatarURL)
              
            message.channel.send(seviye);
}
  
 
exports.conf = {
        enabled : true,
        guildOnly : false,
        aliases : ['yardım-seviye'],
        permLevel : 0
}

exports.help = {
        name : 'yardim-seviye',
        description : 'Komut kategorilerini atar',
        usage : '!yardım'
}