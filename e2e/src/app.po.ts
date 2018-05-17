import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  async getUrl() {
    return await browser.getCurrentUrl();
  }

  clickAddPrinterButton() {
    this.getAddPrinterButton().click();
  }

  getAddPrinterButton() {
    return element(by.css('a.btn-primary'));
  }

  getPrinters() {
    return element(by.css('.list-item'));
  }
}
