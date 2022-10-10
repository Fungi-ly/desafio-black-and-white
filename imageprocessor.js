const Jimp = require('jimp')
const fs = require('fs')

const imageProcessor = (file, res) => {
	Jimp.read(file, (jimpError, jimpImage) => {
		jimpImage
			.resize(350, Jimp.AUTO)
			.quality(60)
			.grayscale()
			.writeAsync('newImg.jpg')
			.then(() => {
				fs.readFile('newImg.jpg', (err, image) => {
					res.writeHead(200, { 'Content-Type': 'image/jpeg' })
					res.write(image)
					res.end()
				})
			})
	})
}

module.exports = imageProcessor
