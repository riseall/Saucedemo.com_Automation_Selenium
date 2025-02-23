const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

async function sauceDemoLoginTest() {
  let options = new chrome.Options();
  options.addArguments("--headless=new");

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    await driver.get("https://www.saucedemo.com/");
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.css("#password")).sendKeys("secret_sauce");
    await driver.findElement(By.css("input[type='submit']")).click();

    //   assertion
    let title = await driver
      .findElement(By.xpath("//div[@class='app_logo']"))
      .getText();
    assert.strictEqual(
      title.includes("Swag Labs"),
      true,
      "Title does not include Swag Labs"
    );

    await driver
      .findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']"))
      .click();
    await driver.sleep(5000);

    console.log("Test Pass");
  } finally {
    await driver.quit();
  }
}

sauceDemoLoginTest();
