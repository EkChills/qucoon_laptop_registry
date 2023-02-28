export const setUserToLocalStorage = (user) => {
  localStorage.setItem('laptopUser', JSON.stringify(user))
}

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('laptopUser')
  if(result) {
    return JSON.parse(result)
  }
  return null
}