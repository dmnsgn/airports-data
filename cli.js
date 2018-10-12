#!/usr/bin/env node

const meow = require("meow");
const getAirportsData = require("./");

const cli = meow(
  `
	Usage
	  $ airports-data

	Options
	  --dynamic, -d  Get data from https://openflights.org/data.html#airport instead of the local dump [Default: false]
	  --keys, -k  Keys to include [Default:
      id
      name
      city
      country
      iata
      icao
      latitude
      longitude
      altitude
      timezone
      dst
      tz
      type
      source
    ]

	Examples
	  $ airports-data
	  [..., {"id":1382,"name":"Charles de Gaulle International Airport","city":"Paris","country":"France","iata":"CDG","icao":"LFPG","latitude":49.0127983093,"longitude":2.54999995232,"altitude":392,"timezone":1,"dst":"E","tz":"Europe/Paris","type":"airport","source":"OurAirports"}, ...]
	  $ airports-data --keys name,iata
	  [..., {"name":"Charles de Gaulle International Airport","iata":"CDG"}, ...]
`,
  {
    flags: {
      dynamic: {
        type: "boolean",
        alias: "d"
      },
      keys: {
        type: "string",
        alias: "k"
      }
    }
  }
);

process.on("unhandledRejection", err => {
  console.error(err);
  process.exit(1);
});

async function getData() {
  const data = await getAirportsData(cli.flags);
  process.stdout.write(JSON.stringify(data));
}

getData();
