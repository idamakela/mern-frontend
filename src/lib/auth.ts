const logIn = (jwt: string) => {
  localStorage.setItem('jwt', jwt)
}

const isLoggedIn = () => {
  return !!localStorage.getItem('jwt')
}

const getJWT = () => {
  localStorage.getItem('jwt')
}

const logOut = () => {
  localStorage.removeItem('jwt')
}

export default {
  logIn,
  logOut,
  isLoggedIn,
  getJWT,
}
