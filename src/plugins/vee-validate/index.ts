import { defineRule, configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import { alphaNumRegex, emailRegex } from '@/config/regex'

export default function veeValidate() {
  defineRule('required', (value: string) => {
    return !!value
  })

  defineRule('min', (value: string, [limit]: Array<number>) => {
    return value.length >= limit
  })

  defineRule('max', (value: string, [limit]: Array<number>) => {
    return value.length <= limit
  })

  defineRule('alpha_num', (value: string) => {
    return alphaNumRegex.test(value)
  })

  defineRule('email', (value: string) => {
    return emailRegex.test(value)
  })

  defineRule('confirmed', (value: string, [target]: Array<string>, ctx) => {
    return value === ctx.form[target]
  })

  configure({
    generateMessage: localize({
      en: {
        messages: {
          required: 'This field is required',
          min: 'This field must be at least 0:{min} characters',
          max: 'This field must be at max 0:{max} characters',
          alpha_num: 'This filed must contain only lowercase latin characters and numbers',
          email: 'This field must be a valid email',
          confirmed: 'Passwords must match'
        }
      },
      ge: {
        messages: {
          required: 'ეს ველი სავალდებულოა',
          min: 'ეს ველი უნდა შეიცავდეს მინიმუმ 0:{min} სიმბოლოს',
          max: 'ეს ველი უნდა შეიცავდეს მაქსიმუმ 0:{min} სიმბოლოს',
          alpha_num: 'უნდა შეიცავდეს მხოლოდ დაბალი რეგისტრის ლათინურ სიმბოლოებს და რიცხვებს',
          email: 'უნდა აკმაყოფილებდეს მეილის ფორმატს',
          confirmed: 'პაროლები უნდა ემთხვეოდეს'
        }
      }
    })
  })
}
