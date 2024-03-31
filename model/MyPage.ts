import { Page } from '@playwright/test';

export default class MyPage {
    private readonly page: Page;
    private readonly cookieAcceptButton: string = "[id='onetrust-accept-btn-handler']";
    private readonly aboutLinkSelector: string = '#more-o-about';

    constructor(page: Page) {
        this.page = page;
    }

    async acceptCookies(): Promise<void> {
        await this.page.click(this.cookieAcceptButton);
    }

    async hoverAndClickLink(linkText: string): Promise<void> {
        // Hover over the "About" link
        const aboutElement = await this.page.$(this.aboutLinkSelector);
        if (aboutElement) {
            await aboutElement.hover();
        }

        // Click on the link with the specified text
        const links = await this.page.$$('a');
        for (const link of links) {
            const textContent = await link.textContent();
            if (textContent && textContent.includes(linkText)) {
                await link.click();
                break;
            }
        }

        // Move the mouse away from the hover position by clicking on another element,
        // for example, the body of the page
        await this.page.click('body');
    }

    
    async mobileHamburgerFindAndClick(linkText: string): Promise<void> {
        // Wait for the navigation toggle button to be visible
        await this.page.waitForSelector('div[data-testid="toggle-nav"]');
        
        // Click on the navigation toggle button
        await this.page.click('div[data-testid="toggle-nav"]');
        
        // Click on the element with the specified class
        await this.page.click('span[data-testid="whoweare-expander"]');
        
        // Find the div with the specified class
        const navHideDiv = await this.page.waitForSelector('div.nav-hide.active');
    
        // Find the link within the div whose data-track attribute contains the link text
        const link = await navHideDiv.$(`a[data-track*="${linkText}"]`);
        
        if (link) {
            // Click on the link
            await link.click();
        } else {
            console.error(`Link with text '${linkText}' not found within the navigation menu.`);
        }
    }
    
}
