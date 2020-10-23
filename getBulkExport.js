require('dotenv').config();
const moment = require("moment");
const timestamp = moment().utc().format();
const {getAuth} = require("./getAuth");
const fetch = require("node-fetch");

// Method to fetch stats from SkySlope
const getBulkExport = async (start) => {
    try {
        const {Session} = await getAuth();
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Session,
                timestamp,
            },
        };
        const url = `${process.env.STATS_URL}=${start}`;
        const values = await fetch(url, options);
        const results = JSON.parse((await values.text()).trim());
        return results;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    getBulkExport
};


