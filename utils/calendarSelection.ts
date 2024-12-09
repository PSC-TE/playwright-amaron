import { chromium, Page } from 'playwright';

async function selectDate(page: Page, targetMonth: string, targetYear: string, targetDay: number) {
  // Open the calendar input (example: clicking on an input field that opens the calendar)
  const calendarInput = await page.$('#calendar-input'); // Replace with actual selector
  if (calendarInput) {
    await calendarInput.click();
  } else {
    console.error('Calendar input not found!');
    return;
  }

  // Navigate to the correct month/year
  await navigateToMonth(page, targetMonth, targetYear);

  // Select the target day
  const dayElement = await page.$(`td[aria-label="${targetDay}"]`); // Use the appropriate selector for your calendar
  if (dayElement) {
    await dayElement.click();
  } else {
    console.error(`Day ${targetDay} not found in calendar!`);
  }
}

async function navigateToMonth(page: Page, targetMonth: string, targetYear: string) {
  // Loop until we find the correct month and year
  let currentMonth: string;
  let currentYear: string;
  
  do {
    // Get the current month and year displayed on the calendar (adjust selectors as needed)
    const monthElement = await page.$('.calendar-header .month'); // Adjust selector
    const yearElement = await page.$('.calendar-header .year'); // Adjust selector
    
    currentMonth = monthElement ? await monthElement.innerText() : '';
    currentYear = yearElement ? await yearElement.innerText() : '';

    console.log(`Current Month: ${currentMonth}, Current Year: ${currentYear}`);

    // If the displayed month and year do not match the target, click the "next" button
    if (currentMonth !== targetMonth || currentYear !== targetYear) {
      const nextButton = await page.$('.calendar-header .next'); // Adjust selector for "next" button
      if (nextButton) {
        await nextButton.click();
      }
    }
  } while (currentMonth !== targetMonth || currentYear !== targetYear);
}

async function main() {
  // Launch the browser and open a new page
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to the page with the calendar
  await page.goto('http://example.com'); // Replace with actual URL

  // Define the target date (e.g., select December 2024, 15th)
  const targetMonth = 'December';
  const targetYear = '2024';
  const targetDay = 15;

  // Select the date dynamically
  await selectDate(page, targetMonth, targetYear, targetDay);

  // Wait a few seconds to see the result
  await page.waitForTimeout(5000);

  // Close the browser
  await browser.close();
}

main().catch(err => {
  console.error('Error in automation:', err);
});
