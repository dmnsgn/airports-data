# airports-data [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

[![npm version](https://badge.fury.io/js/airports-data.svg)](https://www.npmjs.com/package/airports-data)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Airports data: static, dynamic and custom dump. Data from [OpenFlights Airports Database](https://openflights.org/data.html#airport).

## Installation

```bash
npm install airports-data
```

[![NPM](https://nodei.co/npm/airports-data.png)](https://nodei.co/npm/airports-data/)

## Usage

```js
const fs = require("fs");
const getAirportsData = require("airports-data");

process.on("unhandledRejection", err => {
  console.error(err);
  process.exit(1);
});

async function dumpData() {
  const data = await getAirportsData({
    dynamic: true,
    keys: ["name", "iata"]
  });
  fs.writeFileSync("airports.json", JSON.stringify(data));
}

dumpData();
```

## API

### `getAirportsData(options): Promise<AirportData[]>`

| Option              | Type                 | Default   | Description                                                                                                                          |
| ------------------- | -------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **options**         | object?              |           |                                                                                                                                      |
| **options.dynamic** | boolean?             | false     | Request the latest data online.                                                                                                      |
| **options.keys**    | string?[] \| string? | undefined | Apply a simple filtering to the loaded data (both statically and dynamically). Array of strings or string with comma separated keys. |

## CLI

```
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
```

## Data

| Key       | Description                                                                                                                                                                      |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id        | Unique OpenFlights identifier for this airport.                                                                                                                                  |
| name      | Name of airport. May or may not contain the City name.                                                                                                                           |
| city      | Main city served by airport. May be spelled differently from Name.                                                                                                               |
| country   | Country or territory where airport is located. See countries.dat to cross-reference to ISO 3166-1 codes.                                                                         |
| iata      | 3-letter IATA code. null if not assigned/unknown.                                                                                                                                |
| icao      | 4-letter ICAO code. null if not assigned.                                                                                                                                        |
| latitude  | Decimal degrees, usually to six significant digits. Negative is South, positive is North.                                                                                        |
| longitude | Decimal degrees, usually to six significant digits. Negative is West, positive is East.                                                                                          |
| altitude  | In feet.                                                                                                                                                                         |
| timezone  | Hours offset from UTC. Fractional hours are expressed as decimals, eg. India is 5.5.                                                                                             |
| dst       | Daylight savings time. One of E (Europe), A (US/Canada), S (South America), O (Australia), Z (New Zealand), N (None) or U (Unknown).                                             |
| tz        | Timezone in "tz" (Olson) format, eg. "America/Los_Angeles".                                                                                                                      |
| type      | Type of the airport. Value "airport" for air terminals, "station" for train stations, "port" for ferry terminals and "unknown" if not known.                                     |
| source    | Source of this data. "OurAirports" for data sourced from OurAirports, "Legacy" for old data not matched to OurAirports (mostly DAFIF), "User" for unverified user contributions. |

## License

MIT. See [license file](https://github.com/dmnsgn/airports-data/blob/master/LICENSE.md).
