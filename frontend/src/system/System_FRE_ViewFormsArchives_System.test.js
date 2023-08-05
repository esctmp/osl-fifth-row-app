import { Builder, By, Key, until } from 'selenium-webdriver';

const url = "http://localhost:3001";
const oslUser = {
    email: "testfre@club.sutd.edu.sg",
    password: "P@ssword1!"
};

// Use cases:
// 4) View Form Archive (FRE)
test("System - Fifth Row Submit And OSL Approve", async () => {
    // 1. FRE logins
    let driver = await new Builder().forBrowser('chrome').build();
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"View EPF List")]/./../..')));
    let navButton = await driver.findElement(By.xpath('//span[contains(text(),"View EPF List")]/./../..'));
    await driver.actions().move({ origin: navButton }).click().perform();

    // 3. FRE click on the Date Sort Arrow
    await new Promise(resolve => setTimeout(resolve,2000));
    await driver.wait(until.elementLocated(By.xpath('//*[contains(text(),"Archives")]')), 5000);
    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"▲")]')), 5000);
    let PendingSortButton = await driver.findElement(By.xpath('//span[contains(text(),"▲")]'));
    await driver.actions().move({ origin: PendingSortButton }).click().perform();


    // 4. FRE type in "7" in the search
    await new Promise(resolve => setTimeout(resolve, 3000));
    await driver.findElement(By.xpath('//*[contains(text(),"Archives")]/following::div[1]//input[@placeholder="Search by EPF ID"]')).sendKeys("7");

    
    
    // 5. FRE clears the search field
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.findElement(By.xpath('//*[contains(text(),"Archives")]/following::div[1]//input[@placeholder="Search by EPF ID"]')).sendKeys(Key.BACK_SPACE);

    // 6. FRE clicks filter by button
    await new Promise(resolve => setTimeout(resolve, 3000));
    let FilterByButton = await driver.findElement(By.xpath('//*[contains(text(),"Archives")]/following::div[6]'));
    await driver.actions().move({ origin: FilterByButton }).click().perform();


    // 7. FRE clicks on Name
    await new Promise(resolve => setTimeout(resolve, 4000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-"]/div[3]/ul/li[2]/span')));
    let FilterByNameButton = await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[2]/span'));
    await driver.actions().move({ origin: FilterByNameButton }).click().perform();


    // 8. FRE enters "alr" in the search field
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div/div/div/div/div/div/div/div[2]/input')).sendKeys("a");
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div/div/div/div/div/div/div/div[2]/input')).sendKeys("l");
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div/div/div/div/div/div/div/div[2]/input')).sendKeys("r");

    // 9.FRE clears (backspace) 2 character from end of the line in the search field
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div/div/div/div/div/div/div/div[2]/input')).sendKeys(Key.BACK_SPACE);
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div/div/div/div/div/div/div/div[2]/input')).sendKeys(Key.BACK_SPACE);

    // 10. FRE clicks on next page
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div/div/div/div/div/div/table/div/div/div[2]/button[2]')));
    let NextPageButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div/div/div/div/div/table/div/div/div[2]/button[2]'));
    await driver.actions().move({ origin: NextPageButton }).click().perform();
    
    // 11. FRE clicks on the EPF
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div/div/div/div/div/div/table/tbody/tr[2]/td[3]/a/h6')));
    await new Promise(resolve => setTimeout(resolve, 2000));
    let EPFclick = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div/div/div/div/div/table/tbody/tr[2]/td[3]/a/h6'));
    await driver.actions().move({ origin: EPFclick }).click().perform();

}, 2 * 60 * 1000);