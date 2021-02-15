/**
 * We need to set the jest timeout to 25000ms
 * so the tests will not timeout in CI
 */
jest.setTimeout(25000)

import { configureToMatchImageSnapshot } from 'jest-image-snapshot'
import { citiesMock, latestMeasurementsMock } from './__mocks__'

describe('', () => {
  beforeAll(async () => {
    const integrationTestUrl =
      process.env.INTEGRATION_TEST_URL || 'http://localhost:3999'
    const graphqlServiceUrl =
      process.env.GAPHQL_SERVICE_URL || 'http://localhost:3999'
    const toMatchImageSnapshot = configureToMatchImageSnapshot({
      /**
       * Setting the failureThreshold to 0.5% to avoid false positives.
       */
      failureThreshold: 0.5,
      failureThresholdType: 'percent'
    })
    expect.extend({ toMatchImageSnapshot })

    await page.setRequestInterception(true)

    await page.on('request', (request) => {
      const url = request.url()
      if (url === graphqlServiceUrl && request.postData()) {
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

    await page.goto(`${integrationTestUrl}`)
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
