import auth from '../lib/auth'

const profile = async () => {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/profile', {
    headers: {
      'Authorization': `Bearer ${auth.getJWT()}`,
    },
    method: 'GET',
  })

  if (!response.ok) {
    const { message } = await response.json()
    return { message }
  }

  const profile = await response.json()

  return profile
}

export default { profile }
