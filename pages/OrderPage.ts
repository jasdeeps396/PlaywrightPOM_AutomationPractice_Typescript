import { expect , Page, Locator } from "@playwright/test";

export class OrderPage {
    page:Page;
    orderList: Locator;
    orderSummeryMessage: Locator;
    orderIdFromOrderSummaryPage: Locator;
    constructor(page :Page) {
        this.page = page
        this.orderList = page.locator('.table tbody tr');
        this.orderSummeryMessage = page.locator('text= order summary ')
        this.orderIdFromOrderSummaryPage = page.locator('.col-md-6 .col-text');
    }

    async clickOnViewButtonWithOrderid(orderId:string)  :Promise <void> {
        const filteredRow = this.orderList.filter({ has: this.page.locator('th', { hasText: orderId }) }).first();
        await expect(filteredRow).toBeVisible()
        await filteredRow.getByRole('button', { name: 'View' }).click();
    }

    async verifyOrderDetails(orderId:string) :Promise <void> {
        await this.orderSummeryMessage.waitFor()
        await expect(this.orderSummeryMessage).toBeVisible();
        console.log('✅ Order Summary page is visible.');
        expect(await this.orderIdFromOrderSummaryPage.textContent()).toBe(orderId)
        await expect( this.orderIdFromOrderSummaryPage).toBeVisible()
        console.log('✅ Order IDs match successfully.');
    }

}