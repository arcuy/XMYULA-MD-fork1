import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args
}) => {
    if (!args[0]) throw "*example*: .yta https://youtube.com/watch?v=S5QnWDmRocU"
    
    try {
        m.reply(wait)
        let beta = await( await fetch(`https://api.betabotz.eu.org/api/download/ytmp3?url=${args[0]}&apikey=${lann}`)).json()
                let doc = {
                     audio: {
                        url: beta.result.mp3
                     },
                     mimetype: "audio/mpeg",
                     fileName: beta.result.title,
                     contextInfo: {
                  forwardingScore: 1,
                  isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.info.channel,
                   serverMessageId: null,
                   newsletterName: global.info.namechannel,
                   },
                   externalAdReply: {
                       showAdAttribution: true,
                       mediaType: 2,
                       mediaUrl: args[0],
                       title: beta.result.title,
                       body: wm,
                       sourceUrl: args[0],
                       thumbnailUrl: beta.result.thumb,
                       renderLargerThumbnail: true
                }
            }
        }

        await conn.sendMessage(m.chat, doc, {
            quoted: m
        })
        await conn.sendMessage(m.chat, {
                document: { url: beta.result.mp3 }, 
                mimetype: 'audio/mpeg', 
                fileName: `${beta.result.title}.mp3`,
                caption: ''
                }, {quoted: m})
        } catch (e) {
            console.log(e)
            await m.reply(global.eror)
        }
}
handler.tags = ['downloader']
handler.help = ['ytmp3 <url>']
handler.command = /^(yt(a(udio)?|mp3))$/i

handler.exp = 0
handler.register = false
handler.limit = true

export default handler;