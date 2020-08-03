const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {


if(!message.member.roles.has("724365505976336394")) return message.channel.send(`Bu komutu kullanabilmek için \`Yetkili olmanız lazım\` yetkisine sahip olmasınız.`);
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.send('Kullanıcıyı etiketlemeyi unuttun kanka.')
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  let knd = args.slice(1).join(' ');
      let embed2 = new Discord.RichEmbed()
    .setColor('RED')
  .addField(`Süreli olarak uzaklaştırıldın`, `Daha fazla bilgi için:Yetkililerle iletişime geç`)
  //.setThumbnail("")
     .setImage('https://media.giphy.com/media/P2xf5nPyu5WP6/giphy.gif')
     .setDescription(`Yasaklı rolü verildi!\n**Rolü alan kişi:** ${kullanıcı}\n**Sonuç:**${knd}\nYasaklı  rolü veren yetkili : ${message.author.username}`) 
  let embed = new Discord.RichEmbed()
  .setColor(0x000000)
  //.setThumbnail("")
  .setImage('https://media.giphy.com/media/P2xf5nPyu5WP6/giphy.gif')
  .setDescription(`Yasaklı rolü verildi!\n**Rolü alan kişi:** ${kullanıcı}\n**Sonuç:**${knd}\nYasaklı Yasaklı rolü veren yetkili : ${message.author.username}`) 
    member.removeRoles(member.roles);
   setTimeout(async function() {
             member.addRole(member.guild.roles.find(pudochu => pudochu.id === '715325504487686212')).then(() => {
              client.channels.get("715325507117514875").send(embed)
              member.send(embed2)
              })
            }, 5000);
  return 
 
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yasaklırolver','hapiseyolla'],
  kategori: "",
  permLevel: 0
}

exports.help = {
  name: 'yasaklı',
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: 'kayıt isim yaş'
}