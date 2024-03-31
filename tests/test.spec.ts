import { test, expect } from '@playwright/test';
import * as path from 'path';
import MyPage from '../model/MyPage';
import ENV from '../env/env';
import { readFile, readFileSync } from 'fs';
import { join } from 'path';

const testData = JSON.parse(readFileSync('data/testdata.json', 'utf-8'));


// test('Chrome Desktop Test page object', async ({ browser }) => {
//     console.log(testData);
//     const width = 1366;
//     const height = 768;

//     const context = await browser.newContext({
//         viewport: { width: width, height: height },
//     });

//     const page = await context.newPage();
//     const myPage = new MyPage(page);

//     // Enable request interception
//     await page.route('**', route => {
//         route.continue();
//     });

//     await page.goto(ENV.EARIN_URL);

//     // Use methods from the page object class
//     await myPage.acceptCookies();

//     // Iterate over the test data
//     for (const data of testData) {
//         // Perform hover and click action based on the test data
//         await myPage.hoverAndClickLink(data.pageName);

//         // Wait for the network request to the specific API endpoint
//         const request = await page.waitForRequest('https://api.segment.io/v1/t');

//         // Get the request body
//         const requestBody = JSON.parse(request.postData() as string);

//         // Assert that the request body contains the expected data
//         expect(requestBody.event).toEqual('User viewed screen');

//         // Get the screenName dynamically based on the pageName from the test data
//         const screenName = data.screenName;

//         // Assert that the request body contains the retrieved screenName
//         expect(requestBody.properties.screenName).toEqual(screenName);

//         await expect(page).toHaveScreenshot();
//     }

//     await context.close();
// });


test('Chrome Desktop Test page object', async ({ browser }) => {
    console.log(testData);

    // Define the dimensions for the desktop viewport
    const desktopViewport = { width: 1366, height: 768 };

    // Launch a new browser context with Chrome and set viewport to desktop dimensions
    const context = await browser.newContext({
        viewport: desktopViewport,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'
    });

    const page = await context.newPage();
    const myPage = new MyPage(page);

    // Enable request interception
    await page.route('**', route => {
        route.continue();
    });

    await page.goto(ENV.EARIN_URL);

    // Use methods from the page object class
    await myPage.acceptCookies();

    // Iterate over the test data
    for (const data of testData) {
        // Perform hover and click action based on the test data
        await myPage.hoverAndClickLink(data.pageName);

        

        // Wait for the network request to the specific API endpoint
        const request = await page.waitForRequest('https://api.segment.io/v1/t');

        // Get the request body
        const requestBody = JSON.parse(request.postData() as string);

        // Assert that the request body contains the expected data
        expect(requestBody.event).toEqual('User viewed screen');

        // Get the screenName dynamically based on the pageName from the test data
        const screenName = data.screenName;

        // Assert that the request body contains the retrieved screenName
        expect(requestBody.properties.screenName).toEqual(screenName);

        await page.evaluate(() => {
            window.scrollTo(0, 0);
          });

        await expect(page).toHaveScreenshot({
            threshold: 40000,
            animations: "disabled"
        });
    }

    await context.close();
});


// Test for Safari mobile
test('Safari Mobile Test page object', async ({ browser }) => {
    console.log(testData);

    // Define the dimensions for the mobile viewport
    const mobileViewport = { width: 375, height: 812 }; // iPhone X dimensions

    // Launch a new browser context with Safari and set viewport to mobile dimensions
    const context = await browser.newContext({
        viewport: mobileViewport,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
    });

    const page = await context.newPage();
    const myPage = new MyPage(page);

    // Enable request interception
    await page.route('**', route => {
        route.continue();
    });

    await page.goto(ENV.EARIN_URL);

    // Use methods from the page object class
    await myPage.acceptCookies();

    // Iterate over the test data
    for (const data of testData) {
        // Perform hover and click action based on the test data
        // Wait for the element to be visible
        await myPage.mobileHamburgerFindAndClick(data.pageName);

        // Wait for the network request to the specific API endpoint
        const request = await page.waitForRequest('https://api.segment.io/v1/t');

        // Get the request body
        const requestBody = JSON.parse(request.postData() as string);

        // Assert that the request body contains the expected data
        expect(requestBody.event).toEqual('User viewed screen');

        // Get the screenName dynamically based on the pageName from the test data
        const screenName = data.screenName;

        // Assert that the request body contains the retrieved screenName
        expect(requestBody.properties.screenName).toEqual(screenName);

        await expect(page).toHaveScreenshot({
            threshold: 40000,
            animations: "disabled"
        });
    }

    await context.close();
});