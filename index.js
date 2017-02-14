const request = require('superagent')
const express = require('express')
const twitterClient = require('./twitter-client')
const getNewTweets = require('./get-new-tweets')
const postTweet = require('./post-tweet')

const app = express()

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

app.get('/', function (req, res) {
  res.send('hello world')
})

setInterval(bot, 6000)
app.listen(3000)
