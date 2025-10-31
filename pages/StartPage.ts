import { Page, Locator, expect } from '@playwright/test';
import { SECTION_NAMES, URLS } from '../utils/constants';
import { NewFormLocators, VerifyLocators } from '../types/interfaces'
import { getByUid, getByDataTest, getByDataValue, getByAriaLabel } from '../utils/helpers';

export class StartPage {
  readonly page: Page;
  readonly agentUIButton: Locator;
  readonly serviceDeskAgentButton: Locator;
  readonly serviceDeskAgentTreeItem: Locator;
  readonly openTicketsList06Button: Locator;
  readonly openNewTicketButton: Locator;
  readonly quickfillField: Locator;
  readonly quickfillFirstItem: Locator;
  readonly quickfillDropdownWrapper: Locator;
  readonly ticketTypeDropdown: Locator;
  readonly ticketTypeIncident: Locator;
  readonly customerInformationDropdown: Locator;
  readonly customerInformationFirstItem: Locator;
  readonly teamAssignmentDropdown: Locator;
  readonly teamFirstItem: Locator;
  readonly saveButton: Locator;
  readonly closeNotification: Locator;
  readonly subjectInput: Locator;
  readonly infoSection: Locator;
  readonly infoSectionTitle: Locator;
  readonly quickfillValueFirstItem: Locator;
  readonly ticketTypeValueIncident: Locator;
  readonly customerInformationValueFirstItem: Locator;
  readonly teamValueFirstItem: Locator 
  readonly subjectValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.agentUIButton = page.locator('.esm-button.switch-button');
    this.closeNotification = getByAriaLabel(page, 'Close notification');
    this.customerInformationDropdown = getByDataTest(page, 'reference-dropdown-7793318');
    this.customerInformationFirstItem = getByDataValue(page, '6235680');
    this.customerInformationValueFirstItem = getByDataTest(page, 'reference-value-6235680');
    this.infoSection = page.locator('section.info-section');
    this.infoSectionTitle = page.locator('//section[contains(@class, "info-section")]//div[@title="06. Open Tickets"]');
    this.openNewTicketButton = page.locator('#create-new-dc');
    this.openTicketsList06Button = getByUid(page, '7820326_BOOKMARK');
    this.quickfillDropdownWrapper = page.locator('#reference-dropdown-wrapper-7792477-8063530');
    this.quickfillField = getByDataTest(page, 'reference-dropdown-7792477');
    this.quickfillFirstItem = getByDataValue(page, '8063530');
    this.quickfillValueFirstItem = getByDataTest(page, 'reference-value-8063530');
    this.saveButton = getByDataTest(page, 'save-datacard-button');
    this.serviceDeskAgentButton = getByUid(page, '7811963_ROLE');
    this.serviceDeskAgentTreeItem = getByUid(page, '7811963_ROLE');
    this.subjectInput = page.locator('input[data-test="simple-input-7792739"]');
    this.subjectValue = getByDataTest(page, 'default-attribute-7792739');
    this.teamAssignmentDropdown = getByDataTest(page, 'reference-dropdown-7795676');
    this.teamFirstItem = getByDataValue(page, '10203076');
    this.teamValueFirstItem = getByDataTest(page, 'reference-value-10203076');
    this.ticketTypeDropdown = getByDataTest(page, 'attribute-id-7792256');
    this.ticketTypeIncident = getByDataValue(page, 'Incident');
    this.ticketTypeValueIncident = getByDataTest(page, 'default-attribute-7792256');

  }

  async switchToAgentUI() {
    await this.agentUIButton.click();
  }

  async openServiceDeskAndVerifyExpanded() {
    await this.openServiceDeskAgentGroup();
    await expect(this.serviceDeskAgentTreeItem).toHaveAttribute('aria-expanded', 'true');
  }

  async openServiceDeskAgentGroup() {
    await this.serviceDeskAgentButton.click();
  }

  async open06List() {
    await this.openTicketsList06Button.click()
    await expect(this.page).toHaveURL(URLS.OPEN_TICKETS_LIST);
    await expect(this.infoSectionTitle).toHaveText(SECTION_NAMES.OPEN_TICKETS_06);
  }

  async openNewTicket() {
    await this.openNewTicketButton.click();
    await expect(this.page).toHaveURL(URLS.NEW_TICKET);
  }

  async fillOutForm(locators: NewFormLocators, randomName: string) {
      await this.quickfillField.click();
      await locators.quickfill.click();
      await this.ticketTypeDropdown.click();
      await locators.ticketType.hover();
      await locators.ticketType.click();
      await this.closeNotification.click();
      await this.customerInformationDropdown.click();
      await locators.customerInformation.hover();
      await locators.customerInformation.click();
      await this.teamAssignmentDropdown.click();
      await locators.team.click();
      await this.subjectInput.click();
      await this.subjectInput.fill(randomName);
      await this.saveButton.click();
    }

    async verifyNewForm(locators: VerifyLocators, randomName: string) {
      await expect(this.page).toHaveURL(URLS.DATA_CARD);
      await expect(this.subjectValue).toHaveText(randomName);
      for (const [name, locator] of Object.entries(locators)) {
        if (locator) {
          await expect(locator, `${name} should be visible`).toBeVisible();
        }
      }
  }
}
