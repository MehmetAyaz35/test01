import { expect, type Locator, type Page } from "@playwright/test";
import { faker, Faker, th } from '@faker-js/faker';


export class CreateBillPage {
  readonly page: Page;
  readonly pageHeading: Locator;
  readonly billValueTextField: Locator;
  readonly billPaidCheckBox: Locator;
  readonly save: Locator;
  readonly backButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.getByText('New Bill');
    this.billValueTextField = page.getByRole('spinbutton');
    this.billPaidCheckBox = page.locator('.checkbox');
    this.save = page.getByText('Save');
    this.backButton = page.getByRole('link', { name: 'Back' });   
  }


  async createBill(){   

    const randomAmount = faker.number.int({ min: 100, max: 10000 }); 
    await this.billValueTextField.fill(randomAmount.toString());  // Since the fill() method expects string data, I convert the generated integer to a string.

    await this.save.click();
    return randomAmount;

  
  }

}