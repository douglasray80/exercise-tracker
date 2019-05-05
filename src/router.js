import express from 'express'

import { Exercise, User } from './models'
import { runInNewContext } from 'vm'

const Router = express.Router()

// I can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and \_id.
Router.post('/new-user', (req, res, next) => {
	const { username } = req.body
	// create new user
	const user = new User({ username })
	user.save((err, data) => {
		console.log(data, 'Person saved')
		// send username and id in response to client
		return res.json({ username: data.username, _id: data._id })
	})
	// does username exist in db already?
})

// I can get an array of all users by getting api/exercise/users with the same info as when creating a user.
Router.get('/users', (req, res, next) => {
	User.find()
		.select('username _id')
		.exec((err, data) => {
			// console.log(data)
			return res.json(data)
		})
})

// I can add an exercise to any user by posting form data userId(\_id), description, duration, and optionally date to /api/exercise/add.
// If no date supplied it will use current date. Returned will the the user object with the exercise fields added.
Router.post('/add', (req, res, next) => {
	const { userId, description, duration } = req.body
	const exercise = new Exercise({ userId, description, duration })
	const date = req.body.date || new Date()

	if (!userId || !description || !duration) {
		return console.log('empty fields')
	}

	exercise.save((err, data) => {
		console.log(data)
	})
})

// I can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(\_id).
// Return will be the user object with added array log and count (total exercise count).

// I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)

export default Router
