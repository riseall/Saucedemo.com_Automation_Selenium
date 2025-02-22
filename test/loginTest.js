const { Builder } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const data = require("../fixtures/dataFile.json");
const fs = require("fs");
const path = require("path");

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

    afterEach(async function () {
      const screenshotDir = path.join(__dirname, "../screenshots");
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
      }

      // Gunakan nama test case untuk screenshot
      const testCaseName = this.currentTest.title.replace(/\s+/g, "_"); // Ganti spasi dengan underscore

      // Simpan screenshot baru dengan nama test case
      const image = await driver.takeScreenshot();
      fs.writeFileSync(
        path.join(screenshotDir, `${testCaseName}_new.png`),
        image,
        "base64"
      );
      await driver.quit();
    });
  });
}

sauceDemoLoginTest();
