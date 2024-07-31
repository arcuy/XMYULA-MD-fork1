import search from 'yt-search';
import api from 'btch-downloader';

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('*example*: .play eula song');
  try {
    let results = await search(text);
    let videoId = results.videos[0].videoId;
    let durasi = results.videos[0].timestamp;
    let thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    let upload = results.videos[0].ago;
    let views = results.videos[0].views;
    let links = results.videos[0].url;
    let title = results.videos[0].title
    let detik = results.videos[0].seconds


    let infoText = `  ◦ *Duration*: ${durasi}
  ◦ *Upload*: ${upload}
  ◦ *Views*: ${views}
  
YTdl By https://www.npmjs.com/package/btch-downloader
Search By https://github.com/talmobi/yt-search
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
                   body: `Youtube Play by Assisten ${global.info.namebot}`,
                   thumbnailUrl: thumbnailUrl,
                   sourceUrl: links,
                   mediaType: 1,
                   renderLargerThumbnail: true
                   },
                },
            }, {});

    if (detik > 900) return m.reply(`Audio *${durasi}*\n_Tidak dapat mengirim, maksimal durasi 15 Menit`);
    const yt = await api.youtube(links)
    const link = yt.mp3
    conn.sendMessage(m.chat, { audio: { url: link }, mimetype: 'audio/mpeg' }, { quoted: m });

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