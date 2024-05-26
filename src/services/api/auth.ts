import axios from '@/plugins/axios'
import type {
  ForgotPasswordCredentials,
  LoginCredentials,
  ResendVerificationCredentials,
  ResetPasswordCredentials,
  SignupCredentials
} from '@/types'

export const InitializeCSRFProtection = async () => {
  return await axios.get('/sanctum/csrf-cookie')
}

export const Signup = async (credentials: SignupCredentials) => {
  return await axios.post('/api/signup', credentials)
}

export const VerifyEmail = async (url: string) => {
  return await axios.get(url)
}

export const ResendVerification = async (credentials: ResendVerificationCredentials) => {
  return await axios.post('/api/email/verification-notification', credentials)
}

export const Login = async (credentials: LoginCredentials) => {
  return await axios.post('/api/login', credentials)
}

export const Logout = async () => {
  return await axios.post('/api/logout')
}

export const ForgotPassword = async (credentials: ForgotPasswordCredentials) => {
  return await axios.post('/api/forgot-password', credentials)
}

export const ResetPassword = async (url: string, credentials: ResetPasswordCredentials) => {
  return await axios.post(url, credentials)
}

export const RetrieveAuthUser = async () => {
  return await axios.get('/api/user')
}

export const GoogleRedirect = async () => {
  return await axios.get('/api/auth/google/redirect')
}

export const GoogleCallback = async (code: string) => {
  return await axios.get('/api/auth/google/callback', {
    params: {
      code: code
    }
  })
}
