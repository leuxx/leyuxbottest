const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

const kanal = await db.fetch(`istekkanal_${message.guild.id}`)
if(!kanal) return message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')
    .setTitle('hata')
    .setDescription(`\n\nİstek kanalı ayarlanmamış`))
 let kanall = client.channels.find(c => c.id === kanal)

const kullanım = args[0]
if(!kullanım) return message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')
    .setTitle(':x: Hata :x:')
    .setDescription(`\n\n**Kullanım:** \`${ayarlar.prefix}istek\` örn:rufflys ban yesin.`))

const istek = args.slice(0).join(' ')
if(!istek) return message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')
    .setTitle(':x: Hata :x:')
    .setDescription('Bir istek belirtmedin ?'))

message.delete()
message.channel.send(
    new Discord.RichEmbed()
    .setColor('RED')
    .setTitle(':white_check_mark: Başarılı :white_check_mark:')
    .setDescription('İsteğin başarıyla gönderildi!'))


   let embed = new Discord.RichEmbed()
    .setColor('GREEN')
    .setTitle('Yeni Bir İstek!')
    .setAuthor(message.guild.name, client.user.avatarURL)
    .setThumbnail(message.author.avatarURL)
      .addField('Gönderen', `**${message.author.tag}**`)
      .addField('İstek', istek)
    .setFooter(`${message.author.username} Tarafından Gönderildi`, message.author.avatarURL, `${message.author.Date} Kanalında kullanıldı.`)
    .setTimestamp()
    kanall.send(embed).then(i => i.react("✅").then (a => i.react("❎")))

}
exports.conf = {
	enabled : true,
	guildOnly : false,
	aliases : ['istek'],
	permLevel : 0,
  kategori: "kullanıcı"
}
exports.help = {
	name : 'istek',
	description : 'İstek Sistemi',
	usage : 'istek'
}