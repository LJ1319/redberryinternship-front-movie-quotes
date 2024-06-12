import axios from '@/plugins/axios'
import type {
  ForgotPasswordCredentials,
  LoginCredentials,
  ResendVerificationCredentials,
  ResetPasswordCredentials,
  SignupCredentials
} from '@/types'

export const initializeCSRFProtection = async () => {
  return await axios.get('/sanctum/csrf-cookie')
}

export const Signup = async (credentials: SignupCredentials) => {
  return await axios.post('/api/signup', credentials)
}

export const verifyEmail = async (url: string) => {
  return await axios.get(url)
}

export const resendVerification = async (credentials: ResendVerificationCredentials) => {
  return await axios.post('/api/email/verification-notification', credentials)
}

export const login = async (credentials: LoginCredentials) => {
  return await axios.post('/api/login', credentials)
}

export const logout = async () => {
  return await axios.post('/api/logout')
}

export const forgotPassword = async (credentials: ForgotPasswordCredentials) => {
  return await axios.post('/api/forgot-password', credentials)
}

export const resetPassword = async (url: string, credentials: ResetPasswordCredentials) => {
  return await axios.post(url, credentials)
}

export const googleRedirect = async () => {
  return await axios.get('/api/auth/google/redirect')
}

export const googleCallback = async (code: string) => {
  return await axios.get('/api/auth/google/callback', {
    params: {
      code: code
    }
  })
}
