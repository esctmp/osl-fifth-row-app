import { Builder, By, Key, until } from 'selenium-webdriver';

const url = "http://localhost:3001";
const oslUser = {
    email: "testosl@sutd.edu.sg",
    password: "P@ssword1!"
};

// Use cases:
// 5) View Form Archive (OSL, ROOT)
test("System - Fifth Row Submit And OSL Approve", async () => {
    // 1. OSL user logins
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

    // 2. OSL user navigates to "View EPF List"
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"View EPF List")]/./../..')));
    let navButton = await driver.findElement(By.xpath('//span[contains(text(),"View EPF List")]/./../..'));
    await driver.actions().move({ origin: navButton }).click().perform();

    // 3. OSL user click on the Date Sort Arrow of Pending
    await new Promise(resolve => setTimeout(resolve,2000));
    await driver.wait(until.elementLocated(By.xpath('//*[contains(text(),"Pending Approval")]')), 5000);
    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"▲")]')), 5000);
    let PendingSortButton = await driver.findElement(By.xpath('//span[contains(text(),"▲")]'));
    await driver.actions().move({ origin: PendingSortButton }).click().perform();


    // 4. OSL user type in "12" in the search of Pending
    await new Promise(resolve => setTimeout(resolve, 3000));
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by EPF ID"]')).sendKeys("1");
    await new Promise(resolve => setTimeout(resolve, 3000));
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by EPF ID"]')).sendKeys("2");
    
    
    // 5. OSL user clear the search field of Pending
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[1]//input[@placeholder="Search by EPF ID"]')).sendKeys(Key.BACK_SPACE,Key.BACK_SPACE);

    // 6. OSL user clicks filter by button of Pending
    await new Promise(resolve => setTimeout(resolve, 3000));
    let FilterByButton = await driver.findElement(By.xpath('//*[contains(text(),"Pending Approval")]/following::div[6]'));
    await driver.actions().move({ origin: FilterByButton }).click().perform();


    // 7. OSL user clicks on Name of Pending
    await new Promise(resolve => setTimeout(resolve, 4000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-"]/div[3]/ul/li[3]/span')));
    let FilterByNameButton = await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[3]/span'));
    await driver.actions().move({ origin: FilterByNameButton }).click().perform();

    // 8. OSL user type in "n" in the search of Pending
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div[1]/div/div/div/div/div/div/div[2]/input')).sendKeys("n");

    // 9. OSL user clicks on next page of Pending
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div/div[1]/div/div/div/div/table/div/div/div[2]/button[2]')));
    let NextPageButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div[1]/div/div/div/div/table/div/div/div[2]/button[2]'));
    await driver.actions().move({ origin: NextPageButton }).click().perform();
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.actions().move({ origin: NextPageButton }).click().perform();
    
    // 10. OSL user clicks on the EPF of Pending 
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div/div[1]/div/div/div/div/table/tbody/tr/td[3]/a/h6')));
    await new Promise(resolve => setTimeout(resolve, 2000));
    let EPFclick = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div[1]/div/div/div/div/table/tbody/tr/td[3]/a/h6'));
    await driver.actions().move({ origin: EPFclick }).click().perform();

    // 11. OSL user goes back to View Page after seeing the EPF 
    await new Promise(resolve => setTimeout(resolve, 4000));
    await driver.navigate().back();

    // 12. OSL user scroll down the page to view Archives table
    await new Promise(resolve => setTimeout(resolve, 2000));
    const scrollDistance = 150; // Adjust the scrolling distance as needed
    const scrollDelay = 400; // Adjust the delay (in milliseconds) between scrolls as needed
    const maxScrolls = 4; // Adjust the maximum number of scrolls as needed

    let prevScrollY = -1; // To track the previous scroll position

    for (let i = 0; i < maxScrolls; i++) {
      await driver.executeScript(`window.scrollBy(0, ${scrollDistance});`);
      await driver.sleep(scrollDelay);

      // Get the current scroll position after scrolling
      const currentScrollY = await driver.executeScript('return window.scrollY;');
    
      // Check if the scroll position has changed after scrolling
      if (currentScrollY === prevScrollY) {
        console.log("Reached the end of the page. Stopping scrolling.");
        break;
      }

      prevScrollY = currentScrollY;
    }


    // 13. OSL user type "1" in the search input of Archives
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.findElement(By.xpath('//*[contains(text(),"Archives")]/following::div[1]//input[@placeholder="Search by EPF ID"]')).sendKeys("1");
    
    
    // 14. OSL user clears the input field of Archives
    await new Promise(resolve => setTimeout(resolve,2000));
    await driver.findElement(By.xpath('//*[contains(text(),"Archives")]/following::div[1]//input[@placeholder="Search by EPF ID"]')).sendKeys(Key.BACK_SPACE);

    // 15. OSL user click the date sort button of Archives
    await new Promise(resolve => setTimeout(resolve,2000));
    await driver.wait(until.elementLocated(By.xpath('//*[contains(text(),"Archives")]')));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div/div[2]/div/div/div/div/table/thead/tr/th[2]/h6/span')));
    let ArchivesSortButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div[2]/div/div/div/div/table/thead/tr/th[2]/h6/span'));
    await driver.actions().move({ origin: ArchivesSortButton }).click().perform();
    await new Promise(resolve => setTimeout(resolve,2000));
    await driver.actions().move({ origin: ArchivesSortButton }).click().perform();
    


    // 16. OSL users clicks the filter by button of Archives
    await new Promise(resolve => setTimeout(resolve, 3000));
    let ArchivesFilterByButton = await driver.findElement(By.xpath('//*[contains(text(),"Archives")]/following::div[6]'));
    await driver.actions().move({ origin: ArchivesFilterByButton }).click().perform();

    // 17. OSL user type "tenn" in the search input of Archives
    await new Promise(resolve => setTimeout(resolve, 4000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-"]/div[3]/ul/li[3]/span')));
    let ArchivesFilterByClubButton = await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[3]/span'));
    await driver.actions().move({ origin: ArchivesFilterByClubButton }).click().perform();
    await new Promise(resolve => setTimeout(resolve, 3000));
    await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div[2]/div/div/div/div/div/div/div[2]/input')).sendKeys("t");
    await new Promise(resolve => setTimeout(resolve, 3000));
    await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div[2]/div/div/div/div/div/div/div[2]/input')).sendKeys("e");
    await new Promise(resolve => setTimeout(resolve, 3000));
    await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div[2]/div/div/div/div/div/div/div[2]/input')).sendKeys("n");
    await new Promise(resolve => setTimeout(resolve, 3000));
    await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div[2]/div/div/div/div/div/div/div[2]/input')).sendKeys("n");

    // 18. OSL user clicks on the EPF in Archives
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[3]/a/h6')));
    await new Promise(resolve => setTimeout(resolve, 2000));
    let EPFclickArchives = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[3]/a/h6'));
    await driver.actions().move({ origin: EPFclickArchives }).click().perform()

}, 2 * 60 * 1000);