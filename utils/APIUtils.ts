import { Page, APIRequestContext } from "@playwright/test"


export class APIUtils {

    apiContext: APIRequestContext
    loginData: any



    constructor(apiContext: APIRequestContext, loginData: any) {
        this.apiContext = apiContext;
        this.loginData = loginData;
    }

    async getToken() {
        console.log("🔐 [API] Logging in user...");
        const loginResponse = await this.apiContext.post("/api/ecom/auth/login",

            {
                data: this.loginData
            }
        )
        const loginResponseJson = await loginResponse.json()
        const token = await loginResponseJson.token;
        console.log("✅ [API] Token received");
        return token



    }
    async createOrder(orderPayLoad: any, token: string) {
        console.log("🛒 [API] Creating order...");

        const createOrderResponse = await this.apiContext.post("/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers:
                {
                    'Authorization': token,
                    'Content-type': "application/json"
                }

            }
        )
        const createOrderResponseJson = await createOrderResponse.json()

        const orderId = createOrderResponseJson.orders[0]
        console.log(`✅ [API] Order created: ${orderId}`);
        return orderId
    }


}
