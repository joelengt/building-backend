import UserService from './user'
import MenuService from './menu'

const usersService = new UserService()
const menuService = new MenuService()

export {
  usersService,
  menuService
}
