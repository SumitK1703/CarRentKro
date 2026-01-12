// import ImageKit from 'imagekit'; 
// import fs from 'fs';

// const imagekit = new ImageKit({
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
// });
// const response = await imagekit.files.upload({
//   file: fs.createReadStream('path/to/file'),
//   fileName: 'file-name.jpg',
// });

// console.log(response);
// export default imagekit;


import _ImageKit from '@imagekit/nodejs';
import 'dotenv/config';

// 🛡️ Safe Import: Handle both CommonJS and ES Module exports
const ImageKit = _ImageKit.default || _ImageKit;

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default imagekit;