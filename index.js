const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { writeFile } = require('fs/promises');

async function getMetadata() {
  try {
    const metadata = await sharp("img/sammy.png").metadata();
    console.log(metadata);
  } catch (error) {
    console.log(`An error occurred during processing: ${error}`);
  }
}
async function convertFormat() {
  try {
    await sharp("img/sammy.png")
      .toFormat("jpeg", { mozjpeg: false, quality: 30 })
      .toFile("img/samm-convert-format.jpeg");
  } catch (error) {
    console.log(error);
  }
}

async function resizeImage() {
  try {
    let resizeParam = {
      width: 150,
      height: 97
    }
    await sharp("img/sammy.png")
      .resize(resizeParam)
      // .resize(20)
      .toFile("img/sammy-resized.png");
  } catch (error) {
    console.log(error);
  }
}

const semiTransparentRedPng = async () => {
  try {
    const rs = await sharp({
      create: {
        width: 48,
        height: 48,
        channels: 4,
        background: { r: 255, g: 0, b: 0, alpha: 0.5 }
      }
    })
      .png()
      .toBuffer(async (err, data, info) => {
        let savePath = path.join('img/transparent.png');
        await writeFile(savePath, data)
      });
  } catch (error) {
    console.log(error);
  }
}
const run = async () => {
    getMetadata();
    convertFormat();
    resizeImage();
    semiTransparentRedPng();
}

run();