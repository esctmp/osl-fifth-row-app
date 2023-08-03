import { Builder, By, Key, until } from 'selenium-webdriver';
import dummyEPF from '../assets/dummyEPF.json';

const url = "http://localhost:3001";
const excoUser = {
    email: "testfre@club.sutd.edu.sg",
    password: "P@ssword1!"
};

// Use cases:
// 2) Login (Fifth Row EXCO)
// 9) Submit Forms (Fifth Row EXCOs)
// 8) Approve Forms (OSL)
test("System - Fifth Row Submit And OSL Approve", async () => {
    // 1. Fifth Row user logins
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    await driver.executeScript('alert("Focus window")')
        .then(() => driver.switchTo().alert().accept());
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
    try {
        await driver.wait(until.elementLocated(By.xpath('//label[@for="welcome"]')), 1000);
        // await driver.executeScript("document.querySelector('.MuiDrawer-paper').focus()");
        // // await driver.wait(until.elementIsEnabled('//span[contains(text(),"Create New EPF")]/./../..', 1000));
        let navButton = await driver.findElement(By.xpath('//span[contains(text(),"Create New EPF")]/./../..'));
        await driver.actions().move({ origin: navButton }).click().perform();
    } catch { // click on button to open navbar
        await driver.wait(until.elementLocated(By.xpath('//label[@for="welcome"]')), 1000);
        await driver.findElement(By.xpath('//*[@data-testid="MenuOutlinedIcon"]/./..'))
            .click();
        let navBar = await driver.findElement(By.css('.MuiDrawer-root'));
        await driver.wait(until.elementIsVisible(navBar), 500);
        let navButton = await driver.findElement(By.xpath('//span[contains(text(),"Create New EPF")]/./../..'));
        await navButton.click();
    }

    // 3. Fifth Row user fills in form
    await driver.wait(until.elementLocated(By.xpath('//*[contains(text(),"Event Proposal Form")]')), 5000);
    let data = { // compulsory form fields
        "a_name": "user 1",
        "a_student_id": 1000001,
        "a_organisation": "organisation 1",
        "a_contact_number": 99998888,
        "a_email": "user_1@mymail.sutd.edu.sg",
        "b_event_name": "event 2",
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
        .sendKeys('20230821', Key.TAB, '1600PM')
    data = { // compulsory table fields
        "c1_date": "08/20/2023",
        "c1_time": "14:00",
        "c1_activity_and_description": "do sth",
        "c1_venue": "LT1",
        "c2_date": "08/21/2023",
        "c2_time": "16:00",
        "c2_activity_and_description": "actual event stuff",
        "c2_venue": "LT1",
        "c3_date": "08/21/2023",
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
    await driver.findElement(By.xpath('//*[contains(text(),"Table D.1.1")]/following::div[1]//button[@id="add-row"]'))
        .click();
    await driver.wait(until.elementLocated(By.xpath(`//*[contains(@id,"${Object.entries(newRow)[0][0]}")]`)), 5000);
    for (let key in Object.keys(newRow)) {
        await driver.findElement(By.xpath(`//*[contains(@id,"${newRow[key]}")]`))
            .sendKeys(newRow[key], Key.RETURN)
    };

    // 4. Fifth Row user submits form
    await driver.findElement(By.xpath('//button[contains(text(),"Submit")]'))
        .click();
    await driver.wait(until.alertIsPresent, 3000);
    let alert = await driver.switchTo().alert();
    expect(alert.getText()).toBe("Form uploaded successfully!");
    alert.accept();

    // 5. OSL user logins

    // 6. OSL user navigates to View Form Archive

    // 7. OSL user clicks on newly submitted form

    // 8. OSL user approves form

    // 9. Fifth Row user refreshes page

    // 10. Fifth Row user navigates to View Form Archive


}, 2 * 60 * 1000); // timeout is 2 min