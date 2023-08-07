import { Builder, By, Key, until } from 'selenium-webdriver';
import axios from 'axios';

const url = "http://localhost:3001";
const oslUser = {
    email: "testosl@club.sutd.edu.sg",
    password: "P@ssword1!"
};


const getRandomPendingEPFId = async () => {
    // get sample EPF id
    let response = await axios.get("https://gqzy046009.execute-api.ap-southeast-1.amazonaws.com/staging/epfs/getEPFs",
    ).then((res) => res, (error) => {
        throw new Error("Cannot get any EPF Id");
    });
    // let api_array= response.data.map(obj => obj?.epf_id);
    let api_array= response.data.filter(obj => obj.status !== "Approved")
    .map(obj => obj?.epf_id);
    let randInt=Math.floor(Math.random() * api_array.length);
    return api_array[randInt];
};


const getValidName = async () => {
    // get sample EPF id
    let response = await axios.get("https://gqzy046009.execute-api.ap-southeast-1.amazonaws.com/staging/epfs/getEPFs",
    ).then((res) => res, (error) => {
        throw new Error("Cannot get any Valid Name");
    });
    // let api_array= response.data.map(obj => obj?.epf_id);
    let api_array= response.data.filter(obj => obj.status !== "Approved")
    .map(obj => obj?.b_event_name);
    let randInt=Math.floor(Math.random() * api_array.length);
    return api_array[randInt];
};

const getinvalidName = async () => {
    return "rj8f3h3if3nfa8ccoowfq09fqjsjoq9w0fh1111"
};

const getValidClub = async () => {
    // get sample EPF id
    let response = await axios.get("https://gqzy046009.execute-api.ap-southeast-1.amazonaws.com/staging/epfs/getEPFs",
    ).then((res) => res, (error) => {
        throw new Error("Cannot get any Valid Club");
    });
    // let api_array= response.data.map(obj => obj?.epf_id);
    let api_array= response.data.filter(obj => obj.status !== "Approved")
    .map(obj => obj?.a_organisation);
    let randInt=Math.floor(Math.random() * api_array.length);
    return api_array[randInt];
};


//Unit test for Pendings table   
test("Unit Testing for Pending table - Check for components to be functional and clickable", async () => {
    // 1. OSL logins
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

    // 2. OSL navigates to "View EPF List"
    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"View EPF List")]/./../..')));
    let navButton = await driver.findElement(By.xpath('//span[contains(text(),"View EPF List")]/./../..'));
    await driver.actions().move({ origin: navButton }).click().perform();

    /**
     * TEST BEGINS HERE
     */

    // Test Case 23: Test if after searching for a valid EPF_Id it will appear on the pending table
    await new Promise(resolve => setTimeout(resolve, 2000));
    let mock_EPF=await getRandomPendingEPFId();
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by EPF ID"]')).sendKeys(mock_EPF);
    
    let parentXpath = '//*[contains(text(),"Pending Approval")]/following::div[1]';
    await driver.wait(until.elementLocated(By.xpath(parentXpath)), 2000);
    let formArr = await driver.findElements(By.xpath(parentXpath + `//td[1]//h6[contains(text(),"${mock_EPF}")]/./..`));
    if (formArr.length <4 && formArr.length>0) {
        //pass
    } else {
        let nextPageButton = await driver.findElement(By.xpath(parentXpath + '//button[2]'));
        while (await driver.wait(until.elementIsEnabled(nextPageButton))) {
            await nextPageButton.click();
            formArr = await driver.findElements(By.xpath(parentXpath + `//td[1]//h6[contains(text(),"${mock_EPF}")]/./..`));
            if (formArr.length != 0) {
                break;
            }
        }
    }

    // Test Case 24: Test if after searching for a invalid EPF_Id (Numeric but not in DB) it will not appear on the pending table
    //Test with a number much larger than Number of EPFs we have
    let mock_invalidEPF="801880281018081";
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by EPF ID"]')).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));;
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by EPF ID"]')).sendKeys(mock_invalidEPF);
    
    let parentXpath24 = '//*[contains(text(),"Pending Approval")]/following::div[1]';
    await driver.wait(until.elementLocated(By.xpath(parentXpath24)), 2000);
    let formArr24 = await driver.findElements(By.xpath(parentXpath24 + `//h6[contains(text(),"${mock_invalidEPF}")]/./..`));
    if (formArr24.length == 0) {
        //pass
    } else {
        throw new Error("Test Case 24 failed");
    }

    // Test Case 25: Test if after searching for a invalid EPF_Id it will not appear on the pending table
    let ALPHA_NUM_EPF="NaN";
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by EPF ID"]')).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));;
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by EPF ID"]')).sendKeys(mock_invalidEPF);
    
    let parentXpath25 = '//*[contains(text(),"Pending Approval")]/following::div[1]';
    await driver.wait(until.elementLocated(By.xpath(parentXpath25)), 2000);
    let formArr25 = await driver.findElements(By.xpath(parentXpath25 + `//h6[contains(text(),"${ALPHA_NUM_EPF}")]/./..`));
    if (formArr25.length == 0) {
        //pass
    } else {
        throw new Error("Test Case 25 failed");
    }

    // Test Case 26: Test if after searching for a valid Club it will appear on the pending table
    //click the filter by club
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by EPF ID"]')).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));;
    await driver.wait(until.elementLocated(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[6]')));
    let FilterByButton = await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[6]'));
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.actions().move({ origin: FilterByButton }).click().perform();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-"]/div[3]/ul/li[2]/span')));
    let FilterByClubButton = await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[2]/span'));
    await driver.actions().move({ origin: FilterByClubButton }).click().perform();

    
    let ValidClub=await getValidClub();
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by Club"]')).sendKeys(ValidClub);
    
    let parentXpath26 = '//*[contains(text(),"Pending Approval")]/following::div[1]';
    await driver.wait(until.elementLocated(By.xpath(parentXpath26)), 2000);
    let formArr26 = await driver.findElements(By.xpath(parentXpath26 + `//td[5]//h6[contains(text(),"${ValidClub}")]/./..`));
    if (formArr26.length !=0) {
        //pass
    } else {
        throw new Error("Test Case 26 failed");
    }

    // Test Case 27: Test if after searching for a invalid club it will not appear on the pending table
    let InvalidClub="9218319";
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by Club"]')).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));;
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by Club"]')).sendKeys(InvalidClub);
    
    let parentXpath27 = '//*[contains(text(),"Pending Approval")]/following::div[1]';
    await driver.wait(until.elementLocated(By.xpath(parentXpath27)), 1000);
    let formArr27 = await driver.findElements(By.xpath(parentXpath27 + `//h6[contains(text(),"${InvalidClub}")]/./..`));
    if (formArr27.length == 0) {
        //pass
    } else {
        throw new Error("Test Case 27 failed");
    }

    // Test Case 28: Test if after searching for a valid Name it will appear on the pending table
    //click the filter by name
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.actions().move({ origin: FilterByButton }).click().perform();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-"]/div[3]/ul/li[3]/span')));
    let FilterByNameButton = await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[3]/span'));
    await driver.actions().move({ origin: FilterByNameButton }).click().perform();

    
    let ValidName=await getValidName();
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by Name"]')).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));;;
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by Name"]')).sendKeys(ValidName);
    
    let parentXpath28 = '//*[contains(text(),"Pending Approval")]/following::div[1]';
    let formArr28 = await driver.findElements(By.xpath(parentXpath28 + `//td[3]//h6[contains(text(),"${ValidName}")]/./..`));
    if (formArr28.length !=0) {
        //pass
    } else {
        throw new Error("Test Case 28 failed");
    }
    


    // Test Case 29: Test if after searching for a invalid name, it will not appear on the pending table
    let InvalidName=getinvalidName();
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by Name"]')).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));;
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by Name"]')).sendKeys(InvalidName);
    
    let parentXpath29 = '//*[contains(text(),"Pending Approval")]/following::div[1]';
    await driver.wait(until.elementLocated(By.xpath(parentXpath29)), 1000);
    let formArr29 = await driver.findElements(By.xpath(parentXpath29 + `//h6[contains(text(),"${InvalidName}")]/./..`));
    if (formArr29.length == 0) {
        //pass
    } else {
        throw new Error("Test Case 29 failed");
    }

    // Test Case 30: Test if after searching for a valid Status it will appear on the pending table
    //click the filter by status
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.actions().move({ origin: FilterByButton }).click().perform();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-"]/div[3]/ul/li[4]/span')));
    let FilterByStatusButton = await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[4]/span'));
    await driver.actions().move({ origin: FilterByStatusButton }).click().perform();

    
    let ValidStatus="Pending Approval"
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by Status"]')).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));;;
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by Status"]')).sendKeys(ValidStatus);
    
    let parentXpath30 = '//*[contains(text(),"Pending Approval")]/following::div[1]';
    await driver.wait(until.elementLocated(By.xpath(parentXpath30)), 2000);
    let formArr30 = await driver.findElements(By.xpath(parentXpath30 + `//td[4]//span[contains(text(),"${ValidStatus}")]/./..`));
    if (formArr30.length !=0) {
        //pass
    } else {
        throw new Error("Test Case 30 failed");
    }

    // Test Case 31: Test if after searching for a invalid status, it will not appear on the pending table
    let InvalidStatus="Approved";
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by Status"]')).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));;
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by Status"]')).sendKeys(InvalidStatus);
    
    let parentXpath31 = '//*[contains(text(),"Pending Approval")]/following::div[1]';
    await driver.wait(until.elementLocated(By.xpath(parentXpath31)), 1000);
    let formArr31 = await driver.findElements(By.xpath(parentXpath31 + `//span[contains(text(),"${InvalidStatus}")]/./..`));
    if (formArr31.length == 0) {
        //pass
    } else {
        throw new Error("Test Case 31 failed");
    }

    // Test Case 32: Test if after searching for a invalid status (Numeric number), it will not appear on the pending table
    let InvalidStatus_num="123";
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by Status"]')).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));;
    await new Promise(resolve => setTimeout(resolve, 1000));
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by Status"]')).sendKeys(InvalidStatus_num);
    
    let parentXpath32 = '//*[contains(text(),"Pending Approval")]/following::div[1]';
    await driver.wait(until.elementLocated(By.xpath(parentXpath32)), 1000);
    let formArr32 = await driver.findElements(By.xpath(parentXpath32 + `//span[contains(text(),"${InvalidStatus}")]/./..`));
    if (formArr32.length == 0) {
        //pass
    } else {
        throw new Error("Test Case 32 failed");
    }
    
}, 2 * 60 * 1000);