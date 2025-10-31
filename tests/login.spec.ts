import { test} from '@playwright/test';
import { LoginFlow } from '../pages/LoginFlow';
import { LoginPage } from '../pages/LoginPage';
import { ACCESS_DATA } from '../utils/constants';

const USERNAME = process.env.TEST_USERNAME || ACCESS_DATA.USER_1;
const PASSWORD = process.env.TEST_PASSWORD || ACCESS_DATA.PASSWORD_1;

test.describe('Login Tests', () => {
  test('1. Log in with directory account successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginWithDirectoryAccount(USERNAME, PASSWORD);
  });

  test('2. Switch to AgentUI from StartPage', async ({ page }) => {
    const loginFlow = new LoginFlow(page);
    await loginFlow.loginAndGoToAgentUI(USERNAME, PASSWORD);
  });
});
