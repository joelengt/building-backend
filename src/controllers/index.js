import UserController from './users'
import MenuController from './menu'
import OrdersController from './orders'
import ClientsController from './clients'

const userController = new UserController()
const menuController = new MenuController()
const ordersController = new OrdersController()
const clientsController = new ClientsController()

export {
  userController,
  menuController,
  ordersController,
  clientsController
}
