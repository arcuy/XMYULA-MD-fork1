import axios from 'axios';
import uploadFile from '../lib/uploadFile.js';
import fetch from 'node-fetch';

const handler = async (m, {
	conn,
	text,
	usedPrefix,
	command
}) => {
	let q = m.quoted ? m.quoted : m;
	let mime = (q.msg || q).mimetype || q.mediaType || '';
	if (/^image/.test(mime) && !/webp/.test(mime)) {
		let media = await q.download();
		let url = await uploadFile(media);

		const payload = {
			expand_ratio: text ? text : '200',
			init_image: url
		};
		try {
			const {
				data
			} = await axios.post("https://api.itsrose.rest/image/outpainting", payload, {
				headers: {
					Authorization: `${global.rose}`
				}
			}).catch((e) => e?.response);

			const {
				status,
				result
			} = data;

			if (!status) {
				console.log(status);
				m.reply('Hanya tersedia: [ 110, 125, 150, 200, 300 ]')
			} else {
				const {
					percent,
					image
				} = result;

				let medata = `*Percent*: ${percent}`;
				await conn.sendMessage(m.chat, {
					image: {
						url: image
					},
					caption: medata
				}, {
					mention: m
				});
			}
		} catch (e) {
			console.log(e)
			m.reply(eror)
		}
	} else {
		m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau reply gambar yang sudah dikirim.`);
	}
};

handler.help = ['outpainting <image & prompt>'];
handler.tags = ['ai'];
handler.command = /^(out(paint|painting))$/i
handler.premium = true;

export default handler