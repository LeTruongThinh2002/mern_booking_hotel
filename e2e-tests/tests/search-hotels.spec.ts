import {test, expect} from '@playwright/test';

const UI_URL = 'http://localhost:5173/';

test('should not allow the user to sign in', async ({page}) => {
  await page.goto(UI_URL);
  //get the sign in button
  await page.getByRole('link', {name: 'Sign In'}).click();

  await expect(page.getByRole('heading', {name: 'Sign In'})).toBeVisible();

  await page.locator('[name=email]').fill('LTruongThinh2002@gmail.com');
  await page.locator('[name=password]').fill('Thinhzs2a@');

  await page.getByRole('button', {name: 'Log In'}).click();

  await expect(page.getByText('Sign In Successful!')).toBeVisible();
  await expect(page.getByRole('link', {name: 'My Bookings'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'My Hotels'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Sign Out'})).toBeVisible();
});

test('should show hotels search results', async ({page}) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder('Where are you going').fill('Hồ Chí Minh');
  await page.getByRole('button', {name: 'Search'}).click();

  await expect(page.getByText('Hotels founded in Hồ Chí Minh')).toBeVisible();
});

test('should show hotel details', async ({page}) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder('Where are you going').fill('Vũng Tàu');
  await page.getByRole('button', {name: 'Search'}).click();

  await page.getByText('Khách sạn Imperial').click();
  await expect(page).toHaveURL(/detai/);
  await expect(
    page.getByRole('button', {name: 'Sign in to Book'})
  ).toBeVisible();
  await page.getByRole('button', {name: 'Sign in to Book'}).click();
  await expect(page.getByRole('heading', {name: 'Sign In'})).toBeVisible();
  await page.locator('[name=email]').fill('LTruongThinh2002@gmail.com');
  await page.locator('[name=password]').fill('Thinhzs2a@');

  await page.getByRole('button', {name: 'Log In'}).click();

  await expect(page.getByText('Sign In Successful!')).toBeVisible();

  await expect(page.getByRole('button', {name: 'Book Now'})).toBeVisible();
});
