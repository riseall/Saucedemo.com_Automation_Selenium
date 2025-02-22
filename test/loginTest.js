const { Builder } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const data = require("../fixtures/dataFile.json");

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
      await loginPage.open(data.baseUrl);
    });

    it("LG-001_Login Success", async function () {
      await loginPage.login(data.validUser.username, data.validUser.password);

      // assertion
      await inventoryPage.verifyTitleText(
        data.message.expectedTitle,
        data.message.title
      );

      console.log(data.log.loginSuccess);
    });

    it("LG-002_Login Failed With Empty username", async function () {
      await loginPage.login(data.invalidUser.username, data.validUser.password);

      //assertion
      await loginPage.verifyLoginFailed(
        data.message.expectedLoginError,
        data.message.loginError
      );

      console.log(data.log.loginFailed);
    });

    afterEach(async () => {
      await driver.quit();
    });
  });
}

sauceDemoLoginTest();
