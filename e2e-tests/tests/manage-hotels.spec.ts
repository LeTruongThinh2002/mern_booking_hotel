import {test, expect} from '@playwright/test';
import path from 'path';

const UI_URL = 'http://localhost:5173/';

test.beforeEach(async ({page}) => {
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

test('should allow user to add a hotel', async ({page}) => {
  await page.goto(`${UI_URL}add-hotel`);
  await page.locator('[name=name]').fill('Hotel 1');
  await page.locator('[name=city]').fill('city');
  await page.locator('[name=country]').fill('country');
  await page.locator('[name=description]').fill('description');
  await page.locator('[name=pricePerNight]').fill('100');
  await page.selectOption('select[name=starRating]', '5');
  await page.getByText('Budget').click();
  await page.getByLabel('Free Wifi').check();
  await page.getByLabel('Parking').check();
  await page.locator('[name=adultCount]').fill('1');
  await page.locator('[name=childCount]').fill('0');
  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, 'files', '1.jpg'),
    path.join(__dirname, 'files', '2.jpg'),
    path.join(__dirname, 'files', '3.jpg'),
    path.join(__dirname, 'files', '4.jpg'),
    path.join(__dirname, 'files', '5.jpg')
  ]);

  await page.getByRole('button', {name: 'Save'}).click();
  page.setDefaultTimeout(10000);
  await expect(page.getByText('Hotel added successfully')).toBeVisible();
});

test('should display hotels', async ({page}) => {
  await page.goto(`${UI_URL}my-hotels`);
  await expect(page.getByRole('heading', {name: 'My Hotels'})).toBeVisible();
  await expect(page.getByText('Lê Trường Thịnh')).toBeVisible();
  await expect(
    page.getByText(`Description:
  🚀 Welcome to our comprehensive`)
  ).toBeVisible();
  await expect(page.getByText('dwadawd, awdawdaw')).toBeVisible();
  await expect(page.getByText('Motel')).toBeVisible();
  await expect(page.getByText('$2113 per night')).toBeVisible();
  await expect(page.getByText('1 adults,1 children')).toBeVisible();
  await expect(page.getByText('3 Star Rating')).toBeVisible();

  await expect(page.getByRole('link', {name: 'View Details'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'Add hotel'})).toBeVisible();
});

test('should allow user to edit a hotel', async ({page}) => {
  await page.goto(`${UI_URL}my-hotels`);
  await page.getByRole('link', {name: 'View details'}).click();
  await page.waitForSelector('[name="name"]', {state: 'attached'});
  await expect(page.locator('[name=name]')).toHaveValue('Pink Three');
  await page.locator('[name=name]').fill('Pink Three');
  await page.locator('[name=city]').fill('Ho Chi Minh City');
  await page.locator('[name=country]').fill('Vietnamese');
  await page.locator('[name=description]').fill(`General Information:
  - Hotel Name: Choose a catchy and memorable name that reflects the generator concept.
  - Location: Briefly describe the neighborhood and its proximity to key attractions.
  - Price Range: Mention the general price range to attract the right audience.
  - Unique Selling Points: Highlight what makes your hotel stand out from other generator options.
  
  Generator Vibe:
  - Community Focus: Describe the social atmosphere and opportunities for guests to connect.
  - Events and Activities: Mention any workshops, performances, or social events hosted by the hotel.
  - Design and Decor: Describe the overall aesthetic that reflects the generator lifestyle.
  - Sustainability: If applicable, emphasize eco-friendly practices and initiatives.`);
  await page.locator('[name=pricePerNight]').fill('200');
  await page.selectOption('select[name=starRating]', '4');
  await page.getByText('Budget').click();
  await page.getByLabel('Free Wifi').check();
  await page.getByLabel('Parking').check();
  await page.locator('[name=adultCount]').fill('1');
  await page.locator('[name=childCount]').fill('0');
  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, 'files', '1.jpg'),
    path.join(__dirname, 'files', '2.jpg'),
    path.join(__dirname, 'files', '3.jpg'),
    path.join(__dirname, 'files', '4.jpg'),
    path.join(__dirname, 'files', '5.jpg')
  ]);

  await page.getByRole('button', {name: 'Save'}).click();
  page.setDefaultTimeout(20000);
  await expect(page.getByText('Hotel updated successfully')).toBeVisible();

  await page.reload();

  await expect(page.locator('[name=name]')).toHaveValue('Pink Three');
  await page.locator('[name=name]').fill('Pink Three(Hong Ba)');
  await page.getByRole('button', {name: 'Save'}).click();
  page.setDefaultTimeout(10000);
  await expect(page.getByText('Hotel updated successfully')).toBeVisible();
});
