const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const { verify } = require("crypto");

async function sauceDemoLoginTest() {
  describe("Saucedemo Login Test", function () {
    let driver;
    let browserName = "chrome";
    let loginPage;
    let inventoryPage;

    beforeEach(async () => {
      this.timeout(30000);
      //Script Login Success
      //let options = new chrome.Options();
      //options.addArguments("--headless=new");

      // membuat koneksi dengan webdriver
      driver = await new Builder().forBrowser(browserName).build();
      loginPage = new LoginPage(driver);
      inventoryPage = new InventoryPage(driver);

      // Open Url
      await loginPage.open("https://www.saucedemo.com");
    });

    it("LG-001_Login Success", async function () {
      await loginPage.login("standard_user", "secret_sauce");

      // assertion
      await inventoryPage.verifyTitleText(
        "Swag Labs",
        "Title does not include Swag Labs"
      );

      console.log("Login Testing Successfully");
    });

    it("LG-002_Login Failed With Empty username", async function () {
      await loginPage.login("", "secret_sauce");

      //assertion
      await loginPage.verifyLoginFailed(
        "Epic sadface: Username is required",
        "Message does not include 'Epic sadface: Username is required'"
      );

      console.log("Failed Login Testing Successfully");
    });

    afterEach(async () => {
      await driver.quit();
    });
  });
}

sauceDemoLoginTest();
