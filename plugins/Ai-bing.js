import { rose as api } from '../lib/roseGet.js';
import uploadFile from '../lib/uploadFile.js';

const handler = async (m, { conn, usedPrefix, command, text: prompt }) => {
    if (!prompt) {
         return m.reply("Enter text");
                }

                let init_image = null;
                const q = m.quoted ? m.quoted : m;
                const mimeType = q.mtype || "";

                if (/webp|image|video|webm/g.test(mimeType)) {
                        const media = await q.download();
                        const buffer = Buffer.isBuffer(media) ? media : Buffer.from(media, "utf-8");
                        init_image = await uploadFile(buffer);
                }

                const { data } = await api.post("https://api.itsrose.rest/chatGPT/bing_chat", {
                        prompt,
                        ...(init_image && { init_image }),
                        time_zone: "Asia/Jakarta",
                        tone: "Balanced",
                        strip_markdown: false,
                });

                const { status, message, result } = data;

                if (!status) {
                        return m.reply(message);
                }

                const {
                        sources,
                        message: { content },
                        invocation,
                } = result;

                await conn.sendMessage(m.chat, {
                text: content,
                contextInfo: {
                    externalAdReply: {
                        title: "Saya bing",
                        body: wm,
                        thumbnailUrl: "https://telegra.ph/file/23fc2d78d324b11a9be9b.jpg",
                        sourceUrl: "",
                        mediaType: 1,
                        showAdAttribution: false,
                        renderLargerThumbnail: true
                    }
                }
            }, {quoted: m})

                if (invocation?.type === "image") {
                        try {
                                for (const url of invocation.images) {
                                        await conn.sendMessage(
                                                m.chat,
                                                {
                                                        image: {
                                                                url,
                                                        },
                                                },
                                                { quoted: m }
                                        );
                                }
         } catch (e) {
		console.log(e)
	  }
   }
};

handler.help = ['bingai <Hallo Bing>'];
handler.tags = ['ai', 'premium'];
handler.command =  /^(bing|bingai)$/i
handler.limit = false;
handler.register = false;
handler.premium = true;

export default handler;