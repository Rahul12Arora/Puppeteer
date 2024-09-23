import { overReacted } from "./scraperFunctionPup.js";

const popularUrls = [
    'https://www.google.com/',
    'https://www.facebook.com/',
    'https://www.amazon.com/',
    'https://www.youtube.com/',
    'https://www.wikipedia.org/',
    'https://www.twitter.com/',
    'https://www.instagram.com/',
    'https://www.linkedin.com/',
    'https://www.netflix.com/',
    'https://www.reddit.com/',
    'https://www.pinterest.com/',
    'https://www.quora.com/',
    'https://www.github.com/',
    'https://www.stackoverflow.com/',
    'https://www.ebay.com/',
    'https://www.airbnb.com/',
    'https://www.salesforce.com/',
    'https://www.tumblr.com/',
    'https://www.spotify.com/',
    'https://www.microsoft.com/',
    'https://www.paypal.com/',
    'https://www.payoneer.com/',
    'https://www.bbc.com/',
    'https://www.cnn.com/',
    'https://www.forbes.com/',
    'https://www.nytimes.com/',
    'https://www.walmart.com/',
    'https://www.reuters.com/',
    'https://www.shopify.com/',
    'https://www.adobe.com/',
    'https://www.yelp.com/',
    'https://www.booking.com/',
    'https://www.alibaba.com/',
    'https://www.chase.com/',
    'https://www.target.com/',
    'https://www.homedepot.com/',
    'https://www.etsy.com/',
    'https://www.gofundme.com/',
    'https://www.zillow.com/',
    'https://www.imdb.com/',
    'https://www.bing.com/'
];

(async function(){
    for(const url of popularUrls)
    {
        await overReacted(url);
    }
})()