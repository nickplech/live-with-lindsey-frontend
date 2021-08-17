export default function formatPhoneNumber(phoneNumberString) {
  if (!phoneNumberString) return
  var s = phoneNumberString
  while (s.charAt(0) === '1') {
    s = s.substr(1)
  }
  console.log(s)
  var cleaned = ('' + s).replace(/\D/g, '')
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return null
}
