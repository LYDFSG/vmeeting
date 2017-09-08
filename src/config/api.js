import Vue from 'vue'
import resource from 'vue-resource'

Vue.use(resource)

// get请求
function get (url) {

  // 拼接请求字符串
  let URI = HOST + encodeURI(encodeURI(url))

  // // 获取 token
  // let appendHttpHeaders = JSON.parse(localStorage.getItem('LMS-APPEND-HTTP-HEADERS'))

  // Vue.http.headers.common['account'] = appendHttpHeaders.account
  // Vue.http.headers.common['version'] = appendHttpHeaders.version
  // Vue.http.headers.common['clientOSType'] = appendHttpHeaders.clientOSType
  // Vue.http.headers.common['token'] = appendHttpHeaders.token
  // // Vue.http.headers.common['ContentType']="charset=utf-8"

  let foo = function* () {
    yield Vue.http.get(URI)
  }

  return foo().next().value
}

// get 请求
function getBare (url) {
  let URI = HOST + encodeURI(encodeURI(url))
  Vue.http.headers.common['ContentType']="charset=utf-8"

  let foo = function* () {
    yield Vue.http.get(URI)
  }

  return foo().next().value
}

// post请求 不带header
function postBare (url, data) {
  let URI = HOST + url

  Vue.http.headers.common['ContentType']="charset=utf-8"

  let foo = function* (data) {
    yield Vue.http.post(URI, data)
  }
  return foo(data).next().value
}

// post请求
function post (url, data) {
  let URI = HOST + url
  let appendHttpHeaders = JSON.parse(localStorage.getItem('LMS-APPEND-HTTP-HEADERS'))
  Vue.http.headers.common['account'] = appendHttpHeaders.account
  Vue.http.headers.common['version'] = appendHttpHeaders.version
  Vue.http.headers.common['clientOSType'] = appendHttpHeaders.clientOSType
  Vue.http.headers.common['token'] = appendHttpHeaders.token
  Vue.http.headers.common['ContentType']="charset=utf-8"
  let foo = function* (data) {
    yield Vue.http.post(URI, data)
  }
  return foo(data).next().value
}

let apiCall = {
  get: get,
  getBare: getBare,
  postBare: postBare,
  post: post
}

export const ApiCall = apiCall
