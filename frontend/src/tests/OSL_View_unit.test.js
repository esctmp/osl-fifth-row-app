import { Builder, By, Key, until } from 'selenium-webdriver';

const url = "http://localhost:3001";
const oslUser = {
    email: "testosl@sutd.edu.sg",
    password: "P@ssword1!"
};

var driver = null;
beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
})
afterAll(async () => {
    await driver.quit();
})

// Use cases:
// 4) View Form Archive (FRE)
test("System - Fifth Row Submit And OSL Approve", async () => {
    // 1. FRE logins
    await driver.manage().window().maximize();
    await driver.executeScript('alert("Focus window")')
        .then(() => driver.switchTo().alert().accept());
    try {
        await driver.get(url);
        await driver.wait(until.elementLocated(By.xpath('//label[@for="email"]')), 2000);
        await driver.findElement(By.id('email'))
            .sendKeys(oslUser.email, Key.RETURN);
        await driver.findElement(By.id('password'))
            .sendKeys(oslUser.password, Key.RETURN);
        await driver.findElement(By.xpath('//button[contains(text(),"Log in")]'))
            .click();
    } catch {
        throw new Error("Login failed");
    } 

    // 2. FRE navigates to "View EPF List"
    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"View EPF List")]/./../..')));
    let navButton = await driver.findElement(By.xpath('//span[contains(text(),"View EPF List")]/./../..'));
    await driver.actions().move({ origin: navButton }).click().perform();

    /**
     * TEST BEGINS HERE
     */

    // Test Case 1: Test if user is able to click the sort date arrow
    await driver.wait(until.elementLocated(By.xpath('//*[contains(text(),"Pending Approval")]')), 5000);
    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"▲")]')), 5000);
    let PendingSortButton = await driver.findElement(By.xpath('//span[contains(text(),"▲")]'));
    await driver.actions().move({ origin: PendingSortButton }).click().perform();

    // Test Case 2: Test if user is able to click on the filter by dropdown
    let FilterByButton = await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[6]'));
    await driver.actions().move({ origin: FilterByButton }).click().perform();
    
    // Test Case 3: Test if user is able to click on the "EPF Id" from the dropdown list
    await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-"]/div[3]/ul/li[1]/span')));
    let FilterByEPFButton = await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[1]/span'));
    await driver.actions().move({ origin: FilterByEPFButton }).click().perform();

    // Test Case 4: Test if user is able to click on the "Club" from the dropdown list
    let FilterByButton4Club = await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[6]'));
    await driver.actions().move({ origin: FilterByButton4Club }).click().perform();
    await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-"]/div[3]/ul/li[2]/span')));
    let FilterByClubButton = await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[2]/span'));
    await driver.actions().move({ origin: FilterByClubButton }).click().perform();

    // Test Case 5: Test if user is able to click on the "Name" from the dropdown list
    let FilterByButton4Name = await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[6]'));
    await driver.actions().move({ origin: FilterByButton4Name }).click().perform();
    await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-"]/div[3]/ul/li[2]/span')));
    let FilterByNameButton = await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[2]/span'));
    await driver.actions().move({ origin: FilterByNameButton }).click().perform();

    // Test Case 6: Test if user is able to click on the "Status" from the dropdown list
    let FilterByButton4Status = await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[6]'));
    await driver.actions().move({ origin: FilterByButton4Status }).click().perform();
    await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-"]/div[3]/ul/li[2]/span')));
    let FilterByStatusButton = await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[2]/span'));
    await driver.actions().move({ origin: FilterByStatusButton }).click().perform();

    // FRE enters "end" in the search field
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div/div/div/div/div/div/div/div[2]/input')).sendKeys("e");
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div/div/div/div/div/div/div/div[2]/input')).sendKeys("n");
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div/div/div/div/div/div/div/div[2]/input')).sendKeys("d");

    // // 9.FRE clears (backspace) 2 character from end of the line in the search field
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div/div/div/div/div/div/div/div[2]/input')).sendKeys(Key.BACK_SPACE);
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div/div/div/div/div/div/div/div[2]/input')).sendKeys(Key.BACK_SPACE);

    // // 10. FRE clicks on next page
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div/div/div/div/div/div/table/div/div/div[2]/button[2]')));
    // let NextPageButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div/div/div/div/div/table/div/div/div[2]/button[2]'));
    // await driver.actions().move({ origin: NextPageButton }).click().perform();
    
    // // 11. OSL user clicks on the EPF
    // await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div/div/div/div/div/div/table/tbody/tr[2]/td[3]/a/h6')));
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // let EPFclick = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div/div/div/div/div/table/tbody/tr[2]/td[3]/a/h6'));
    // await driver.actions().move({ origin: EPFclick }).click().perform();

}, 2 * 60 * 1000);
