import { Page, Locator, expect } from '@playwright/test';
import { URLS} from '../utils/constants';
import { getByName } from '../utils/helpers';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly terminateButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#kc-login');
    this.terminateButton = getByName(page, 'kickoutButton');
  }

  async goto() {
    await this.page.goto('/');
  }

  async loginWithDirectoryAccount(username: string, password: string) {
    await this.goto();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    try {
      await this.terminateButton.waitFor({ state: 'visible', timeout: 5000 }); 
      await this.terminateButton.click();
      } catch {
        }
      await expect(this.page).toHaveURL(URLS.WORKSPACE_START, { timeout: 5000 });
  }
}
