const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const parse = require("csv-parse");
const numberIsFloat = require("number-is-float");

const URL =
  "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat";

const parseData = (data, options) =>
  new Promise((resolve, reject) => {
    parse(
      data,
      {
        cast(value, context) {
          if (value === "\\N") {
            return null;
          } else if (Number.isInteger(+value)) {
            return parseInt(value);
          } else if (numberIsFloat(+value)) {
            return parseFloat(value);
          }

          return value;
        },
        escape: "\\",
        columns: options.columns
      },
      (err, output) => (err ? reject(err) : resolve(output))
    );
  });

const getStaticData = () =>
  JSON.parse(
    fs.readFileSync(path.join(__dirname, "airports.json"), { encoding: "utf8" })
  );

const getDynamicData = () =>
  fetch(URL)
    .then(res => res.text())
    .catch(err => console.error(err));

const defaultOptions = {
  dynamic: false,
  columns: [
    "id",
    "name",
    "city",
    "country",
    "iata",
    "icao",
    "latitude",
    "longitude",
    "altitude",
    "timezone",
    "dst",
    "tz",
    "type",
    "source"
  ],
  keys: undefined
};

async function getAirportsData({ keys, ...opts }) {
  const options = {
    ...defaultOptions,
    ...opts,
    keys: typeof keys === "string" ? keys.split(",") : keys
  };

  let data;

  if (options.dynamic) {
    data = await getDynamicData();
    data = await parseData(data, options);
  } else {
    data = getStaticData();
  }

  if (options.keys) {
    data = data.map(airport =>
      options.keys.reduce((prev, key) => ({ ...prev, [key]: airport[key] }), {})
    );
  }

  return data;
}

module.exports = getAirportsData;
