class Station {
	static fromObject(object) {
		let station = new Station();
		station.name = object['Name'];
		station.id = object['SiteId'];
		station.x = object['X'];
		station.y = object['X'];
		return station;
	}

	toString() {
		return this.name;
	}
}

module.exports = Station;