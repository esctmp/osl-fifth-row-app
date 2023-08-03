const { Builder, By, Key, Until } = require('selenium-webdriver');

const url = "http://localhost:3001";
const excoUser = {
    email: "testfre@club.sutd.edu.sg",
    password: "P@ssword1!"
};

// Use cases:
// 9) Submit Forms (Fifth Row EXCOs)
// 8) Approve Forms (OSL)
test("System - Fifth Row Submit And OSL Approve", async () => {
    // 1. Fifth Row user logins
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(url);
        await driver.findElement(By.id('email'))
                    .sendKeys(excoUser.email, Key.RETURN);
        await driver.findElement(By.id('password'))
                    .sendKeys(excoUser.password, Key.RETURN);
        await driver.findElement(By.xpath('//button[contains(text(),"Log in")]'))
                    .click();
    } catch {
        throw new Error("Login failed");
    }

    // 2. Fifth Row user navigates to Create New Form

    // 3. Fifth Row user fills in form

    // 4. Fifth Row user submits form

    // 5. OSL user logins

    // 6. OSL user navigates to View Form Archive

    // 7. OSL user clicks on newly submitted form

    // 8. OSL user approves form

    // 9. Fifth Row user refreshes page

    // 10. Fifth Row user navigates to View Form Archive


},100000);