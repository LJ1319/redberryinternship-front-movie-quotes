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

export type Comment = {
  id: number
  user_id: string
  body: string
  username: string
  user_avatar: string
}

export type Quote = {
  id: number
  title: string
  image: string
  username: string
  user_avatar: string
  movie_title: string
  movie_year: string
  likes: number
  isLiked: boolean
  comments: Array<Comment>
  translations: {
    title: {
      en: string
      ka: string
    }
  }
}

export type QuoteFormRequest = {
  title: {
    en: string
    ka: string
  }
  image: File
  movie_id: number
}

export type Genre = {
  id: number
  title: string
}

export type MovieList = {
  id: number
  image: string
  title: string
  year: string
  quotes: number
}

export type Movie = {
  id: number
  image: string
  title: string
  year: string
  genres: Array<Genre>
  directors: string
  description: string
  quotes: Array<Quote>
  translations: {
    title: {
      en: string
      ka: string
    }
    directors: {
      en: string
      ka: string
    }
    description: {
      en: string
      ka: string
    }
  }
}

export type MovieFormRequest = {
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

export type CommentFormRequest = {
  body: string
}

export type QuoteSearchFormRequest = {
  title?: string
  movie_title?: string
}

export type MovieSearchFormRequest = {
  title: string
}

export type Notification = {
  id: string
  type: string
  interaction: string
  quote_id: string
  username: string
  user_avatar: string
  interacted_at: string
  read_at: string | null
}
