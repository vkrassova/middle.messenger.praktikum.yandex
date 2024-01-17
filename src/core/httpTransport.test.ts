import sinon, { SinonFakeXMLHttpRequest } from 'sinon'
import { HTTPTransport } from './httpTransport.ts'
import { expect } from 'chai'

describe('HTTPTransport', () => {
  const xhr = sinon.useFakeXMLHttpRequest()
  const testUrl = '/test'
  const requests: sinon.SinonFakeXMLHttpRequest[] = []
  let transport: HTTPTransport

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.XMLHttpRequest = xhr

  xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
    requests.push(request)
  }

  beforeEach(() => {
    transport = new HTTPTransport(testUrl)
  })

  afterEach(() => {
    requests.length = 0
  })

  it('.get() should send GET request', () => {
    transport.get(testUrl)

    const [request] = requests

    expect(request.method).to.eq('Get')
  })

  it('.post() should send POST request', () => {
    transport.post('/url', { data: { test: 'test' } })

    expect(requests[0].method).to.eq('Post')
  })
})
