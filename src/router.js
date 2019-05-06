import express from 'express'
import {
	createUser,
	getAllUsers,
	addExercise,
	getUserExerciseLog
} from './controllers'

const router = express.Router()

router.post('/new-user', createUser)
router.post('/add', addExercise)
router.get('/log', getUserExerciseLog)
router.get('/users', getAllUsers)

export default router
