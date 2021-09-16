import crypto from 'crypto'

/////////////////////////////////////////////////////////////////
///		hash
/////////////////////////////////////////////////////////////////
export const hash = (value: string | number) => {
  var shasum = crypto.createHash('sha1');
  shasum.update(String(value))
  const hex = (parseInt(shasum.digest('hex'), 16) % 0xFFFFFF).toString(16).match(/.{2}/g) ?? ['AA', 'AA', 'AA']
  const r = parseInt(hex[0], 16)
  const g = parseInt(hex[1], 16)
  const b = parseInt(hex[2], 16)

  return `rgb(${r},${g},${b})`
}
