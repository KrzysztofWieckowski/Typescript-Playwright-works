import { Page, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { StartPage } from './StartPage';
import { URLS } from '../utils/constants';

export class LoginFlow {
  readonly page: Page;
  readonly loginPage: LoginPage;
  readonly startPage: StartPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.startPage = new StartPage(page);
  }

  async loginAndGoToAgentUI(username: string, password: string) {
    await this.loginPage.goto();
    await this.loginPage.loginWithDirectoryAccount(username, password);
    await this.startPage.switchToAgentUI();
    await expect(this.page).toHaveURL(URLS.AGENTUI_HOME, { timeout: 8000 });
  }
}
