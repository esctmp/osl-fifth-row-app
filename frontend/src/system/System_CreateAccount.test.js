import { Builder, By, Key, until } from 'selenium-webdriver';

const url = "http://localhost:3001";
const excoUser = {
    email: "testfre@club.sutd.edu.sg",
    password: "P@ssword1!"
};
const rootUser ={
    email:"testroot@studentgov.sutd.edu.sg",
    password: "P@ssword1!"
}
const oslUser ={
    email:"testosl@sutd.edu.sg",
    password:"P@ssword1!"
}
const newUserFail ={
    name:"junkiat",
    email:"junkiat_lim@mymail.sutd.edu.sg",
    role:"fre",
    password:"abc",
    confirmpassword:"abc"
}
const newUserPass={
    name:"junkiat",
    email:"junkiat_lim@mymail.sutd.edu.sg",
    role:"fre",
    password:"P@ssword1!",
    confirmpassword:"P@ssword1!"
}

test("System - Fifth Row ",async()=>{
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    await driver.executeScript('alert("Focus window")')
        .then(() => driver.switchTo().alert().accept());
    // testing with empty input
    try{
        await driver.get(url);
        await driver.findElement(By.id('email'))
            .sendKeys("", Key.RETURN);
        await driver.findElement(By.id('password'))
        .sendKeys("", Key.RETURN);
        await driver.findElement(By.xpath('//button[contains(text(),"Log in")]'))
        .click();
    }
    catch{
        throw new Error('Login failed');
    }
    // logging in to root account
    try{
        await driver.wait(until.elementLocated(By.xpath('//h2[contains(text(),"Login")]')), 3000);
        await driver.findElement(By.id('email'))
        .sendKeys(rootUser.email, Key.RETURN);
        await driver.findElement(By.id('password'))
        .sendKeys(rootUser.password, Key.RETURN);
        await driver.findElement(By.xpath('//button[contains(text(),"Log in")]'))
        .click();
    }
    catch{
        throw new Error("Login failed");
    }
    //clicking on the sidebar icon to open elements
    try {
        await driver.wait(until.elementLocated(By.xpath('//label[@for="welcome"]')), 3000);
        await driver.findElement(By.xpath('//button[contains(@class,"MuiButton-root")]'))
        .click();
      }
    catch{
        throw new Error("open sidebar elements");
    }
    //selecting the logout button
    try{
        await driver.findElement(By.xpath('//li[contains(text(),"Logout")]')).click();
    }
    catch{
        throw new Error("Log out failed")
    }
    //login to fre account
    try{
        await driver.wait(until.elementLocated(By.xpath('//h2[contains(text(),"Login")]')), 3000);
        await driver.findElement(By.id('email'))
        .sendKeys(excoUser.email, Key.RETURN);
        await driver.findElement(By.id('password'))
        .sendKeys(excoUser.password, Key.RETURN);
        await driver.findElement(By.xpath('//button[contains(text(),"Log in")]'))
        .click();
    }
    catch{
        throw new Error("Log in failed");
    }
    //clicking on the sidebar icon to open elements
    try {
        await driver.wait(until.elementLocated(By.xpath('//label[@for="welcome"]')), 3000);
        await driver.findElement(By.xpath('//button[contains(@class,"MuiButton-root")]'))
        .click();
      }
    catch{
        throw new Error("open sidebar elements");
    }
    //selecting the logout button
    try{
        await driver.findElement(By.xpath('//li[contains(text(),"Logout")]')).click();
    }
    catch{
        throw new Error("Log out failed")
    }
    //login to OSL
    try{
        await driver.wait(until.elementLocated(By.xpath('//h2[contains(text(),"Login")]')), 3000);
        driver.actions().sendKeys(Key.ESCAPE).perform();
        await driver.findElement(By.id('email'))
        .sendKeys(oslUser.email, Key.RETURN);
        await driver.findElement(By.id('password'))
        .sendKeys(oslUser.password, Key.RETURN);
        await driver.findElement(By.xpath('//button[contains(text(),"Log in")]'))
        .click();
    }
    catch{
        throw new Error("Login to OSL failed");
    }
    //clicking on the sidebar icon to open elements
    try {
        await driver.wait(until.elementLocated(By.xpath('//label[@for="welcome"]')), 3000);
        await driver.findElement(By.xpath('//button[contains(@class,"MuiButton-root")]'))
        .click();
      }
    catch{
        throw new Error("open sidebar elements");
    }
    //navigate to create new account
    try{
        await driver.findElement(By.xpath('//li[contains(text(),"Add another account")]'))
        .click();
    }
    catch{
        throw new Error("Failed to access create account page.")
    }
    //Create account fail due to pre-requisites not met
    try{
        await driver.wait(until.elementLocated(By.xpath('//h2[contains(text(),"Create User")]')), 3000);
        await driver.actions().sendKeys(Key.ESCAPE).perform();
        await driver.findElement(By.xpath('//input[contains(@name,"name")]'))
        .click();
        await driver.findElement(By.xpath('//input[contains(@name,"name")]'))
        .sendKeys(newUserFail.name,Key.RETURN);
        await driver.findElement(By.xpath('//input[contains(@name,"email")]'))
        .sendKeys(newUserFail.email,Key.RETURN);
        await driver.findElement(By.xpath('//input[contains(@name,"password")]'))
        .sendKeys(newUserFail.password,Key.RETURN);
        await driver.findElement(By.xpath('//input[contains(@name,"confirmPassword")]'))
        .sendKeys(newUserFail.password,Key.RETURN);
        await driver.findElement(By.xpath('//button[contains(text(),"Create")]')).click();
    }
    catch{
        throw Error("Create account failed");
    }
    //Create account pass
    try{
        const nameInput = await driver.findElement(By.xpath('//input[contains(@name,"name")]'));
        nameInput.clear();
        nameInput.sendKeys(newUserPass.name,Key.RETURN);
        const emailInput = await driver.findElement(By.xpath('//input[contains(@name,"email")]'));
        emailInput.clear();
        emailInput.sendKeys(newUserPass.email,Key.RETURN);
        const passwordInput = await driver.findElement(By.xpath('//input[contains(@name,"password")]'));
        passwordInput.clear()
        passwordInput.sendKeys(newUserPass.password,Key.RETURN);
        const confirmPasswordInput = await driver.findElement(By.xpath('//input[contains(@name,"confirmPassword")]'))
        confirmPasswordInput.clear()
        confirmPasswordInput.sendKeys(newUserPass.password,Key.RETURN);
        await driver.findElement(By.xpath('//button[contains(text(),"Create")]')).click();
    }
    catch{
        throw new Error("New user cannot be created");
    }
    //clicking on the sidebar icon to open elements
    try {
        await driver.findElement(By.xpath('//button[contains(@class,"MuiButton-root")]'))
        .click();
      }
    catch{
        throw new Error("open sidebar elements");
    }
    //selecting the logout button
    try{
        await driver.findElement(By.xpath('//li[contains(text(),"Logout")]')).click();
    }
    catch{
        throw new Error("Log out failed")
    }
    //logging into newly created account
    try{
        await driver.wait(until.elementLocated(By.xpath('//h2[contains(text(),"Login")]')), 3000);
        await driver.findElement(By.id('email'))
        .sendKeys(newUserPass.email, Key.RETURN);
        await driver.findElement(By.id('password'))
        .sendKeys(newUserPass.password, Key.RETURN);
        await driver.findElement(By.xpath('//button[contains(text(),"Log in")]'))
        .click();
    }
    catch{
        throw new Error("Login failed");
    }

},100000)