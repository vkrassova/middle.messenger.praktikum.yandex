import { SignInData } from '../models/user'

export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete',
}

type Options = {
  method?: keyof typeof Method
  headers?: Record<string, string>
  data?: SignInData | unknown
  withCridentials?: boolean
  timeout?: number
}

type HTTPMethod = <R = unknown>(url: string, options?: Options | unknown) => Promise<R>

export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2'
  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`
  }

  public get: HTTPMethod = (path) => {
    return this.request(this.endpoint + path, { method: Method.Get })
  }

  public put: HTTPMethod = (path, data) => {
    return this.request(this.endpoint + path, {
      method: Method.Put,
      data,
    })
  }
  public post: HTTPMethod = (path, data) => {
    return this.request(this.endpoint + path, {
      method: Method.Post,
      data,
    })
  }

  public patch: HTTPMethod = (path, data) => {
    return this.request(this.endpoint + path, {
      method: Method.Patch,
      data,
    })
  }

  public delete: HTTPMethod = (path, data) => {
    return this.request(this.endpoint + path, {
      method: Method.Delete,
      data,
    })
  }

  public request<Response>(url: string, options: Options = { method: Method.Get }): Promise<Response> {
    const { method, data, withCridentials = true } = options

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method')
        return
      }

      const xhr = new XMLHttpRequest()

      xhr.open(method, url)

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

      xhr.withCredentials = withCridentials
      xhr.responseType = 'json'

      if (method === Method.Get || data == null) {
        xhr.send()
      } else if (data instanceof FormData) {
        xhr.send(data)
      } else if (data instanceof File) {
        const formData = new FormData()
        formData.append('avatar', data)
        xhr.send(formData)
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
