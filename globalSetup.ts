import { FullConfig } from '@playwright/test';
import dotenv from 'dotenv';

async function globalSetup(config: FullConfig) {
    const currentEpochTime = Math.round((new Date()).getTime() / 1000).toString();
    process.env.UNIQUEKEY = currentEpochTime;
    if (process.env.TEST_ENV) {
        dotenv.config({
            path: `./env/.env.${process.env.TEST_ENV}`,
            override: true
        })
    } else {
        dotenv.config({
            path: `./env/.env.dev`,
            override: true
        })
    }
}

export default globalSetup;
