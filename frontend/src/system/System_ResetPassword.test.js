// import { test } from 'node:test';
import { Builder, By, Key, until } from 'selenium-webdriver';

const url = "http://localhost:3001";
const excoUser = {
    email: "testfre@club.sutd.edu.sg",
    password: "P@ssword1!"
};
const verificationCode = "246810"

test("System - Reset Password", async () => {
    // 1. User navigates to Reset Password
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    await driver.executeScript('alert("Focus window")')
        .then(() => driver.switchTo().alert().accept());
    try { 
        await driver.get(url);
        await driver.wait(until.elementLocated(By.xpath('//a[contains(text(),"Forget Password")]')), 10000);
        await driver.findElement(By.xpath('//a[contains(text(),"Forget Password")]')).click();
    } catch {
        throw new Error("Forgot Password failed");  
    }

    // 2. Fifth Row user fills in form and submits
    console.log("BUG")
    await driver.wait(until.elementLocated(By.id('email')), 5000);
    console.log("BUGGGGG")
    let data = { // compulsory form fields
        "email": "testfre@club.sutd.edu.sg",
    }
    // for (let key of Object.keys(data)) {
    //     await driver.findElement(By.id('email')).sendKeys(data[key]);
    // }
    await driver.findElement(By.id('email')).sendKeys(data.email, Key.RETURN);
    await driver.findElement(By.xpath('//button[contains(text(),"Send")]')).click();

    // 3. User receives verification code

    // 4. User keys in new passcode and clicks reset password
}, 5 * 60 * 1000);  