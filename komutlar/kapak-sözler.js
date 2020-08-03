const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, args) => {
  message.channel.send('Kapak Laf Yükleniyor..').then(message => {
   var espriler = ['Aslında ben seni olduğun gibi kabul ederdim de; sen olmamışsın sıkıntı orada…','Eskiden altını çizdiklerimin şimdi ise üstünü çiziyorum.','Küfür etmeyi bende sevmiyorum ama şerefsizlik yapana teşekkür edemem.','Tabağına yiyebileceğin kadar yemek, hayatına sevebileceğin kadar insan al. İsrafın lüzumu yok.','Matematikte kötüsün ama çıkarlarını hesaplamada çok iyisin.','Sokak lambası gibi olma ey yar kime yandığın belli olsun.','İyileştirir diye medet umduklarımız tekrar tekrar yaralıyor bizi.','Şerefin kadar konuş desem ömür boyu susacak insanlar tanıyorum.','Belki tavırların beni en ağır küfürlere tahrik eder ama benim yüzümdeki o iplemez gülüş senin gelmişini geçmişini tatmin eder.','Sen hayata at gözlükleriyle bakmaya devam edersen, birilerinin çüş demesi zoruna gitmesin.','Şu saatten sonra sende Fırtına kopsa; bende yaprak oynamaz.','Bir zamanlar toz konduramadıklarım, şimdi kirden görünmez olmuş.'];
      var espri = espriler[Math.floor(Math.random() * espriler.length)];
            message.edit(`${espri}`);
   
 });
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kapak', 'kapak-söz', 'laf-çak','kapak-laf','kapak-sözler'],
    kategori: 'eğlence',
  permLevel: 0,
   kategori: "kullanıcı"
};

exports.help = {
  name: 'kapaksöz',
  description: 'Kapak söz atar',
  usage: 'kapak'
};