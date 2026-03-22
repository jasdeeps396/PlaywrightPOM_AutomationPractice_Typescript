import { expect, Page, Locator } from "@playwright/test";
export class LoginPage {
    page: Page;
    username: Locator;
    password: Locator;
    LoginBtn: Locator;
    incorrectMessage:Locator
    constructor(page: Page) {
        this.page = page
        this.username = page.getByPlaceholder("email@example.com")
        this.password = page.getByPlaceholder("enter your passsword")
        this.LoginBtn = page.getByRole("button", { name: 'Login' })
        this.incorrectMessage= page.getByText(" Incorrect email or password. ")
    }
    async goto() :Promise<void> {
        await this.page.goto("/client")
    }

    async validLogin(username: string, password: string) :Promise <void> {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.LoginBtn.click()
    }

    async verifyIncorrectCredentialsMessage(): Promise <void>
    {
        await expect(this.incorrectMessage).toBeVisible()
    }





}
