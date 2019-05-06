import moment from 'moment'

import { Exercise, User } from '../models'

const getValidDate = date => {
	if (!date) {
		return new Date()
	} else {
		return moment(date).isValid() ? new Date(date) : null
	}
}

const getValidUser = (req, res, userId, callback) =>
	User.findById(userId, (err, data) => {
		err ? res.json('Error: Invalid User ID') : callback(data)
	})

export const createUser = (req, res) => {
	const { username } = req.body
	// create new user
	const user = new User({ username })
	user.save((err, data) => {
		// does username exist in db already?
		err && err.code === 11000
			? res.json('Error: That username is taken. Try a different one.')
			: res.json({ username: data.username, _id: data._id })
	})
}

export const getAllUsers = (req, res) => {
	User.find()
		.select('username _id')
		.exec((err, data) => {
			err
				? res.json('Error: There was an error retrieving users.')
				: res.json(data)
		})
}

export const addExercise = (req, res) => {
	const { userId, description, duration, date } = req.body
	const datetime = getValidDate(date)

	if (!userId || !description || !duration) {
		return res.json('Error: You have not entered enough information.')
	}

	if (!datetime) {
		return res.json('Error: You have entered an invalid date.')
	}

	getValidUser(req, res, userId, user => {
		const exercise = new Exercise({
			userId,
			description,
			duration,
			date: datetime
		})

		exercise.save((err, data) => {
			err
				? res.json('Error: There was an error saving your exercise')
				: res.json({
						_id: user._id,
						username: user.username,
						description: data.description,
						duration: data.duration,
						date: moment(data.date).format('ddd, DD MMM YYYY')
				  })
		})
	})
}

export const getUserExerciseLog = (req, res) => {
	const { userId, from, to, limit } = req.query

	getValidUser(req, res, userId, user => {
		Exercise.find({
			userId: user._id,
			date: { $gt: from || 0, $lt: to || moment() }
		})
			.limit(parseInt(limit))
			.select('-_id description duration date')
			.exec((err, data) => {
				res.json({
					_id: user._id,
					username: user.username,
					count: (data && data.length) || 0,
					log: data || []
				})
			})
	})
}
