import {test, expect} from '@playwright/test';

const UI_URL = 'http://localhost:5173/';

test('should allow user to register', async ({page}) => {
  await page.goto(UI_URL);
  //get the sign in button
  await page.getByRole('link', {name: 'Sign In'}).click();
  await page.getByRole('link', {name: 'Create an account here'}).click();

  await expect(page.getByRole('heading', {name: 'Create an account'})).toBeVisible();

  await page.locator('[name=firstName]').fill('thinh');
  await page.locator('[name=lastName]').fill('le');
  await page.locator('[name=email]').fill('thinhofdakh@gmail.com');
  await page.locator('[name=password]').fill('eBpd.tnAMK8X*Z');
  await page.locator('[name=confirmPassword]').fill('eBpd.tnAMK8X*Z');

  await page.getByRole('button', {name: 'Create account'}).click();

  await expect(page.getByText('Registration Success!')).toBeVisible();
  await expect(page.getByRole('link', {name: 'My Bookings'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'My Hotels'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Sign Out'})).toBeVisible();
});

test('should not allow the user to sign in', async ({page}) => {
  await page.goto(UI_URL);
  //get the sign in button
  await page.getByRole('link', {name: 'Sign In'}).click();

  await expect(page.getByRole('heading', {name: 'Sign In'})).toBeVisible();

  await page.locator('[name=email]').fill('thinhofdakh@gmail.com');
  await page.locator('[name=password]').fill('eBpd.tnAMK8X*Z');

  await page.getByRole('button', {name: 'Log In'}).click();

  await expect(page.getByText('Sign In Successful!')).toBeVisible();
  await expect(page.getByRole('link', {name: 'My Bookings'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'My Hotels'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Sign Out'})).toBeVisible();
});
