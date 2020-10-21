require('dotenv').config();
const moment = require("moment");
const timestamp = moment().utc().format();
const {getAuth} = require("./getAuth");
const fetch = require("node-fetch");

// Method to fetch stats from SkySlope
const getBulkExport = async (start) => {
    try {
        const session = await getAuth();
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Session: session.Session,
                Timestamp: timestamp,
            },
        };
        const url = `${process.env.STATS_URL}=${start}`;
        const values = await fetch(url, options);
        const toText = await values.text();
        const str = JSON.stringify(eval('(' + toText + ')'));
        const results = JSON.parse(str);
        return results;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    getBulkExport
};


