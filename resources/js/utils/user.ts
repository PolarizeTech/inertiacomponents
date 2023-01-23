export const userAvatarUrl = (user) => {
  const themeChrome = {'500': '#A7ABA6', '700': '#6F746D'},
        endpountUrl = 'https://ui-avatars.com/api'

  return `${endpountUrl}?name=${user.name}&color=${themeChrome[700]}&background=${themeChrome[500]}`
}