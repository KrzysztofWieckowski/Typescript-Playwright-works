import type { Locator } from '@playwright/test';

export interface VerifyLocators {
  quickfillValue?: Locator;
  ticketType?: Locator;
  customerInformationValue?: Locator;
  teamValue?: Locator;
}

export interface NewFormLocators {
  quickfill: Locator,
  ticketType: Locator,
  customerInformation: Locator,
  team: Locator,
}