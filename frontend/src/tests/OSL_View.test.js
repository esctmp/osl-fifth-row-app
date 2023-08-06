import { Builder, By, Key, until } from 'selenium-webdriver';

const url = "http://localhost:3001";
const oslUser = {
    email: "testosl@sutd.edu.sg",
    password: "P@ssword1!"
};


//Unit test for Pendings table   
test("Unit Testing for Pending table - Check for components to be functional and clickable", async () => {
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
    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"View EPF List")]/./../..')));
    let navButton = await driver.findElement(By.xpath('//span[contains(text(),"View EPF List")]/./../..'));
    await driver.actions().move({ origin: navButton }).click().perform();

    /**
     * TEST BEGINS HERE
     */

    // Test Case 1: Test if the sort date arrow is present on the page
    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"▲")]')));

    // Test Case 2: Test if user is able to click the sort date arrow
    let PendingSortButton = await driver.findElement(By.xpath('//span[contains(text(),"▲")]'));
    await driver.actions().move({ origin: PendingSortButton }).click().perform();

    // Test Case 3: Test if the filter by dropdown is present on the page
    await driver.wait(until.elementLocated(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[6]')));

    // Test Case 4: Test if user is able to click on the filter by dropdown
    let FilterByButton = await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[6]'));
    await driver.actions().move({ origin: FilterByButton }).click().perform();
    
    // Test Case 5: Test if user is able to click on the "EPF Id" from the dropdown list
    await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-"]/div[3]/ul/li[1]/span')));
    let FilterByEPFButton = await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[1]/span'));
    await driver.actions().move({ origin: FilterByEPFButton }).click().perform();

    // Test Case 6: Test if user is able to click on the "Club" from the dropdown list
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.actions().move({ origin: FilterByButton }).click().perform();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-"]/div[3]/ul/li[2]/span')));
    let FilterByClubButton = await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[2]/span'));
    await driver.actions().move({ origin: FilterByClubButton }).click().perform();

    // Test Case 7: Test if user is able to click on the "Name" from the dropdown list
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.actions().move({ origin: FilterByButton }).click().perform();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-"]/div[3]/ul/li[3]/span')));
    let FilterByNameButton = await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[3]/span'));
    await driver.actions().move({ origin: FilterByNameButton }).click().perform();

    // Test Case 8: Test if user is able to click on the "Status" from the dropdown list
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.actions().move({ origin: FilterByButton }).click().perform();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-"]/div[3]/ul/li[4]/span')));
    let FilterByStatusButton = await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[4]/span'));
    await driver.actions().move({ origin: FilterByStatusButton }).click().perform();

    // Test Case 9: Test if the next page pagination button is present on the page
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div/div[1]/div/div/div/div/table/div/div/div[2]/button[2]')));
    
    // Test Case 10: Test if the next page pagination button is functional (clickable)
    let NextPageButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div[1]/div/div/div/div/table/div/div/div[2]/button[2]'));
    await driver.actions().move({ origin: NextPageButton }).click().perform();

    // Test Case 11: Test if the previous page pagination button is present on the page
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div/div[1]/div/div/div/div/table/div/div/div[2]/button[1]')));

    // Test Case 12: Test if the previous page pagination button is functional (clickable)
    let PreviousPageButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div[1]/div/div/div/div/table/div/div/div[2]/button[1]'));
    await driver.actions().move({ origin: PreviousPageButton }).click().perform();
    
}, 2 * 60 * 1000);




//Unit test for Archives table  
test("Unit Testing for Archives table - Check for components to be functional and clickable", async () => {
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
    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"View EPF List")]/./../..')));
    let navButton = await driver.findElement(By.xpath('//span[contains(text(),"View EPF List")]/./../..'));
    await driver.actions().move({ origin: navButton }).click().perform();

    /**
     * TEST BEGINS HERE
     */

    // Test Case 1: Test if the sort date arrow is present on the page
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div/div[2]/div/div/div/div/table/thead/tr/th[2]/h6/span')));

    // Test Case 2: Test if user is able to click the sort date arrow
    let PendingSortButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div[2]/div/div/div/div/table/thead/tr/th[2]/h6/span'));
    await driver.actions().move({ origin: PendingSortButton }).click().perform();

    // Test Case 3: Test if the filter by dropdown is present on the page
    await driver.wait(until.elementLocated(By.xpath('//*[contains(text(),"Archives")]/following::div[6]')));

    // Test Case 4: Test if user is able to click on the filter by dropdown
    let FilterByButton = await driver.findElement(By.xpath('//*[contains(text(),"Archives")]/following::div[6]'));
    await driver.actions().move({ origin: FilterByButton }).click().perform();
    
    // Test Case 5: Test if user is able to click on the "EPF Id" from the dropdown list
    await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-"]/div[3]/ul/li[1]/span')));
    let FilterByEPFButton = await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[1]/span'));
    await driver.actions().move({ origin: FilterByEPFButton }).click().perform();

    // Test Case 6: Test if user is able to click on the "Club" from the dropdown list
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.actions().move({ origin: FilterByButton }).click().perform();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-"]/div[3]/ul/li[2]/span')));
    let FilterByClubButton = await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[2]/span'));
    await driver.actions().move({ origin: FilterByClubButton }).click().perform();

    // Test Case 7: Test if user is able to click on the "Name" from the dropdown list
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.actions().move({ origin: FilterByButton }).click().perform();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-"]/div[3]/ul/li[3]/span')));
    let FilterByNameButton = await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[3]/span'));
    await driver.actions().move({ origin: FilterByNameButton }).click().perform();

    // Test Case 8: Test if the next page pagination button is present on the page
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div/div[2]/div/div/div/div/table/div/div/div[2]/button[2]')));
    
    // Test Case 9: Test if the next page pagination button is functional (clickable)
    let NextPageButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div[2]/div/div/div/div/table/div/div/div[2]/button[2]'));
    await driver.actions().move({ origin: NextPageButton }).click().perform();

    // Test Case 10: Test if the previous page pagination button is present on the page
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div/div[2]/div/div/div/div/table/div/div/div[2]/button[1]')));

    // Test Case 11: Test if the previous page pagination button is functional (clickable)
    let PreviousPageButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div[2]/div/div/div/div/table/div/div/div[2]/button[1]'));
    await driver.actions().move({ origin: PreviousPageButton }).click().perform();

    
}, 2 * 60 * 1000);
