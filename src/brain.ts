class Brain {
	brain: 

	constructor(public source: string) {
		fetch(source)
			.then(res => res.json())
			.then(json => this.)
	}
}

interface Choice {
	x: number,
	y: number,
	fitness: number
}
