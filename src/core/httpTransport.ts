export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete',
}

type Options = {
  method: Method
  headers?: Record<string, string>
  data?: any
}

// function queryStringify(data: ObjectType) {
//   if (typeof data !== 'object') {
//     throw new Error('Data must be object')
//   }

//   const keys = Object.keys(data)
//   return keys.reduce((result, key, index) => {
//     return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`
//   }, '?')
// }

export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2'
  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`
  }

  public get<Response>(path = '/'): Promise<Response> {
    return this.request<Response>(this.endpoint + path)
  }

  public put<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Put,
      data,
    })
  }
  public post<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Post,
      data,
    })
  }

  public patch<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Patch,
      data,
    })
  }

  public delete<Response>(path: string): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Delete,
    })
  }

  public request<Response>(url: string, options: Options = { method: Method.Get }): Promise<Response> {
    const { method, data } = options

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method')
        return
      }

      const xhr = new XMLHttpRequest()

      xhr.open(method, url)

      // Object.keys(headers).forEach((key) => {
      //   xhr.setRequestHeader(key, headers[key])
      // })

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response)
          } else {
            reject(xhr.response)
          }
        }
      }

      xhr.onabort = () => reject({ reason: 'abort' })
      xhr.onerror = () => reject({ reason: 'network error' })
      xhr.ontimeout = () => reject({ reason: 'timeout' })

      xhr.setRequestHeader('Content-Type', 'application/json')

      xhr.withCredentials = true
      xhr.responseType = 'json'

      if (method === Method.Get || !data) {
        xhr.send()
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
