/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function validModile(str) {
  const pattern = /^1[35789]\d{9}$/
  return pattern.test(str)
}
