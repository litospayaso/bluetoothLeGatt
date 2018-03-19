"use strict";
const Nightmare = require('nightmare');
const user = 'Rocigaot'
const since = process.argv[process.argv.length-2].replace("--","");
const until = process.argv[process.argv.length-1].replace("--","");

let uri = `https://twitter.com/search?l=&q=from%3A${user}%20since%3A${since}%20until%3A${until}&src=typd&lang=es`;
let nightmare = Nightmare();
let maxScroll = 5
nightmare
    .goto(uri)
    .then(() => {
        return scrollDown();
    });

const scrollDown = () => {
    nightmare
        .wait(2000)
        .evaluate(() => {
            $('html,body').animate({ scrollTop: 999999999 }, 'slow');
        }).then(()=>{
            if (maxScroll === 0) {
                return getAllTweets();
            } else {
                maxScroll -= 1;
                scrollDown();
            }
        })
};

const getAllTweets = ()=>{
    nightmare
        .wait(2000)
        .evaluate(() => {
            return $('[data-tweet-id]').toArray().map(e=>{
                return {
                    id: $(e).attr('data-tweet-id'),
                    url: `twitter.com${$(e).attr('data-permalink-path')}`,
                    text: $(e).find('.tweet-text').text(),
                    date: new Date(+$(e).find('[data-time-ms]').attr('data-time-ms')).toLocaleString(),
                    fav: $(e).find('.ProfileTweet-action--favorite .ProfileTweet-actionCountForPresentation').html(),
                    rt: $(e).find('.ProfileTweet-action--retweet .ProfileTweet-actionCountForPresentation').html()
                }
            })
        }).end().then((tweets)=>{
            for(let i = 0; i < tweets.length; i++)
                console.log(tweets[i]);
        });
}