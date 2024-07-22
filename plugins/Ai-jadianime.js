import fetch from 'node-fetch';
import uploadImage from '../lib/uploadImage.js';
import axios from 'axios';

let handler = async (m, { conn, args, text, usedPrefix, command, quoted }) => {
  let anime = "anime";
  let list = `*OTHER STYLE*

aether, anime, baby, barbie, beauty, blindbox, block, chocolate, christmas_anime, cyberpunk, ghair, gothic, gtav, halloween, hell, heroes, horror, impasto, jojo, lightning, luminous, old, onepiece, pastel, pokemon, rdr, retro, rickmorty, spirited, statue, surya, synthwave, thunder, wonka, zombie

*example:* ${usedPrefix}${command} gtav`;
  let list2 = `*OTHER STYLE*

makima, angle, color_line, snow_fall, manga, charming, stipple, cg, idol, comic_world, princess, anime25d, realistic, anime, comic, manhwa, manhwa_female, manhwa_male, jewelry, jewelry_sky, basketball, summer, cute_child, makeup_sunny, anime_idol, azure_sky, today,majestic, ftlove, loveft, samyang, student, baby, anime_1, anime_2, anime_3, anime_4, drawing

*example:* ${usedPrefix}${command} makima`;
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';
  if (/^image/.test(mime) && !/webp/.test(mime)) {
  let media = await q.download();
  let url = await uploadImage(media);
 try {
  const payload = {
  init_image: url,
  style: args[0] ? args[0] : 'makima'
};
    m.reply(wait)
    const { data } = await axios.post("https://api.itsrose.rest/image/differentMe", payload, {
    headers: { Authorization: `${global.rose}` }
  }).catch((e) => e?.response);

  const { status, result } = data;
  
  const { images, metadata } = result;
    
    for (const image of images) {
    await conn.sendFile(m.chat, image, 'mm.jpg', `Here your image.\n\n——————————————\n\n${list2}`, m);
}
    } catch (e) {
    console.log(e)
 try {
  const payload = {
  init_image: url,
  style: args[0] ? args[0] : 'anime',
  skin: "default",
  image_num: 1,
  prompt: "smooth, hd, hdr"
};
    const { data } = await axios.post("https://api.itsrose.rest/image/turnMe", payload, {
    headers: { Authorization: `${global.rose}` }
  }).catch((e) => e?.response);

    const { status, result } = data;
  
    const { images, metadata } = result;
    
    for (const image of images) {
    await conn.sendFile(m.chat, image, 'mm.jpg', `Here your image.\n\n——————————————\n\n${list}`, m);
     }
         } catch (e) {
            m.reply(eror)
            console.log(e)
         }
       }
     } else {
    m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau reply gambar yang sudah dikirim.`);
  }
}
handler.help = ['jadianime <style>'];
handler.tags = ['ai']
handler.command = /^(jadianime|toanime)$/i;
handler.register = false
handler.premium = false
handler.limit = true

export default handler