const Cloudant = require('cloudant')

const username = process.env.CLOUDANT_USERNAME
const password = process.env.CLOUDANT_PASSWORD

module.exports = function(message, cb){
  Cloudant({account: username, password: password}, (error, cloudant) => {
    if (error) {
      return console.log('Failed to initialize Cloudant: ' + error.message)
    }
    const db = cloudant.db.use('bugbot')
    const time = new Date().toISOString()
    db.insert({message}, time, (err, body, header) => {
      if(err){
        cb(err, null)
      }else{
        cb(null, message)
      }
    })
  })
}
