/**
* This is a Checkly CLI BrowserCheck construct. To learn more, visit:
* - https://www.checklyhq.com/docs/cli/
* - https://www.checklyhq.com/docs/cli/constructs-reference/#browsercheck
*/

import { BrowserCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs'

new BrowserCheck('upload-test', {
  name: 'Upload - Test',
  activated: true,
  muted: false,
  shouldFail: false,
  locations: ['ap-southeast-1', 'ap-southeast-3'],
  tags: [],
  sslCheckDomain: '',
  frequency: Frequency.EVERY_30M,
  environmentVariables: [
    { key: 'file_io_url', value: 'https://www.file.io/', locked: false },
    { key: 'mail_password', value: 'mbed-recn-uhva-ycsy', locked: false },
    { key: 'robert', value: 'robert.thomas01@proton.me', locked: false },
  ],
  code: {
    entrypoint: './upload-test.spec.ts',
  },
  retryStrategy: RetryStrategyBuilder.fixedStrategy({
    baseBackoffSeconds: 60,
    maxRetries: 2,
    maxDurationSeconds: 600,
    sameRegion: true,
  }),
})
