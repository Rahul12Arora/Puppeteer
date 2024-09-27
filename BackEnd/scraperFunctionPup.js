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

function extractDomainName(url) {
    // Use URL constructor to parse the URL
    const parsedUrl = new URL(url);
    
    // Split the hostname by dots and get the second-to-last part, which is usually the domain name
    const domainParts = parsedUrl.hostname.split('.');
    
    // Return the second-to-last part, assuming standard format like 'www.netflix.com'
    return domainParts.length > 1 ? domainParts[domainParts.length - 2] : null;
}

const overReacted = async (url) => {
    // console.log('url is ',url)

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    try {

        await page.goto(url, { waitUntil: 'networkidle2' });
        const name = extractDomainName(url);
        // console.log('name is ',name)
        // console.log('url is ',url)
        const urlString = url
        const nameString = name
        await page.screenshot({path: `images/${name}.png`})

        const resultFromDoc = await page.evaluate(({urlString,nameString}) => {
            // console.log('urlString is ',urlString)
            // console.log('nameString is ',nameString)
        const getMetaContent = (metaName) => {
            const metaTag = document.querySelector(`meta[name="${metaName}"]`);
            return metaTag ? metaTag.content : null;
        };

        const description = getMetaContent('description') || getMetaContent('og:description') || getMetaContent('twitter:description') || null;

        // Logo selector with additional alternatives
        const logo = document.querySelector(
            'img[src*="logo"], img[alt*="logo"], img[title*="logo"], img[class*="logo"], img[id*="logo"], img[src*="favicon"], link[rel="icon"], link[href*="favicon"], link[href*=".ico"]'
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
        
        const contactElement = Array.from(document.querySelectorAll('span, div, p'))
                .find(el => el.textContent.includes('Questions? Call'));
            
            // Extract contact number from the found element
            const contactNumber = contactElement ? 
                contactElement.querySelector('a')?.innerText : null;

            // Return whichever phone number exists
            const finalPhone = phone || contactNumber || null;


        // Email address selector with expanded criteria
        const email = document.querySelector(
            'a[href^="mailto:"], .email, [itemprop="email"], .contact-info .email, .contact-email, .email-address, .contact-info .mail'
        )?.getAttribute('href') || null;

        let result = {
            name:nameString,
            description,
            logo,
            facebookURLs,
            linkedinURLs,
            twitterURLs,
            instagramURLs,
            address,
            phone:finalPhone,
            email,
            url:urlString
        };

        return result;
        }, {urlString, nameString});

        // console.log(resultFromDoc);
        return resultFromDoc;
    } catch (error) {
        console.error('Error scraping the website:', error);
        return null;
    } finally {
        await browser.close();
    }
};

// Exporting the function
export { overReacted };
