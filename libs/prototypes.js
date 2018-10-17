// converts milliseconds into a string representing time in days, hours etc
if (!Number.prototype.toDate) {
	Number.prototype.toDate = function () {
		let val = this
		let result = ''
		let timeUnits = {
			week: { amount: 0, secsIn: 604800000, name: 'week' },
			day: { amount: 0, secsIn: 86400000, name: 'day' },
			hour: { amount: 0, secsIn: 3600000, name: 'hour' },
			minute: { amount: 0, secsIn: 60000, name: 'minute' },
			second: { amount: 0, secsIn: 1000, name: 'second' }
		}

		for (const prop in timeUnits) {
			if (timeUnits.hasOwnProperty(prop)) {
				timeUnits[prop].amount = Math.floor(val / timeUnits[prop].secsIn)
				val -= timeUnits[prop].amount * timeUnits[prop].secsIn

				timeUnits[prop].name += (timeUnits[prop].amount > 1 ? 's' : '')
				result += (timeUnits[prop].amount != 0 ? `${timeUnits[prop].amount} ${timeUnits[prop].name} ` : '')
			}
		}

		return result
	}
} else {console.error(`Couldnt create method 'toDate', probably exists already.`)}

// yields values or indexes of a 2D array
if(!Array.prototype.all2D) {
	Array.prototype.all2D = function* (what) {
		let options = ['index', 'value']
		if (!options.some((name) => what == name))
			throw new Error('Return values not specified or not recognized')
	
		for (let i = 0; i < this.length; i++) {
			for (let j = 0; j < this[i].length; j++) {
				yield what == options[0] ? [i, j] : this[i][j]
			}
		}
		return
	}
} else {console.error(`Couldnt create method 'all2D', probably exists already.`)}
