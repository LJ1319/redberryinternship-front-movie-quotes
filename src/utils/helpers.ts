export function setCookie(cName: string, cValue: null | Object, expDays: number) {
  const date: Date = new Date()
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000)
  const expires: string = `expires=${date.toUTCString()}`

  document.cookie = `${cName}=${cValue}; ${expires}; path=/; SameSite=Strict;`
}

export function getCookie(cName: string): string {
  const name: string = `${cName}=`
  const cDecoded: string = decodeURIComponent(document.cookie)
  const cArr: string[] = cDecoded.split('; ')

  let res: string = ''
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length)
  })

  return res
}

export function isObjEmpty(obj: Object) {
  if (!obj) return

  return JSON.stringify(obj) === '{}'
}
