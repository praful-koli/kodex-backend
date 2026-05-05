const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: "private_2pr6gkSySPMdEaqNQcs+wnjVw1s=",
});

const uploadImageKit = async (image) => {
  let file = await client.files.upload({
    file: await toFile(Buffer.from(image), "file"),
    fileName: "test",
    folder: "kodex",
  });
  return file.url;
};

module.exports = uploadImageKit;
