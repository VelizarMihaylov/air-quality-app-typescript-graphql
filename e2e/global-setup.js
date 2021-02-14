// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import { setup as setupPuppeteer } from 'jest-environment-puppeteer'

module.exports = async function globalSetup(globalConfig) {
  await setupPuppeteer(globalConfig)
  // Your global setup
}
