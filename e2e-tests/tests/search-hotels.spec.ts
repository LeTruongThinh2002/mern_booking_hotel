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

test('should book hotel', async ({page}) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder('Where are you going').fill('Vũng Tàu');

  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formattedDate = date.toISOString().split('T')[0];
  await page.getByPlaceholder('Check-out Date').fill(formattedDate);

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
  await page.getByRole('button', {name: 'Book Now'}).click();

  await expect(page.getByText('Total cost: $750.00')).toBeVisible();

  const stripeFrame = page.frameLocator('iframe').first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill('4242424242424242');
  await stripeFrame.locator('[placeholder="MM / YY"]').fill('01/25');
  await stripeFrame.locator('[placeholder="CVC"]').fill('123');
  await stripeFrame.locator('[placeholder="ZIP"]').fill('12345');

  await page.getByRole('button', {name: 'Confirm Booking'}).click();
  await expect(page.getByRole('button', {name: 'Saving...'})).toBeVisible();
  await expect(page.getByText('Booking Saved!')).toBeVisible();
});
