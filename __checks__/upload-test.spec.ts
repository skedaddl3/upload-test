import { test } from '@playwright/test'
import { loginProtonMail } from '../helpers/proton';
import path from 'path'
import fs from 'fs'

const password = process.env.DEFAULT_PASSWORD!

test('Upload Test', async ({ page, context, request }) => {
  test.setTimeout(180000)
  // i removed the test where the first Page is generating PDF, i'm not permitted to show it.
  // it sends an email that contains PDF in the proton test account

  // Then in this part we login to the test account and download it
  const page_proton = await context.newPage();
  
  // await loginProtonMail(page_proton, process.env.robert!, process.env.mail_password!)
  await loginProtonMail(page_proton, 'robert.thomas01@proton.me', 'mbed-recn-uhva-ycsy')
  await page_proton.getByTestId('navigation-link:inbox').click();

  // This part is dynamic in our actual test
  await page_proton.getByTestId(`message-item:Received  Electronic Check Amounting to ₱ **231.00`).nth(0).click();
  const downloadPromise = page_proton.waitForEvent('download');
  // Download PDF
  await page_proton.getByTestId('attachment-list:download-all').click();
  const download = await downloadPromise;
  const file = download.suggestedFilename();
  await page_proton.waitForTimeout(3000);
  
  // Save the downloaded file in the Checkly sandboxed directory
  let filePathInSandbox = path.join(__dirname, file);
  await download.saveAs(filePathInSandbox);
  console.log(filePathInSandbox)

  const page_echeck_central = await context.newPage();

  // Since i'm not permitted to show it, i use file.io here similar to upload file in our web app
  // await page_echeck_central.goto(process.env.file_io_url!);
  await page_echeck_central.goto('https://www.file.io/');
  
  const inputFile = await page_echeck_central.$('input[type=file]');
  await inputFile!.setInputFiles(filePathInSandbox);


  // Delay to check if it uploads in file.io
  await page_echeck_central.waitForTimeout(5000)

  await page.screenshot({ path: 'screenshot.jpg' })
});
