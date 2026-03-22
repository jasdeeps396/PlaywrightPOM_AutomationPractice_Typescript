import { expect, Page, Locator } from "@playwright/test";

export class CheckoutPage {
    page: Page
    checkoutInformationPage: Locator;
    cvvCodeTextbox: Locator;
    cardHolderNameTextbox: Locator;
    selectCountryLocator: Locator;
    countryResultsLocator: Locator;
    placeOrderButton: Locator;
    orderIdLocator: Locator;

    constructor(page: Page) {
        this.page = page;

        this.checkoutInformationPage = page.locator("text='Personal Information '")
        this.cvvCodeTextbox = page.locator("//div[text()='CVV Code ']/..//input")
        this.cardHolderNameTextbox = page.locator("//div[text()='Name on Card ']/..//input")
        this.selectCountryLocator = page.getByPlaceholder("Select Country");
        this.countryResultsLocator = page.locator(".ta-results")
        this.placeOrderButton = page.getByText("Place Order")
        this.orderIdLocator = page.locator(".em-spacer-1 .ng-star-inserted")


    }

    // checkout page loaded successfully

    async verifyCheckoutPageLoadedSuccessfully() :Promise <void> {
        await expect(this.checkoutInformationPage).toBeVisible()
    }

    // Fill payment details

    async fillPaymentDetails(cvvCode :string, cardHolderName:string) :Promise <void> {
        await this.cvvCodeTextbox.fill(cvvCode)
        await this.cardHolderNameTextbox.fill(cardHolderName)
    }

    async selectCountryCheckoutPage(pressCountryName:string, selectCountryName:string) :Promise <void>  {
        await this.selectCountryLocator.pressSequentially(pressCountryName);
        await this.countryResultsLocator.getByRole('button').getByText(selectCountryName).nth(1).click()
    }

    async clickOnPlaceOrderButton()  :Promise <void> {
        await this.placeOrderButton.click()

    }
    async getOrderIdOfProduct() :Promise <string> {
        
       const orderIdText =await this.orderIdLocator.textContent()
       if(!orderIdText) throw new Error ('Order ID not found')
        return (orderIdText).split(" ")[2]
    }

    async verifyOrderConfirmationMessage(message:string) :Promise <void> {
        await expect(this.page.getByText(message)).toBeVisible()
    }


}
