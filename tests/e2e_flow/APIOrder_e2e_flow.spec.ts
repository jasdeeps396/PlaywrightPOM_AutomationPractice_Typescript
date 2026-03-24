import { test, expect,request } from '@playwright/test'
import { App } from '../../pages/App'
import {users} from '../../test-data/users'
import productData from '../../test-data/productData.json';
import { APIUtils } from "../../utils/APIUtils";


 

const userName:string = users.validUser1.username;
const password:string = users.validUser1.password;
const productName:string = productData.productName;
type LoginData ={userEmail:string;userPassword:string}
const loginData :LoginData ={userEmail:userName,userPassword:password}
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5" }] }

console.log(userName,"------",password,"---------",productName,"--------",productData.cvv,"-------",productData.fullName)


test('@APIOrder verify that user is able to place order With API request successfully', async ({ page , browserName}) => {

    const app = new App(page);
    console.log("-------------------------------------------------------------")
    console.log("Launching ",browserName, " browser")
    console.log("-------------------------------------------------------------")
    const apiContext = await request.newContext()
    const apiUtils= await new APIUtils(apiContext,loginData)
    const token = await apiUtils.getToken()
    const orderId = await apiUtils.createOrder(orderPayLoad,token)
    
    await page.addInitScript(
        value=> {
            window.localStorage.setItem('token',value)
        }
        ,
        token

    )
    await app.loginPage.goto();
    await app.dashboardPage.verifyDashboardLoadedSuccessfully();
    await app.dashboardPage.clickOnHeaderButton('ORDERS');
    await app.orderPage.clickOnViewButtonWithOrderid(orderId);
    await app.orderPage.verifyOrderDetails(orderId);
});






