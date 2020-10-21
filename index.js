require("dotenv").config();
const {getBulkExport} = require("./getBulkExport");

const bulkExport = async start => {
    const result = await getBulkExport(start);
    console.log("BulkExport ====>", result);
};

bulkExport(process.env.START_DATE);