import { Page, Locator } from '@playwright/test';

export function getByUid(page: Page, value: string): Locator {
  return page.locator(`[data-uid="${value}"]`);
}

export function getByDataTest(page: Page, value: string): Locator {
  return page.locator(`[data-test="${value}"]`);
}

export function getByDataValue(page: Page, value: string): Locator {
  return page.locator(`[data-value="${value}"]`);
}

export function getByAriaLabel(page: Page, value: string): Locator {
  return page.locator(`[aria-label="${value}"]`);
}

export function getByName(page: Page, value: string): Locator {
  return page.locator(`[name="${value}"]`);
}