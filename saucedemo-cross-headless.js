const { Builder, By, Key, until, Options } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const edge = require("selenium-webdriver/edge");

async function sauceDemoLoginTest() {
  const browsers = [
    {
      name: "chrome",
      Options: new chrome.Options().addArguments("--headless=new"),
    },
    {
      name: "firefox",
      Options: new firefox.Options().addArguments("--headless"),
    },
    {
      name: "MicrosoftEdge",
      Options: new edge.Options().addArguments("--headless"),
    },
  ];

  for (let browser of browsers) {
    let driver = await new Builder()
      .forBrowser(browser.name)
      .setChromeOptions(browser.name === "chrome" ? browser.Options : undefined)
      .setFirefoxOptions(
        browser.name === "firefox" ? browser.Options : undefined
      )
      .setEdgeOptions(
        browser.name === "MicrosoftEdge" ? browser.Options : undefined
      )
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
        .findElement(
          By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")
        )
        .click();
      await driver.sleep(1000);

      console.log("Testing Success with browser : " + browser.name);
    } finally {
      await driver.quit();
    }
  }
}

sauceDemoLoginTest();
