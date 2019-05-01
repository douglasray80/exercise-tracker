import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import router from './router'

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(__dirname + 'index.html'))

app.use('/api/exercise', router)

mongoose.connect(
	process.env.MONGO_URI,
	{
		useNewUrlParser: true,
		useCreateIndex: true
	},
	(err, db) => {
		if (err) {
			console.log('Database error: ' + err)
		} else {
			console.log('Successful database connection')

			app.listen(process.env.PORT || 4000, () => {
				console.log('Your app is listening on port 4000')
			})
		}
	}
)
