import { LoginPage } from "./LoginPage"
import { DashboardPage } from './DashboardPage'
import { CartPage } from './CartPage'
import { OrderPage } from './OrderPage'
import { CheckoutPage } from './CheckoutPage'
import { Page } from "@playwright/test"
 
export class App

{

 page:Page;
 loginPage:LoginPage;
 dashboardPage:DashboardPage;
 cartPage:CartPage;
 orderPage:OrderPage;
 checkoutPage:CheckoutPage;
 
    constructor(page:Page)
{   this.page=page
    this.loginPage =new LoginPage(page)
    this.dashboardPage=new DashboardPage(page)
    this.cartPage=new CartPage(page)
    this.orderPage=new OrderPage(page)
    this.checkoutPage=new CheckoutPage(page)
}
}

