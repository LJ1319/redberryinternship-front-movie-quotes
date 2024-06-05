export type SignupCredentials = {
  username: string
  email: string
  password: string
  password_confirmation: string
}

export type ResendVerificationCredentials = {
  email: string
}

export type LoginCredentials = {
  email: string
  password: string
  remember: boolean
}

export type ForgotPasswordCredentials = {
  email: string
}

export type ResetPasswordCredentials = {
  token: string
  email: string
  password: string
  password_confirmation: string
}

export type User = {
  id: number
  username: string
  email: string
  avatar: string
  isGoogleUser: boolean
}

export type ProfileUpdateData = {
  avatar?: string
  username?: string
  email?: string
  password?: string
  password_confirmation?: string
}
