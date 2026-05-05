const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_URL  ,
});

const uploadImageKit = async (image) => {
  let file = await client.files.upload({
    file: await toFile(Buffer.from(image), "file"),
    fileName: "test",
    folder: "kodex",
  });
  return file.url;
};
process.env.IMAGEKIT_URL
module.exports = uploadImageKit;
