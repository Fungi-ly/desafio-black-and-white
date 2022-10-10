const http = require('http')
const fs = require('fs')
const url = require('url')
const imageProcessor = require('./imageprocessor')

const port = 8080

http
	.createServer((req, res) => {
		const urlParse = url.parse(req.url, true)
		if (urlParse.pathname === '/') {
			res.writeHead(200, { 'Content-Type': 'text/html' })
			fs.readFile('index.html', 'utf8', (err, html) => {
				if (err) res.end('html file not found')
				else res.end(html)
			})
		}
		if (urlParse.pathname === '/style') {
			res.writeHead(200, { 'Content-Type': 'text/css' })
			fs.readFile('style.css', (err, css) => {
				if(err) res.end('css file not found')
				else res.end(css)
			})
		}
		if (urlParse.pathname.includes('/img')) {
			const file = urlParse.query.file
			if (file) imageProcessor(file, res)
			else res.end('Please enter an image url to convert')
		}
	})
	.listen(port, () => console.log(`Server running on port ${port}`))
