
import uuid from 'uuid'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

import messages from '/messages'

import {
  noop,
  encryptPassword
} from '/utils'

var sql = require('/initializers/knex')
var tokenSecret = process.env.JWT_SECRET

const debug = require('debug')('assistance-service:repository:users')

const verifyEmail = async (email) => {
  let user = await sql('user')
  .where({email})
  .limit(1)
  .spread(noop)

  let status
  let msg
  if (user !== undefined) {
    status = 400
    msg = `Ya existe un usuario con el correo ${email}`
  } else {
    status = 200
    msg = `El email ${email} esta disponible`
  }

  let payload = {
    status: status,
    message: msg
  }
  return payload
}

class UserRepository {
  async getList () {
    try {
      // Get users from database
      let attributes = [
        'user.uuid AS id',
        'user.name AS name',
        'user.last_name AS last_name',
        'user.photo AS photo',
        'user.email AS email',
        'user.phone AS phone',
        'user.business_name AS business_name',
        'user.fiscal_name AS fiscal_name',
        'user.fiscal_address AS fiscal_address',
        'user.ruc AS ruc',
        'user.dni AS dni',
        'user.points AS points',
        'user.provider AS provider',
        'user.onboard_finished AS onboard_finished',
        'user.access_token AS access_token',
        'user.refresh_token AS refresh_token',
        'user.is_admin AS is_admin',
        'user.is_active AS is_active',
        'user.is_email_verified AS is_email_verified',
        'user.is_archived AS is_archived',
        'user.created_at AS created_at',
        'user.updated_at AS updated_at',
        'user.archived_at AS archived_at'
      ]

      let users = await sql('user')
      .select(attributes)

      if (users.length === 0) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      let payload = {
        status: 200,
        data: {
          items: users
        },
        message: messages.usersItemsFound
      }
      return payload
    } catch (err) {
      let payload = {
        status: 500,
        message: err
      }
      return payload
    }
  }

  async create (userData) {
    try {
      // Validate body data
      if (userData.name === undefined ||
        userData.last_name === undefined ||
        userData.email === undefined ||
        userData.password === undefined ||
        userData.name === '' ||
        userData.last_name === '' ||
        userData.email === '' ||
        userData.password === '') {
        let payload = {
          status: 400,
          message: messages.userCreateBadRequest
        }
        return payload
      }

      // Get body data
      let user = {
        uuid: uuid.v1(),
        name: userData.name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
        photo: userData.photo || 'https://res.cloudinary.com/riqra/image/upload/profile.png'
      }

      user.provider = userData.provider || 'local'
      user.provider_id = userData.provider_id || null

      // email verification
      let emailAvailable = await verifyEmail(user.email)
      if (emailAvailable.status === 400) {
        return emailAvailable
      }

      // create token email verification
      user.token_email_verification = jwt.sign(uuid.v1(), tokenSecret)

      // create encrypt password
      user.password_salt = crypto.randomBytes(16).toString('base64')
      user.secure_password = encryptPassword(user.password, user.password_salt)
      delete user.password

      // create token and refresh token - exp: 15 days
      let token = jwt.sign(user, tokenSecret, { expiresIn: 60 * 60 * 24 * 15 })
      let refreshToken = jwt.sign(uuid.v1(), tokenSecret)
      user.access_token = token
      user.refresh_token = refreshToken

      // Create new user
      let userCreate = await sql('user')
      .insert(user)
      .returning('*')
      .catch((err) => {
        let payload = {
          status: 400,
          data: {
            error: err.detail
          },
          message: 'Error en los campos'
        }
        return payload
      })
      .spread(noop)

      if (userCreate.status) {
        return userCreate
      }

      let userId = userCreate.id

      // Find element ads created
      let attributes = [
        'user.uuid AS id',
        'user.name AS name',
        'user.last_name AS last_name',
        'user.photo AS photo',
        'user.email AS email',
        'user.phone AS phone',
        'user.business_name AS business_name',
        'user.fiscal_name AS fiscal_name',
        'user.fiscal_address AS fiscal_address',
        'user.ruc AS ruc',
        'user.dni AS dni',
        'user.points AS points',
        'user.provider AS provider',
        'user.access_token AS access_token',
        'user.token_email_verification AS token_email_verification',
        'user.refresh_token AS refresh_token',
        'user.onboard_finished AS onboard_finished',
        'user.is_admin AS is_admin',
        'user.is_active AS is_active',
        'user.is_email_verified AS is_email_verified',
        'user.is_archived AS is_archived',
        'user.created_at AS created_at',
        'user.updated_at AS updated_at',
        'user.archived_at AS archived_at'
      ]

      let userItem = await sql('user')
      .select(attributes)
      .where('id', userId)
      .spread(noop)

      if (userItem === undefined) {
        let payload = {
          status: 400,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      // remove token_email_verification from payload
      userItem = _.omit(userItem, ['token_email_verification'])

      let payload = {
        status: 201,
        data: {
          item: userItem
        },
        message: messages.userItemCreated
      }

      return payload
    } catch (err) {
      let payload = {
        status: 500,
        message: err
      }
      return payload
    }
  }

  async getById (id) {
    try {
      let userId = id

      let attributes = [
        'user.uuid AS id',
        'user.name AS name',
        'user.last_name AS last_name',
        'user.photo AS photo',
        'user.email AS email',
        'user.phone AS phone',
        'user.business_name AS business_name',
        'user.fiscal_name AS fiscal_name',
        'user.fiscal_address AS fiscal_address',
        'user.ruc AS ruc',
        'user.dni AS dni',
        'user.points AS points',
        'user.provider AS provider',
        'user.onboard_finished AS onboard_finished',
        'user.access_token AS access_token',
        'user.refresh_token AS refresh_token',
        'user.is_admin AS is_admin',
        'user.is_active AS is_active',
        'user.is_email_verified AS is_email_verified',
        'user.is_archived AS is_archived',
        'user.created_at AS created_at',
        'user.updated_at AS updated_at',
        'user.archived_at AS archived_at'
      ]

      let userItem = await sql('user')
      .select(attributes)
      .where('uuid', userId)
      .spread(noop)

      // Validate element found
      if (userItem === undefined) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      let payload = {
        status: 200,
        data: {
          item: userItem
        },
        message: messages.usersItemsFound
      }

      return payload
    } catch (err) {
      let payload = {
        status: 500,
        message: err
      }
      return payload
    }
  }

  async updateById (userData, id) {
    try {
      // Validate body data
      if (userData.business_type_id === undefined ||
        userData.name === undefined ||
        userData.last_name === undefined ||
        userData.email === undefined ||
        userData.phone === undefined ||
        userData.business_name === undefined ||
        userData.fiscal_name === undefined ||
        userData.fiscal_address === undefined ||
        userData.ruc === undefined ||
        userData.dni === undefined ||
        userData.photo === undefined ||
        userData.password === undefined ||
        userData.business_type_id === '' ||
        userData.name === '' ||
        userData.last_name === '' ||
        userData.email === '' ||
        userData.phone === '' ||
        userData.business_name === '' ||
        userData.fiscal_name === '' ||
        userData.fiscal_address === '' ||
        userData.ruc === '' ||
        userData.dni === '' ||
        userData.photo === '' ||
        userData.password === '') {
        let payload = {
          status: 400,
          message: messages.userCreateBadRequest
        }
        return payload
      }

      // Get body data
      let currentUser = await sql('user')
      .where('uuid', id)
      .spread(noop)

      if (!currentUser) {
        let payload = {
          status: 404,
          message: messages.usersItemsNotFound
        }
        return payload
      }

      if (currentUser.email !== userData.email && userData.email) {
        let emailAvailable = await verifyEmail(userData.email)
        if (emailAvailable.status === 400) {
          return emailAvailable
        }
      }

      let userItemID = currentUser.id

      let user = {
        name: userData.name || currentUser.name,
        last_name: userData.last_name || currentUser.last_name,
        email: userData.email || currentUser.email,
        phone: userData.phone || currentUser.phone,
        business_name: userData.business_name || currentUser.business_name,
        fiscal_name: userData.fiscal_name || currentUser.fiscal_name,
        fiscal_address: userData.fiscal_address || currentUser.fiscal_address,
        ruc: userData.ruc || currentUser.ruc,
        dni: userData.dni || currentUser.dni,
        photo: userData.photo || currentUser.photo,
        points: userData.points || currentUser.points
      }

      // update attributes
      let userItemToUpdated = await sql('user')
      .update(user)
      .where({id: userItemID})

      // Validate element updated
      if (!userItemToUpdated) {
        let payload = {
          status: 400,
          message: messages.adsItemNotFound
        }
        return payload
      }

      // Find element updated
      let attributes = [
        'user.uuid AS id',
        'user.name AS name',
        'user.last_name AS last_name',
        'user.photo AS photo',
        'user.email AS email',
        'user.phone AS phone',
        'user.business_name AS business_name',
        'user.fiscal_name AS fiscal_name',
        'user.fiscal_address AS fiscal_address',
        'user.ruc AS ruc',
        'user.dni AS dni',
        'user.points AS points',
        'user.provider AS provider',
        'user.onboard_finished AS onboard_finished',
        'user.access_token AS access_token',
        'user.refresh_token AS refresh_token',
        'user.is_admin AS is_admin',
        'user.is_active AS is_active',
        'user.is_email_verified AS is_email_verified',
        'user.is_archived AS is_archived',
        'user.created_at AS created_at',
        'user.updated_at AS updated_at',
        'user.archived_at AS archived_at'
      ]

      let userItemElement = await sql('user')
      .select(attributes)
      .where('id', userItemID)
      .spread(noop)

      let payload = {
        status: 200,
        data: {
          item: userItemElement
        },
        message: messages.adsItemUpdated
      }
      return payload
    } catch (err) {
      let payload = {
        status: 500,
        message: err
      }
      return payload
    }
  }

  async deleteById (id) {
    try {
      var userId = id
      let result = await sql('user')
      .where('uuid', userId)
      .del()
      .then((itemDeleted) => {
        if (!itemDeleted) {
          let payload = {
            status: 404,
            message: messages.usersItemsNotFound
          }
          return payload
        }

        let payload = {
          status: 200,
          data: {
            id: userId
          },
          message: messages.userItemDeleted
        }
        return payload
      })

      return result
    } catch (err) {
      let payload = {
        status: 500,
        message: err
      }
      return payload
    }
  }
}

export default UserRepository
