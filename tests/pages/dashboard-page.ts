import { expect, type Locator, type Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly pageHeading: Locator;
  readonly roomsViewButton: Locator;
  readonly clientsViewButton: Locator;
  readonly billsViewButton: Locator;
  readonly reservationsViewButton: Locator;
  readonly logoutButton: Locator;

  // I used css selector in places with dynamic content.
  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.getByRole("heading", {
      name: "Tester Hotel Overview",
    });
    this.roomsViewButton = page.locator(
      "#app > div > div > div:nth-child(1) > a"
    );
    this.clientsViewButton = page.locator(
      "#app > div > div > div:nth-child(2) > a"
    );
    this.billsViewButton = page.locator(
      "#app > div > div > div:nth-child(3) > a"
    );
    this.reservationsViewButton = page.locator(
      "#app > div > div > div:nth-child(4) > a"
    );
    this.logoutButton = page.getByRole("button", { name: "Logout" });
  }

  async gotoRoomsView() {
    await this.roomsViewButton.click();
  }

  async gotoClientsView() {
    await this.clientsViewButton.click();
  }

  async gotoBillsView() {
    await this.billsViewButton.click();
  }

  async gotoReservationsView() {
    await this.reservationsViewButton.click();
  }

  async performLogout() {
    await this.logoutButton.click();
  }
}
