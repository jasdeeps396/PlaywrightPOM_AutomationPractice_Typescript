import { test, expect } from '@playwright/test'
import { App } from '../../pages/App'
import { users } from '../../test-data/users';





test('verify that user is login', async ({ page }) => {
  
    const app = new App(page)
    await app.loginPage.goto()
    await app.loginPage.loginFunction(users.validUser1.username, users.validUser1.password)
    await app.dashboardPage.verifyDashboardLoadedSuccessfully()
})
test('verify that user should not login with invalid creds', async ({ page }) => {
    
    const app = new App(page)
    await app.loginPage.goto()
    await app.loginPage.loginFunction(users.invalidUser1.username, users.invalidUser1.password)
    await app.loginPage.verifyIncorrectCredentialsMessage()
})