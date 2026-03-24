import { test, expect, request } from '@playwright/test'
import { App } from '../../pages/App'
import { users } from '../../test-data/users'
import productData from '../../test-data/productData.json';
import { APIUtils } from "../../utils/APIUtils";




const userName: string = users.validUser1.username;
const password: string = users.validUser1.password;
const productName: string = productData.productName;
type LoginData = { userEmail: string; userPassword: string }
const loginData: LoginData = { userEmail: userName, userPassword: password }
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5" }] }

console.log(userName, "------", password, "---------", productName, "--------", productData.cvv, "-------", productData.fullName)


test('@APIOrder verify that user is able to place order With API request successfully', async ({ page, browserName }) => {

    const app = new App(page);
    console.log("-------------------------------------------------------------")
    console.log(`🚀 Test started on ${browserName}`);
    console.log("-------------------------------------------------------------")
    const apiContext = await request.newContext()
    const apiUtils = await new APIUtils(apiContext, loginData)
    const token = await apiUtils.getToken()
    const orderId = await apiUtils.createOrder(orderPayLoad, token)

    console.log(`🔑 Injecting token into browser`);

    await page.addInitScript((value: string) => {
        window.localStorage.setItem('token', value);
    }, token);

    console.log(`🌐 Navigating to app`);

    await app.loginPage.goto();

    console.log(`📊 Verifying dashboard`);
    await app.dashboardPage.verifyDashboardLoadedSuccessfully();

    console.log(`📦 Opening orders page`);
    await app.dashboardPage.clickOnHeaderButton('ORDERS');

    console.log(`🔍 Validating order: ${orderId}`);
    await app.orderPage.clickOnViewButtonWithOrderid(orderId);

    await app.orderPage.verifyOrderDetails(orderId);

    console.log(`✅ Test completed successfully`);

});






