const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const voiceChannels = message.guild.channels.filter(c => c.type === "voice");
  let count = 0;
 let üyesayi = message.guild.memberCount;
    let botlar = message.guild.members.filter(m => m.user.bot).size;
    let kullanıcılar = üyesayi - botlar;
  for (const [id, voiceChannel] of voiceChannels)count += voiceChannel.members.size;
   const embed = new Discord.RichEmbed()
   .setAuthor(`${client.user.username} `, client.user.avatarURL)
    .setColor("#810a05")
    .setDescription(`<a:star:711186710964207616> **Sunucuda \`${message.guild.memberCount}\` Kişi Bulunmaktadır!\n <a:star:711186710964207616>** Ses Kanallarında \`${count}\` Kişi Bulunmaktadır!`)
    .addField(`<a:online:711187112959148073> Aktif Üyeler`, `${message.guild.members.filter(o => o.presence.status === 'online').size} `, true)
  .addField(`<:bosta:711187074337996802> Boşta Üyeler`, `${message.guild.members.filter(i => i.presence.status === 'idle').size}`, true)
  .addField(`<:rahatsiz:711187057711513611> Rahatsız Modda Üyeler`, `${message.guild.members.filter(dnd => dnd.presence.status === 'dnd').size}`, true)
  .addField(`<a:aktifdeil:711187137483243599> İnaktif Üyeler`, `${message.guild.members.filter(off => off.presence.status === 'offline').size} `, true)
   .setThumbnail(client.user.avatarURL)

    .setTimestamp();
message.channel.send(embed)
message.react('') 
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["total", "toplamüye", "toplamkişi", "say"],
  permLevel: 0,
  kategori: "moderasyon"
};

exports.help = {
  name: "say",
  description: "Sunucudakileri sayar ",
  usage: "say"
};
