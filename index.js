
const puppeteer = require('puppeteer');
 
const classnamesArray = [ 'trowclsTsddlClient0', 'trowclsTsddlProject0', 'trowclsTsddlTask0', 'trowclsTsddlWorkType0'];
const valuesArray = [ 'Welldyne', 'PPM', 'Project Work', 'Work From Home'];

(async () => {
    const browser = await puppeteer.launch( {
        headless: false,
        defaultViewport: null,
        args:[
            //'--window-size=1920,1080',
            '--start-maximized' // you can also use '--start-fullscreen'
        ]
        });    
    const page = await browser.newPage();
    //await page.setViewport({ width: 1920, height: 1080});
    await page.goto('https://www.officetimer.com/login/'); 
    await page.setDefaultNavigationTimeout();

    try {
        await page.type( '#EmailId', 'Enter your email id');
        await page.type( '#Password', 'Enter your password');
        await page.click( '.form__signBtn');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log( 'Page loaded !' );
        await page.waitFor( 10000 );    // wait for 10s so that in case of slow network speed script does not break.
        //await page.waitForSelector( '.cal-left-arow' ); // idk why this doesn't work so we resort to page.waitFor() ^
        await page.click( '.cal-left-arow' );

        await page.waitFor( 10000 );    // wait for 10s after arrow click as the page refreshes after arrow click.

        // function to fill various details about the Project in Input Field
        const selectFields = async( index ) => {

            let button = await page.$(`div[data-row-val=${classnamesArray[ index ]}] button`);  //Using 'page.$' is the puppeteer equivalent of 'querySelector'
            console.log( 'button', button );
            if(button) {
                console.log( 'button found' );
                button.click();     // after button click the input field gets visible
            }
            inputField = await page.$(".bs-searchbox input");
            await page.waitFor( 500 );  // wait for 500ms after the inputField is clicked otherwise you won't be able to write complete text
            await inputField.type( valuesArray[ index ] );
            await page.keyboard.press('Enter'); // Enter Key
        }
        
        
        //Enter the project details
        for( i=0;i<4;i++ ){
            selectFields( i );
            await page.waitFor( 2000 );
        }

        // Enter number of hours from Monday to Friday
        numberOfHoursContainer = await page.$$("div[data-row-val='trowrest-columns0'] input");  // Using 'page.$$' is the puppeteer equivalent of 'querySelectorAll'
        for( i=0;i<5;i++){
            console.log( `Day ${i}`, numberOfHoursContainer[i] );
            await page.waitFor( 500 );
            await numberOfHoursContainer[i].click();
            await page.waitFor( 500 );
            await numberOfHoursContainer[i].type( '8' );
            await page.waitFor( 500 );
            await page.keyboard.press('Tab'); // Tab Key
            await page.waitFor( 500 );
        }
        
        // click on submit button
        await page.click( "#btnSubmitTS" );

        console.log( 'Timesheet Submitted !' );

        
    } catch( e ) {
        console.log( 'error', e );
    }
})();