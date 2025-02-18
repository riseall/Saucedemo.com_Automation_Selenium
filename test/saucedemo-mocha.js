const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

async function sauceDemoLoginTest() {
  describe("Saucedemo Login Test", function () {
    it("LG-001_Login Success", async function () {
      this.timeout(10000);
      //Script Login Success
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
        // await driver
        //   .findElement(
        //     By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")
        //   )
        //   .click();
        await driver.sleep(1000);

        console.log("Login Testing Successfully");
      } finally {
        await driver.quit();
      }
    });

    it("LG-002_Login Failed With Empty username", async function () {
      this.timeout(20000);
      //Script Login Success
      let options = new chrome.Options();
      options.addArguments("--headless=new");

      let driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

      try {
        await driver.get("https://www.saucedemo.com/");
        await driver.findElement(By.id("user-name")).sendKeys("");
        await driver.findElement(By.css("#password")).sendKeys("secret_sauce");
        await driver.findElement(By.css("input[type='submit']")).click();

        //   assertion
        let title = await driver
          .findElement(
            By.xpath("//div[@class='error-message-container error']")
          )
          .getText();
        assert.strictEqual(
          title.includes("Epic sadface: Username is required"),
          true,
          "Message does not include 'Epic sadface: Username is required'"
        );

        await driver.sleep(1000);

        console.log("Failed Login Testing Successfully");
      } finally {
        await driver.quit();
      }
    });
  });
}

sauceDemoLoginTest();
