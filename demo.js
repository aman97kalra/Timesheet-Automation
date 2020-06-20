
const axios = require( 'axios' );
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch( {
        headless: false,
        defaultViewport: null,
        args:[
            '--start-maximized' // you can also use '--start-fullscreen'
        ]
        });    
    const page = await browser.newPage();
    //await page.setViewport({ width: 1366, height: 768});
    await page.goto('https://www.officetimer.com/login/'); 
    try {
        // await page.evaluate( () => {
        //     const emailField = document.querySelector( '#EmailId' ); 
        //     return emailField;
        // });
        //const htmlnew = await page.content();
        await page.type( '#EmailId', 'aman.kalra@avizva.com');  // without await 
        await page.type( '#Password', 'Avizva#123');
        await page.click( '.form__signBtn');
        //await page.waitForNavigation();
        console.log( 'reached Here' );
        //await page.waitForSelector( '.cal-left-arow' );
        await page.waitFor( 20000 );
        //const element  = page.$('.cal-left-arow');
        //console.log( element );
        await page.click( '.cal-left-arow' );
    } catch( e ) {
        console.log( 'error', e );
    }
})();