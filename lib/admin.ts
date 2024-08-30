import { auth } from '@clerk/nextjs/server'

const adminIds = ['user_2dGb6YEarBAQHrNYoB5dMtI5RWK']

export const isAdmin = () => {
  const { userId } = auth()
  if (!userId) {
    return false
  }
  return adminIds.indexOf(userId) !== -1
}
