import { expect, type Locator, type Page } from '@playwright/test';


export class BillsPage {

    readonly page: Page;
    readonly pageTitle: Locator;
    readonly createBill: Locator;
    readonly billKebabMenuButtons: Locator;
    readonly editBillButton: Locator;
    readonly deleteBillButton: Locator;
    readonly backButton: Locator;


constructor(page: Page){
    this.page = page;
    this.pageTitle = page.getByText('Bills');
    this.createBill = page.getByRole('link', { name: 'Create Bill' });
    this.billKebabMenuButtons = page.getByRole('img');
    this.editBillButton = page.getByText('Edit');
    this.deleteBillButton = page.getByText('Delete');
    this.backButton = page.getByRole('link', { name: 'Back' });
}

async gotoCreateBill(){
    await this.createBill.click();
}

async gotoEditBill(index: number){
    await this.billKebabMenuButtons.nth(index).click();
    await this.editBillButton.click();
}

async deleteBill(index: number){
    await this.billKebabMenuButtons.nth(index).click();
    await this.deleteBillButton.click();
}

async goBackFromBillView(){
    await this.backButton.click();
}
}

