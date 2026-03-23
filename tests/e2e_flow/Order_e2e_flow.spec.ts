import { test, expect } from '@playwright/test'
import { App } from '../../pages/App'
import {users} from '../../test-data/users'
import productData from '../../test-data/productData.json';


 

const userName:string = users.validUser1.username;
const password:string = users.validUser1.password;
const productName:string = productData.productName;
console.log(userName,"------",password,"---------",productName,"--------",productData.cvv,"-------",productData.fullName)
// test.describe.configure({mode:'serial'})
// {

test('@webtest verify that user is able to place order successfully', async ({ page }) => {

    const app = new App(page);

    await app.loginPage.goto();
    await app.loginPage.loginFunction(userName, password);

    await app.dashboardPage.verifyDashboardLoadedSuccessfully();
    await app.dashboardPage.clickOnAddToCartOfSpecificProduct(productName);
    await app.dashboardPage.verifyProductAddToCartMessage();

    await app.dashboardPage.clickOnHeaderButton('Cart');

    const cartProduct = await app.cartPage.verifyThatProductDisplayedInCartPage();
    expect(cartProduct).toContain(productName);

    await app.cartPage.clickOnCheckoutButton();
    await app.checkoutPage.verifyCheckoutPageLoadedSuccessfully();
    await app.checkoutPage.fillPaymentDetails(productData.cvv, productData.fullName);
    await app.checkoutPage.selectCountryCheckoutPage('ind', 'India');
    await app.checkoutPage.clickOnPlaceOrderButton();

    const orderId = await app.checkoutPage.getOrderIdOfProduct();

    await app.checkoutPage.verifyOrderConfirmationMessage('Thankyou for the order. ');
    await app.dashboardPage.clickOnHeaderButton('ORDERS');
    await app.orderPage.clickOnViewButtonWithOrderid(orderId);
    await app.orderPage.verifyOrderDetails(orderId);
});






