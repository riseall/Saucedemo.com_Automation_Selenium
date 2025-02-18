const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

async function example() {
  //Membuat koneksi dengan webdriver
  let driver = await new Builder().forBrowser(Browser.CHROME).build();

  // Exception handling & conclution
  try {
    await driver.get("https://www.tokopedia.com");
    await driver
      .findElement(By.xpath(`//input[@data-unify="Search"]`))
      .sendKeys("Mouse", Key.RETURN);
    await driver
      .findElement(
        By.xpath(
          `//span[contains(.,'OLYPS Mouse Gaming Wireless Bluetooth + 2.4Ghz Rechargeable Battery Type-C Fast')]`
        )
      )
      .click();
    await driver.sleep(5000);
  } finally {
    await driver.quit();
  }
}

example();
