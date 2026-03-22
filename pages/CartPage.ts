import { expect, Page, Locator } from "@playwright/test";
import { error } from "node:console";

export class CartPage {
    page: Page;
    listCartItems: Locator;
    checkoutButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.listCartItems = page.locator("li div div h3")
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' })


    }

    async verifyThatProductDisplayedInCartPage() :Promise <string> {
        await this.listCartItems.first().waitFor()
        const text = await this.listCartItems.textContent()
        if(!text) throw new Error ('Cart value notCart item text not found')
        return text
    }
    // Proceed to checkout
    async clickOnCheckoutButton() : Promise <void> {
        await this.checkoutButton.click()
    }

}