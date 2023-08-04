// import { test } from 'node:test';
import { Builder, By, Key, until } from 'selenium-webdriver';

const url = "http://localhost:3001";
const excoUser = {
    email: "testfre@club.sutd.edu.sg",
    password: "P@ssword1!"
};
const verificationCode = "246810"
const newPassword = "NewP@ssword1!"

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
    await driver.wait(until.elementLocated(By.id('email')), 5000);
    let data = { // compulsory form fields
        "email": "testfre@club.sutd.edu.sg",
    }
    await driver.findElement(By.id('email')).sendKeys(data.email, Key.RETURN);
    await driver.findElement(By.xpath('//button[contains(text(),"Send")]'))
        .click();

    // 3. User receives verification code
    try {
        const alert = await driver.wait(until.alertIsPresent(), 90 * 100);
        if (alert) {
          const alertText = await alert.getText();
          console.log(`Alert text is ${alertText}`);
          expect(alertText).toBe(`${verificationCode} has been sent`);
          await alert.accept();
        } else {
          throw new Error("Verification code alert not found");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    
    // 4. User keys in verification code and new password
    await driver.wait(until.elementLocated(By.id('code')), 5000);
    let otp = { // compulsory form fields
        "code": `${verificationCode}`,
    }
    await driver.findElement(By.id('code')).sendKeys(otp.code, Key.RETURN);

    await driver.wait(until.elementLocated(By.id('password')), 5000);
    let password = { // compulsory form fields
        "new_password": `${newPassword}`,
    }
    await driver.findElement(By.id('password')).sendKeys(password.new_password, Key.RETURN);


    // 5. User clicks reset password
    await driver.findElement(By.xpath('//button[contains(text(),"Reset Password")]'))
        .click();
}, 5 * 60 * 1000);  