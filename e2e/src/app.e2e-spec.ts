import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('Printer List', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should contain list items', () => {
    page.navigateTo();
    expect(page.getPrinters()).toBeTruthy();
  });
  
  it('should be able to click "Add Printer" button', async () => {
    page.navigateTo();
    page.clickAddPrinterButton()
    expect(await page.getUrl()).toBe('http://localhost:4201/edit');
  });
});
