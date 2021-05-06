import Cookies from 'js-cookie'

const TokenKey = 'hr_token'
const TimeKey = 'hr_time'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTime() {
  return Cookies.get(TimeKey)
}

export function setTime() {
  const date = new Date()
  return Cookies.get(TimeKey, date.getTime())
}
