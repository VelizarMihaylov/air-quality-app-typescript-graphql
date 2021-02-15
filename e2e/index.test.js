/**
 * We need to set the jest timeout to 25000ms
 * to make sure that the tests will not timeout
 */
jest.setTimeout(25000)

describe('', () => {
  const e2eTestUrl = process.env.E2E_TEST_URL || 'http://localhost:3999'
  beforeAll(async () => {
    await page.goto(`${e2eTestUrl}`)
  })
  it('should populate the input box with selected city ', async () => {
    await page.waitForSelector('[data-puppet="magnifying-glass-icon"]', {
      visible: true
    })
    const searchInput = await page.$('[data-puppet="search-box-input"]')
    await searchInput.type('ma', { delay: 100 })
    const searchListElements = await page.$$(
      '[data-puppet="search-box-list-element"]'
    )
    await searchListElements[2].click()
    const value = await (await searchInput.getProperty('value')).jsonValue()
    expect(value).toBe('Manchester')
    await page.waitForSelector('[data-puppet="magnifying-glass-icon"]', {
      visible: true
    })
    await page.waitForSelector('[data-puppet="location-card"]', {
      visible: true
    })
    const locationCards = await page.$$('[data-puppet="location-card"]')
    expect(locationCards.length > 0).toBe(true)
  })
})
