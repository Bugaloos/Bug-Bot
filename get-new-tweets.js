module.exports = function (twitterClient, cb){
  twitterClient.get('search/tweets', {count: 1, q:'from:NZcivildefence'}, (err, tweets, res) => {
    if(err){
      cb(err, null)
    }else{
      const message = tweets.statuses[0].text
      cb(null, message)
    }
  })
}
