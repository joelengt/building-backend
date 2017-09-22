import messages from '/messages'
import {userRepository} from '/repository'

const debug = require('debug')('assistance-service:services:users')

class UserService {
  async getList (req, res) {
    try {
      let userService = await userRepository.getList()
      if (userService.status !== 200) {
        return res[`${userService.status}`]({success: false}, userService.message)
      }

      let payload = userService.data
      return res.ok(payload, messages.usersItemsFound)
    } catch (err) {
      return res['500']({success: false}, err)
    }
  }

  async create (req, res) {
    try {
      let userService = await userRepository.create(req.body)
      if (userService.status !== 201) {
        return res[`${userService.status}`]({success: false}, userService.message)
      }

      let payload = userService.data
      return res['201'](payload, userService.message)
    } catch (err) {
      return res['500']({success: false}, err)
    }
  }

  async getById (req, res) {
    try {
      let id = req.params.id
      let userService = await userRepository.getById(id)
      if (userService.status !== 200) {
        return res[`${userService.status}`]({success: false}, userService.message)
      }

      let payload = userService.data
      return res.ok(payload, messages.usersItemsFound)
    } catch (err) {
      return res['500']({success: false}, err)
    }
  }

  async updateById (req, res) {
    try {
      let userItemID = req.params.id
      let userData = req.body

      let userService = await userRepository.updateById(userData, userItemID)
      if (userService.status !== 200) {
        return res[`${userService.status}`]({success: false}, userService.message)
      }

      let payload = userService.data
      return res.ok(payload, messages.adsItemUpdated)
    } catch (err) {
      return res['500']({success: false}, err)
    }
  }

  async deleteById (req, res) {
    try {
      let id = req.params.id
      let userService = await userRepository.deleteById(id)
      if (userService.status !== 200) {
        return res[`${userService.status}`]({success: false}, userService.message)
      }

      let payload = userService.data
      return res.ok(payload, messages.usersItemsFound)
    } catch (err) {
      return res['500']({success: false}, err)
    }
  }
}

export default UserService
