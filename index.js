var rp = require('request-promise'),
		jp = require('jsonfile'),
		db = require('mongojs')('football',
			['soccerleagues', 'leaguetables', 'teams']),
		options = require('./config');

jp.readFile('soccerleagues.json', (err, data) => {
	var links = data.map((doc) => {
		return [doc._links.teams.href, doc._links.leagueTable.href];
	});

	db.soccerleagues.insert(data, (err, doc) => {
		if (err) {
			console.error(err);
			return 0;
		}

		console.info(`Data insertada con éxito`);
	});

	links.forEach((linkMap) => {
		var ref = linkMap[0].split('/'),
				index = ref[ref.length - 2];

		options.uri = linkMap[0];
		rp(options).then((data) => {
			db.teams.insert(JSON.parse(data), (err) => {
				if (err) return err;

				console.info(`Registro ${index} insertado con éxito en la colección 'teams'`);
			});
		}).catch((err) => {
			if (err !== null) {
				console.error(err.error);
			}
		});

		options.uri = linkMap[1];
		rp(options).then((data) => {
			db.leaguetables.insert(JSON.parse(data), (err) => {
				if (err) return err;

				console.info(`Registro ${index} insertado con éxito en la colección 'leaguetables'`);
			});
		}).catch((err) => {
			if (err !== null) {
				console.error(err.error);
			}
		});
	});
});

