import { defineRule, configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import {
  alphaNumRegex,
  emailRegex,
  enRegex,
  enSearchRegex,
  kaRegex,
  kaSearchRegex,
  numRegex
} from '@/config/regex'

export default function veeValidate() {
  defineRule('required', (value: string) => {
    return !!value
  })

  defineRule('min', (value: string, [limit]: Array<number>) => {
    return value && value.length >= limit
  })

  defineRule('max', (value: string, [limit]: Array<number>) => {
    return value && value.length <= limit
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

  defineRule('en', (value: string) => {
    return enRegex.test(value)
  })

  defineRule('ka', (value: string) => {
    return kaRegex.test(value)
  })

  defineRule('num', (value: string) => {
    return numRegex.test(value)
  })

  defineRule('enSearch', (value: string) => {
    return enSearchRegex.test(value)
  })

  defineRule('kaSearch', (value: string) => {
    return kaSearchRegex.test(value)
  })

  configure({
    generateMessage: localize({
      en: {
        messages: {
          required: 'This field is required',
          min: 'This field must be at least 0:{min} characters',
          max: 'This field must be at max 0:{max} characters',
          alpha_num: 'This filed must contain only lowercase Latin characters and numbers',
          email: 'This field must be a valid email',
          confirmed: 'Passwords must match',
          en: 'This filed must contain only Latin characters',
          ka: 'This filed must contain only Georgian characters',
          num: 'This filed must contain only numbers',
          enSearch: 'This filed must contain @ or # followed by only Latin characters and numbers',
          kaSearch:
            'This filed must contain @ or # followed by only Georgian characters and numbers'
        }
      },
      ka: {
        messages: {
          required: 'ეს ველი სავალდებულოა',
          min: 'ეს ველი უნდა შეიცავდეს მინიმუმ 0:{min} სიმბოლოს',
          max: 'ეს ველი უნდა შეიცავდეს მაქსიმუმ 0:{min} სიმბოლოს',
          alpha_num:
            'ეს ველი უნდა შეიცავდეს მხოლოდ დაბალი რეგისტრის ლათინურ სიმბოლოებს და რიცხვებს',
          email: 'ეს ველი უნდა აკმაყოფილებდეს მეილის ფორმატს',
          confirmed: 'პაროლები უნდა ემთხვეოდეს',
          en: 'ეს ველი უნდა შეიცავდეს მხოლოდ ლათინურ სიმბოლოებს',
          ka: 'ეს ველი უნდა შეიცავდეს მხოლოდ ქართულ სიმბოლოებს',
          num: 'ეს ველი უნდა შეიცავდეს მხოლოდ რიცხვებს',
          enSearch:
            'ეს ველი უნდა იწყებოდეს @-ით ან #-ით და შეიცავდეს მხოლოდ ლათინურ სიმბოლოებს და რიცხვებს',
          kaSearch:
            'ეს ველი უნდა იწყებოდეს @-ით ან #-ით და შეიცავდეს მხოლოდ ქართულ სიმბოლოებს და რიცხვებს'
        }
      }
    })
  })
}
