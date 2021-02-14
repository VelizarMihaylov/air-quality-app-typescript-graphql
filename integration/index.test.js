/**
 * We need to set the jest timeout to 10000ms
 * so the tests will not timeout in CI
 */
if (process.env.CI) {
  jest.setTimeout(10000)
}

import { configureToMatchImageSnapshot } from 'jest-image-snapshot'
import { citiesMock, latestMeasurementsMock } from './__mocks__'

describe('', () => {
  beforeAll(async () => {
    const toMatchImageSnapshot = configureToMatchImageSnapshot({
      /**
       * In CI the generated screenshots will be slightly different due
       * to the test running in a different env. Setting the failureThreshold
       * to 0.5% will allow tests to pass while still getting fairly accurate comparison
       * we still keep it down to zero when we run the test locally
       */
      failureThreshold: process.env.CI ? 0.5 : 0,
      failureThresholdType: 'percent'
    })
    expect.extend({ toMatchImageSnapshot })

    await page.setRequestInterception(true)

    await page.on('request', request => {
      const url = request.url()
      if (url === 'http://localhost:4444/graphql' && request.postData()) {
        if (JSON.parse(request.postData()).query.includes('cities')) {
          request.respond({
            status: 200,
            contentType: 'application/json',
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(citiesMock)
          })
        }
        if (
          request.postData() &&
          JSON.parse(request.postData()).query.includes('latestMeasurements')
        ) {
          request.respond({
            status: 200,
            contentType: 'application/json',
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(latestMeasurementsMock)
          })
        }
      } else {
        request.continue()
      }
    })

    await page.goto(`${process.env.INTEGRATION_TEST_URL}`)
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
    // Take screenshot
    const searchBoxScreenshot = await page.screenshot()
    expect(searchBoxScreenshot).toMatchImageSnapshot()
    // Continue
    await searchListElements[2].click()
    const value = await (await searchInput.getProperty('value')).jsonValue()
    expect(value).toBe('Manchester')
    await page.waitForSelector('[data-puppet="magnifying-glass-icon"]', {
      visible: true
    })
    await page.waitForSelector('[data-puppet="location-card"]', {
      visible: true
    })
    // Take screenshot
    const locationsListScreenshot = await page.screenshot()
    expect(locationsListScreenshot).toMatchImageSnapshot()
    // Continue
  })
})
