import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login-page";
import { DashboardPage } from "./pages/dashboard-page";
import { BillsPage } from "./pages/bills-page";
import { CreateBillPage } from "./pages/createBill-page";
import { FakeDataGenerator } from "./testData";
import { APIHelper } from "./apiHelper";

const test_username = `${process.env.TEST_USERNAME}`;
const test_password = `${process.env.TEST_PASSWORD}`;
const baseUrlApi = `${process.env.BASE_URL_API}`;



test.describe("Frontend test", () => {
  test("TC01: heading must be visible", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(test_username, test_password);
  
    await expect(
      page.getByRole("heading", { name: "Tester Hotel Overview" })
    ).toBeVisible();
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.performLogout();
    await expect(dashboardPage.pageHeading).not.toBeVisible();
  });

  test("TC02: Bill creation and validation", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin(test_username, test_password);
    const dashboardPage = new DashboardPage(page);
    const billsPage = new BillsPage(page);
    const createBillPage = new CreateBillPage(page);

    await dashboardPage.gotoBillsView();
    await billsPage.gotoCreateBill();

    const randomCreateBill = await createBillPage.createBill();
    const billRow = page.locator(`text=${randomCreateBill}`);
    await expect(billRow).toBeVisible();
    await dashboardPage.performLogout();
    await expect(dashboardPage.pageHeading).not.toBeVisible();

  });

});

test.describe.serial('Backend test', () => {
  let apiHelper: APIHelper;
  let fakeDataGenerator: FakeDataGenerator;


  test.beforeAll('login, get access token', async ({ request }) => {
      apiHelper = new APIHelper(baseUrlApi);
      fakeDataGenerator = new FakeDataGenerator();
      const login = await apiHelper.login(request);
      expect(login.status()).toBe(200);
  });


  test('Test Case 01 - Get all clients', async ({ request }) => {
      const getAllClients = await apiHelper.getAllClients(request);
      expect(getAllClients.status()).toBe(200);

      const responseBody = await getAllClients.json();
      expect(responseBody).toBeTruthy(); 
      expect(Array.isArray(responseBody)).toBeTruthy();
      
      responseBody.forEach(client => {
          expect(client).toHaveProperty('id');
          expect(client).toHaveProperty('name');
      });
  
   
  });

  test('Test Case 02 - Create new client', async ({ request }) => {
      const payload = fakeDataGenerator.generateClientData();
      const createClient = await apiHelper.createClient(request, payload);
      expect(createClient.ok()).toBeTruthy();
      expect(await createClient.json()).toMatchObject(payload);

      const getClients = await apiHelper.getAllClients(request);
      expect(await getClients.json()).toEqual(
          expect.arrayContaining([
              expect.objectContaining(payload),
          ])
      );
  });  

});
