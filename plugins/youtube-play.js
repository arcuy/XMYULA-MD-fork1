import search from 'yt-search';
import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('*example*: .play eula song');
  try {
    let results = await search(text);
    let videoId = results.videos[0].videoId;
    let durasi = results.videos[0].timestamp;
    let thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
    let upload = results.videos[0].ago;
    let views = results.videos[0].views;
    let links = results.videos[0].url;
    let title = results.videos[0].title
    let detik = results.videos[0].seconds


    let infoText = `  ◦ *Duration*: ${durasi}
  ◦ *Upload*: ${upload}
  ◦ *Views*: ${views}
  
YTdl By api.betabotz.eu.org
Search By github.com/talmobi/yt-search
Sent By ${global.info.namebot}`;

    var pesan = conn.sendMessage(m.chat, {
            text: infoText,
            contextInfo: {
                forwardingScore: 9999,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.info.channel,
                   serverMessageId: null,
                   newsletterName: global.info.namechannel,
                   },
                   externalAdReply: {
                   title: "AUDIO SEDANG DI KIRIM",
                   body: `Youtube Play by ${global.info.namebot}`,
                   thumbnailUrl: thumbnailUrl,
                   sourceUrl: links,
                   mediaType: 1,
                   renderLargerThumbnail: true
                   },
                },
            }, {});

    if (detik > 900) return m.reply(`Audio *${durasi}*\n_Tidak dapat mengirim, maksimal durasi 15 Menit`);
    const yt = await( await fetch(`https://api.betabotz.eu.org/api/download/ytmp3?url=${links}&apikey=${lann}`)).json()
    await conn.sendMessage(m.chat, { audio: { url: yt.result.mp4 }, mimetype: 'audio/mpeg' }, { quoted: m });

  } catch (e) {
    console.log(e);
    m.reply(`An error occurred while searching for the song: ${e.message}`);
  }
};

handler.help = ['youtubeplay'].map(v => v + ' name/url');
handler.tags = ['downloader'];
handler.command = /^(ytplay|play|youtubeplay|song|music)$/i;
handler.register = false
handler.premium = false;
handler.limit = true;

export default handler;