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

export type UpdateProfileValues = {
  avatar?: File
  username?: string
  email?: string
  password?: string
  password_confirmation?: string
}

export type Genre = {
  id: number
  title: string
}

export type AddQuoteValues = {}

export type AddMovieValues = {
  title: {
    en: string
    ka: string
  }
  genres: Array<Genre>
  year: number
  directors: {
    en: string
    ka: string
  }
  description: {
    en: string
    ka: string
  }
  image: File
}

export type UpdateMovieValues = {}
