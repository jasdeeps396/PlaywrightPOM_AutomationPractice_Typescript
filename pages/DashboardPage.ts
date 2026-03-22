import { expect, Page, Locator } from "@playwright/test";

export class DashboardPage {

    page: Page
    products: Locator;
    productAddedToCartMessage: Locator;
    headerButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.products = page.locator('.card-body');
        this.productAddedToCartMessage = page.locator("text='Product Added To Cart'")
        this.headerButton = page.getByRole('listitem')
    }


    async waitForProducts()  :Promise <void>{
        await this.products.last().waitFor()
    }

    async verifyDashboardLoadedSuccessfully()  :Promise <void> {
        await expect(this.products.last()).toBeVisible()
    }

    async clickOnAddToCartOfSpecificProduct(productName: string)  :Promise <void> {
        await this.products.filter({ hasText: productName }).getByRole('button', { name: ' Add To Cart' }).click()
    }
    async verifyProductAddToCartMessage()  :Promise <void> {
        await this.productAddedToCartMessage.waitFor()
        await expect(this.productAddedToCartMessage).toBeVisible()
        await this.productAddedToCartMessage.waitFor({ state: 'hidden' })
    }
    async clickOnHeaderButton(headerButtonName: string)  :Promise <void> {
        await this.headerButton.getByRole('button', { name: headerButtonName }).click();
    }


}