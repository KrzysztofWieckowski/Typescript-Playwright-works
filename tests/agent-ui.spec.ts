import { test, } from '@playwright/test';
import { LoginFlow } from '../pages/LoginFlow';
import { StartPage } from '../pages/StartPage';
import { ACCESS_DATA } from '../utils/constants';
import { faker } from '@faker-js/faker';

const USERNAME = process.env.TEST_USERNAME || ACCESS_DATA.USER_1;
const PASSWORD = process.env.TEST_PASSWORD || ACCESS_DATA.PASSWORD_1;
const nameToFill = faker.person.fullName();

test.describe('Agent UI Tests', () => {

  test('3. Navigate to Service Agent role views', async ({ page }) => {
    const loginFlow = new LoginFlow(page);
    const startPage = new StartPage(page);
    await loginFlow.loginAndGoToAgentUI(USERNAME, PASSWORD);
    await startPage.openServiceDeskAndVerifyExpanded();
  });

  test('4. Open "06. Open tickets" list', async ({ page }) => {
    const loginFlow = new LoginFlow(page);
    const startPage = new StartPage(page);
    await loginFlow.loginAndGoToAgentUI(USERNAME, PASSWORD);
    await startPage.openServiceDeskAndVerifyExpanded();
    await startPage.open06List();
  });

  test('5. Create a new ticket to "06. Open tickets" list', async ({ page }) => {
    const loginFlow = new LoginFlow(page);
    const startPage = new StartPage(page);
    await loginFlow.loginAndGoToAgentUI(USERNAME, PASSWORD);
    await startPage.openServiceDeskAndVerifyExpanded();
    await startPage.open06List();
    await startPage.openNewTicket();
    await startPage.fillOutForm({
        quickfill: startPage.quickfillFirstItem,
        ticketType: startPage.ticketTypeIncident,
        customerInformation: startPage.customerInformationFirstItem,
        team: startPage.teamFirstItem},
        nameToFill
  );
    await startPage.verifyNewForm({
        quickfillValue: startPage.quickfillValueFirstItem,
        ticketType: startPage.ticketTypeValueIncident,
        customerInformationValue: startPage.customerInformationValueFirstItem,
        teamValue: startPage.teamValueFirstItem} , 
        nameToFill
    );
  });
});
