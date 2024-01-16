import { expect } from 'chai'
import type BlockType from './block.ts'
import sinon from 'sinon'
import { Button } from '../components/index.ts'
import Block from './block.ts'

const testComponent = new Button({})

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
}

describe('Block', () => {
  describe('Block: render', () => {
    it('should component render correctly', () => {
      expect((testComponent as unknown as BlockType).getContent()?.innerHTML === 'Test')
    })
  })

  class ComponentMock extends Block {}

  it('should fire init event on initialization', () => {
    new ComponentMock({})

    expect(eventBusMock.emit.calledWith(ComponentMock.EVENTS.INIT)).to.be.false
  })
})
