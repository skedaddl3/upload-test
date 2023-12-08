import { Page } from '@playwright/test'

export async function protonMailReadAll(page: Page, email: string, mail_password: string) {
  await loginProtonMail(page, email, mail_password);
  await page.waitForLoadState('load')
  await page.waitForLoadState('domcontentloaded')
  await page.waitForTimeout(2000);
  await page.getByTestId('toolbar:select-all-dropdown').click();
  await page.getByTestId('toolbar:select-all').click();

  const read_email = await page.$('[data-testid="toolbar:read"]');
  if (read_email) {
    await read_email.click();
  } else {
    console.error("Element 'toolbar:read' not found. Continuing with the code.");
  }
}

export async function loginProtonMail(page: Page, username: string, password: string){
  await page.goto("https://account.proton.me/login");
  await page.getByLabel('Email or username').fill(username);
  await page.getByLabel('Email or username').press('Tab');
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForLoadState('load');
  await page.waitForLoadState('domcontentloaded');
};

