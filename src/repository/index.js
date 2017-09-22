import UserRepository from './user'
import MenuRepository from './menu'

const userRepository = new UserRepository()
const menuRepository = new MenuRepository()

export {
  userRepository,
  menuRepository
}
