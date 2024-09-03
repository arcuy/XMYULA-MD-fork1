import axios from 'axios';

const handler = async (m, { conn, command, usedPrefix, args, text }) => {
  if (!text) return m.reply(`Masukan prompt`)
   try {
    const post = await videofakepost(text)
    if (post.status === true){
    
    let { status, message, result } = post;
       if (!status) {
         return m.reply(message)
       }
    let { id, status: stat } = result
        m.reply(`${stat}, please wait for >= 1 minutes\n\nid: ${id}`);
    
      while (true) {
        const check = await videofakeget(id);

        if (check.result.status && check.result.status === 'pending') {
          await new Promise(resolve => setTimeout(resolve, 5000)); // Jeda 5 detik sebelum cek lagi

        } else if (check.result.status && check.result.status === 'done') {
          
          let cap = `\`SENDING VIDEO\`\n\n`
              + `*Status:* Success\n`
              + `*VideoId:* ${check.result.id}\n`
              + `*Prompt:* ${text}\n`
              + `*Music:* ${check.result.meta.music}\n`
              + `*Voice:* ${check.result.meta.video_voice}\n`
              + `*Content:* ${check.result.meta.content}`
          let maximus = await conn.sendFile(m.chat, check.result.meta.thumbnail_url, null, cap, m)
          await new Promise(resolve => setTimeout(resolve, 5000)); // Jeda 5 detik 
          await conn.sendMessage(m.chat, { video: { url: check.result.video_url }, caption: wm }, { quoted: maximus })

          break; // Menghentikan loop

        } else {
          m.reply('Terjadi kesalahan saat memproses.');
          break; // Menghentikan loop
        }
      }
    }
  } catch (error) {
    console.error(error);
    m.reply('Terjadi kesalahan saat memproses. Silakan coba lagi nanti.');
  }
};

handler.command = handler.help = ['createvideo'];
handler.tags = ['ai'];

export default handler;

async function videofakepost(prompt){
	const data = {
		'prompt': prompt,
		'duration': '25'
	}
	try {
    const res = await axios.post("https://api.itsrose.rest/deep_fake/video_fake", data, {
    headers: { Authorization: `${global.rose}` }
    }).catch((e) => e?.response);
		return res.data
	} catch (err) {
		return err
	}
}


async function videofakeget(id){
	try {
    const res = await axios.get(`https://api.itsrose.rest/deep_fake/video_fake?id=${id}`, { headers: { Authorization: `${global.rose}` }});
		return res.data
	} catch (err) {
		return err
	}
}