const request = require('superagent')
const twitterClient = require('./twitter-client')
const getNewTweets = require('./get-new-tweets')
const postTweet = require('./post-tweet')

var mostRecentTweet = ''

function bot(){
  getNewTweets(twitterClient, (err, message) => {
    if(err) console.log(err)
    if(message === mostRecentTweet){
      return
    }
    postTweet(message, (error, res) => {
      if(error) console.log(error)
      console.log('most recent tweet: ', res)
      mostRecentTweet = res
    })
  })
}


setInterval(bot, 6000)
