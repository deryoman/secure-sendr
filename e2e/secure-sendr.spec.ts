import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('./')
})

test('Share link should be present', async ({page}) => {
    await page.fill('textarea[name="payload"]', 'foo bar')
    await page.click('button[type="submit"]')

    await page.waitForURL(new RegExp('^.*/share/#[a-zA-Z0-9_-]+', 'i'))

    await expect(page.getByRole('textbox'))
        .toHaveValue(new RegExp('^.*/show#[a-zA-Z0-9_-]+', 'i'))
})

test('Shared link should be decrypt-able', async ({page}) => {
    await page.fill('textarea[name="payload"]', 'foo bar')
    await page.click('button[type="submit"]')

    const shareLink = await page.locator('[data-template-link-input]').inputValue()

    await page.goto(shareLink)
    await page.waitForSelector('[data-template-result-textarea]')

    const decryptedText = await page.locator('[data-template-result-textarea]').inputValue()

    await expect(decryptedText).toBe('foo bar')
})

test('Shared link should only be able to be used once', async ({page}) => {
    await page.fill('textarea[name="payload"]', 'foo bar')
    await page.click('button[type="submit"]')

    const shareLink = await page.locator('[data-template-link-input]').inputValue()

    await page.goto(shareLink)
    await page.waitForSelector('[data-template-result-textarea]')

    const firstDecryptedText = await page.locator('[data-template-result-textarea]').inputValue()
    await expect(firstDecryptedText).toBe('foo bar')

    await page.goto(shareLink)
    await page.waitForSelector('[data-template-result-textarea]')

    const secondDecryptedText = await page.locator('[data-template-result-textarea]').inputValue()
    await expect(secondDecryptedText).toBe('')
})

