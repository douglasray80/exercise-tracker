import express from 'express'

import { Exercise, User } from './models'

const Router = express.Router()

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

export default Router
