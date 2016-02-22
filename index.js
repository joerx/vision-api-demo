'use strict'

let request = require('request')
let assert = require('assert')
let fs = require('fs')

assert(process.env.GOOGLE_API_KEY, 'GOOGLE_API_KEY must be set')
assert(process.argv.length >= 3, 'usage: node index.js imgfile.jpg')

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const IMG_FILE = process.argv[2]

// img to base64
let bits = fs.readFileSync(IMG_FILE)
let imgData = new Buffer(bits).toString('base64')

let payload = {
  requests: {
    image: {
      content: imgData,
    }, 
    features: [
      {
        type: 'LABEL_DETECTION',
        maxResults: 10
      }
    ]
  }
}

request.post({
  url: `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`,
  method: 'post',
  json: true,
  body: payload
}, (err, res) => {
  if (err) throw err
  else {
    console.info('ok')
    console.info(JSON.stringify(res.body, null, 2))
  }
})

console.log('request underway...')
