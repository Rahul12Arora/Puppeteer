// import puppeteer from "puppeteer";

// const url = "https://overreacted.io/"

// const overReacted = async ()=>{
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url);

//     const resultFromDoc = await page.evaluate(()=>{
//         const allArticles = document.querySelectorAll('article');
//         return document.title;
//     })
//     console.log(resultFromDoc)
// }

// export { overReacted }


import puppeteer from "puppeteer";

const overReacted = async (url) => {
    console.log('url is ',url)

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    try {

        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.screenshot('${url}.png')
        const resultFromDoc = await page.evaluate(() => {
            const name = document.title || document.name || null;

        const getMetaContent = (metaName) => {
            const metaTag = document.querySelector(`meta[name="${metaName}"]`);
            return metaTag ? metaTag.content : null;
        };

        const description = getMetaContent('description') || getMetaContent('og:description') || getMetaContent('twitter:description') || null;

        // Logo selector with additional alternatives
        const logo = document.querySelector(
            'img[src*="logo"], img[alt*="logo"], img[title*="logo"], img[class*="logo"], img[id*="logo"], img[src*="favicon"], link[rel="icon"]'
        )?.src || null;

        // Function to get multiple social media URLs
        const getSocialMediaLinks = (selector) => {
            const links = Array.from(document.querySelectorAll(selector)).map(link => link.href);
            return links.length > 0 ? links : null;
        };

        const facebookURLs = getSocialMediaLinks('a[href*="facebook.com"], a[href*="fb.com"], a[href*="facebook"]');
        const linkedinURLs = getSocialMediaLinks('a[href*="linkedin.com"], a[href*="linkd.in"], a[href*="in.linkedin.com"], a[href*="linkedin"]');
        const twitterURLs = getSocialMediaLinks('a[href*="twitter.com"], a[href*="t.co"], a[href*="tw.com"], a[href*="twitter"]');
        const instagramURLs = getSocialMediaLinks('a[href*="instagram.com"], a[href*="instagr.am"], a[href*="ig.me"], a[href*="instagram"]');

        // Address selector with more options
        const address = document.querySelector(
            'address, .address, .location, [itemprop="address"], .company-address, .contact-info .address, .street-address, .postal-address, .address-info'
        )?.innerText || null;

        // Phone number selector with more variations
        const phone = document.querySelector(
            'a[href^="tel:"], .phone, .tel, [itemprop="telephone"], .contact-info .phone, .contact-number, .phone-number, .contact-info .tel'
        )?.innerText || null;

        // Email address selector with expanded criteria
        const email = document.querySelector(
            'a[href^="mailto:"], .email, [itemprop="email"], .contact-info .email, .contact-email, .email-address, .contact-info .mail'
        )?.getAttribute('href') || null;

        const result = {
            name,
            description,
            logo,
            facebookURLs,
            linkedinURLs,
            twitterURLs,
            instagramURLs,
            address,
            phone,
            email,
            // url
        };

        return result;
        });

        console.log(resultFromDoc);
        return resultFromDoc;
    } catch (error) {
        console.error('Error scraping the website:', error);
        return null;
    } finally {
        // await browser.close();
    }
};

// Exporting the function
export { overReacted };
