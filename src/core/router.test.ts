import { expect } from 'chai'
import sinon from 'sinon'

import Block from './block.ts'
import Router from './router.ts'

describe('Router', () => {
  const BlockMock = class {
    getContent = getContentFake
  } as unknown as typeof Block
  const getContentFake = sinon.stub()

  beforeEach(() => {
    getContentFake.returns(document.createElement('div'))
  })

  afterEach(() => {
    sinon.restore()
  })

  it('Use должен вернуть инстанс роутера', () => {
    const params = {
      block: BlockMock,
      pathname: '/',
    }

    const result = Router.use(params.pathname, params.block)

    expect(result).to.eq(Router)
  })

  it('Должен отрисовать страницу после запуска роутера', () => {
    const params = {
      block: BlockMock,
      pathname: '/',
    }

    Router.use(params.pathname, params.block).start()

    expect(getContentFake.callCount).to.eql(1)
  })
})
