import { Builder, By, Key, until } from 'selenium-webdriver';

const url = "http://localhost:3001";
const excoUser = {
    email: "testfre@club.sutd.edu.sg",
    password: "P@ssword1!"
};
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
// 2) Login (Fifth Row EXCO)
// 9) Submit Forms (Fifth Row EXCOs)
// 7) Comment on Forms (OSL)
// 8) Approve Forms (OSL)
test("System - Fifth Row Submit, OSL Comment And OSL Approve", async () => {
    // 1. Fifth Row user logins
    await driver.manage().window().maximize();
    await driver.executeScript('alert("Focus window")')
        .then(() => driver.switchTo().alert().accept());
    let curWindow = await driver.getWindowHandle();
    try {
        await driver.get(url);
        await driver.wait(until.elementLocated(By.id('email')), 3000);
        await driver.findElement(By.id('email'))
            .sendKeys(excoUser.email, Key.RETURN);
        await driver.findElement(By.id('password'))
            .sendKeys(excoUser.password, Key.RETURN);
        await driver.findElement(By.xpath('//button[contains(text(),"Log in")]'))
            .click();
    } catch {
        throw new Error("EXCO Login failed");
    }

    // 2. Fifth Row user navigates to Create New Form
    await driver.wait(until.elementLocated(By.xpath('//label[@for="welcome"]')), 3000);
    let navButton = await driver.findElement(By.xpath('//span[contains(text(),"Create New EPF")]/./../..'));
    await driver.actions().move({ origin: navButton }).click().perform();

    // // 3. Fifth Row user fills in form
    let eventName = `Test Event ${(new Date).toISOString()}`;
    await driver.wait(until.elementLocated(By.xpath('//*[contains(text(),"Event Proposal Form")]')), 5000);
    let data = { // compulsory form fields
        "a_name": "user 1",
        "a_student_id": 1000001,
        "a_organisation": "organisation 1",
        "a_contact_number": 99998888,
        "a_email": "user_1@mymail.sutd.edu.sg",
        "b_event_name": eventName,
        "b_target_audience": "target Audience 1",
        "b_expected_turnout": 1,
        "b_event_objective": "event Objective 1",
        "d11_total_revenue": 30.00,
        "d2_total_expenditure": 25.00
    }
    for (let key of Object.keys(data)) {
        await driver.findElement(By.id(key))
            .sendKeys(data[key])
    };
    await driver.findElement(By.id('b_event_schedule')) // custom send keys for event schedule
        .sendKeys('08212023', Key.TAB, '1600PM')
    data = { // compulsory table fields
        "c1_date": "2023-08-21",
        "c1_time": "14:00",
        "c1_activity_and_description": "do sth",
        "c1_venue": "LT1",
        "c2_date": "2023-08-21",
        "c2_time": "16:00",
        "c2_activity_and_description": "actual event stuff",
        "c2_venue": "LT1",
        "c3_date": "2023-08-21",
        "c3_time": "19:00",
        "c3_activity_and_description": "do sth after",
        "c3_venue": "LT1",
        "f_name": "name1",
        "f_student_id": "1006732",
        "f_position": "Treasurer"
    }
    for (let key of Object.keys(data)) {
        await driver.findElement(By.xpath(`//*[contains(@id,"${key}")]`))
            .sendKeys(data[key])
    }
    let newRow = { // add 1 table row
        "d11_items_goods_services": "item 1",
        "d11_price": 5.50,
        "d11_quantity": 24,
        "d11_amount": 132.00,
    };
    let addButton = await driver.findElement(By.xpath('//*[contains(text(),"Table D.1.1")]/following::div[1]//button[@id="d11-add-row"]'));
    await driver.actions().move({ origin: addButton }).click().perform();
    await driver.wait(until.elementLocated(By.xpath(`//*[contains(@id,"${Object.keys(newRow)[0]}")]`)), 5000);
    for (let key of Object.keys(newRow)) {
        await driver.findElement(By.xpath(`//*[contains(@id,"${key}")]`))
            .sendKeys(newRow[key])
    };

    // 4. Fifth Row user submits form
    let submitButton = await driver.findElement(By.xpath('//button[contains(text(),"Submit")]'));
    await driver.actions().move({ origin: submitButton }).click().perform();
    await driver.sleep(2000);
    try {
        await driver.switchTo().alert().accept();
    } catch {
        driver.actions().sendKeys(Key.ENTER);
    }

    // 5. OSL user logins
    try {
        await driver.switchTo().newWindow('tab');
        await driver.wait(
            async () => (await driver.getAllWindowHandles()).length === 2,
            10000
        );
        const windows = await driver.getAllWindowHandles();
        windows.forEach(async handle => {
            if (handle !== curWindow) {
                await driver.switchTo().window(handle); // switch to new tab
            }
        });
        await driver.get(url);
        await driver.wait(until.elementLocated(By.id('email')), 3000);
        await driver.findElement(By.id('email'))
            .sendKeys(oslUser.email, Key.RETURN);
        await driver.findElement(By.id('password'))
            .sendKeys(oslUser.password, Key.RETURN);
        await driver.findElement(By.xpath('//button[contains(text(),"Log in")]'))
            .click();
    } catch {
        throw new Error("OSL Login failed");
    }

    // 6. OSL user navigates to View EPF List
    await driver.wait(until.elementLocated(By.xpath('//label[@for="welcome"]')), 1000);
    let navViewButton = await driver.findElement(By.xpath('//span[contains(text(),"View EPF List")]/./../..'));
    await driver.actions().move({ origin: navViewButton }).click().perform();

    // 7. OSL user clicks on newly submitted form
    let parentXpath = '//*[contains(text(),"Pending Approval")]/following::div[1]';
    await driver.wait(until.elementLocated(By.xpath(parentXpath)), 3000);
    let formArr = await driver.findElements(By.xpath(parentXpath + `//h6[contains(text(),"${eventName}")]/./..`));
    if (formArr.length != 0) {
        await formArr[0].click();
    } else {
        let nextPageButton = await driver.findElement(By.xpath(parentXpath + '//button[2]'));
        while (await driver.wait(until.elementIsEnabled(nextPageButton))) {
            await nextPageButton.click();
            formArr = await driver.findElements(By.xpath(parentXpath + `//h6[contains(text(),"${eventName}")]/./..`));
            if (formArr.length != 0) {
                await formArr[0].click();
                break;
            }
        }
        if (formArr.length == 0) {
            throw new Error("Unable to find submitted EPF");
        }
    }

    // 8. OSL user comment on form
    await driver.wait(until.elementLocated(By.xpath('//*[contains(text(),"Event Proposal Form")]')), 5000);
    await driver.wait(until.elementLocated(By.xpath('//label[@id="b_event_name-label" and @data-shrink="true"]')), 5000);
    data = { // comment fields
        "a_comments_osl": "this is okay",
        "d_comments_osl": "can be clearer"
    }
    for (let key of Object.keys(data)) {
        await driver.findElement(By.id(key))
            .sendKeys(data[key])
    };

    // 9. OSL user approves form
    let approveButton = await driver.findElement(By.xpath('//button[contains(text(),"Approve")]'));
    await driver.actions().move({ origin: approveButton }).click().perform();
    await driver.sleep(2000);
    try {
        await driver.switchTo().alert().accept();
    } catch {
        driver.actions().sendKeys(Key.ENTER);
    }

    // 10. Fifth Row user navigates to View Form Archive
    curWindow = await driver.getWindowHandle();
    const windows = await driver.getAllWindowHandles();
    windows.forEach(async handle => {
        if (handle !== curWindow) {
            await driver.switchTo().window(handle); // switch to original tab
        }
    });
    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"View EPF List")]/./../..')), 1000);
    let navViewButton1 = await driver.findElement(By.xpath('//span[contains(text(),"View EPF List")]/./../..'));
    await driver.actions().move({ origin: navViewButton1 }).click().perform();

    // 11. Fifth Row user checks that submitted form is approved
    parentXpath = '//*[contains(text(),"Archives")]/following::div[1]';
    await driver.wait(until.elementLocated(By.xpath(parentXpath)), 3000);
    formArr = await driver.findElements(By.xpath(parentXpath + `//h6[contains(text(),"${eventName}")]/./..`));
    if (formArr.length != 0) {
        await formArr[0].click();
    } else {
        let nextPageButton = await driver.findElement(By.xpath(parentXpath + '//button[2]'));
        while (await driver.wait(until.elementIsEnabled(nextPageButton))) {
            await nextPageButton.click();
            formArr = await driver.findElements(By.xpath(parentXpath + `//h6[contains(text(),"${eventName}")]/./..`));
            if (formArr.length != 0) {
                break;
            }
        }
        if (formArr.length == 0) {
            throw new Error("Unable to find submitted EPF");
        }
    }
    let status = await driver.findElement(By.xpath(parentXpath + `//h6[contains(text(),"${eventName}")]/./../../following::td[1]//span`)).getText();
    expect(status).toBe("Approved");

}, 5 * 60 * 1000); // timeout is 5 min