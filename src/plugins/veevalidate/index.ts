import { defineRule } from 'vee-validate'
import { alphaNumRegex, emailRegex } from '@/config/regex'

export default function veevalidate() {
  defineRule('required', (value: string) => {
    if (!value) {
      return 'This field is required'
    }

    return true
  })

  defineRule('min', (value: string, [limit]: Array<number>) => {
    if (value.length < limit) {
      return `This field must be at least ${limit} characters`
    }

    return true
  })

  defineRule('max', (value: string, [limit]: Array<number>) => {
    if (value.length > limit) {
      return `This field must be max ${limit} characters`
    }

    return true
  })

  defineRule('alpha_num', (value: string) => {
    if (!alphaNumRegex.test(value)) {
      return 'This filed must contain only lowercase latin characters and numbers'
    }

    return true
  })

  defineRule('email', (value: string) => {
    if (!emailRegex.test(value)) {
      return 'This field must be a valid email'
    }

    return true
  })

  defineRule('confirmed', (value: string, [target]: Array<number>, ctx) => {
    if (value === ctx.form[target]) {
      return true
    }
    return 'Passwords must match'
  })
}
