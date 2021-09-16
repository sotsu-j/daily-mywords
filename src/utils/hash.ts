import crypto from 'crypto'

/////////////////////////////////////////////////////////////////
///		hash
/////////////////////////////////////////////////////////////////
export const getHash = (value: string | number = (new Date()).getTime()) => {
  var shasum = crypto.createHash('sha1');
  shasum.update(String(value))
  return shasum.digest('hex')
}
