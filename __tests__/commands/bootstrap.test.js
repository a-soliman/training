const assert = require('assert').strict
const stdin = require('mock-stdin').stdin
const sinon = require('sinon')
const bootstrap = require('./../../src/commands/bootstrap')
const wait = require('./../wait')

describe('bootstrap', () => {
  const keys = { enter: '\x0D' }

  let io = null
  beforeEach(() => {
    io = stdin()
  })
  afterEach(() => {
    io.restore()
  })

  it('exits on bad yaml', async () => {
    sinon.stub(process, 'exit')
    await bootstrap(['fake-path', '--config', '__tests__/config.1.yaml'])
    assert(process.exit.called)
  })

  it('bootstraps', async () => {
    const promise = bootstrap([
      '__tests__',
      '--config',
      '__tests__/config.yaml'
    ])
    await wait()
    await wait()
    io.send('fake-name')
    io.send(keys.enter)
    return promise
  })

  it('displays usage', async () => {
    sinon.stub(process, 'exit')
    await bootstrap([])
  })

  it('displays help', async () => {
    sinon.stub(process, 'exit')
    await bootstrap(['--help'])
  })
})
