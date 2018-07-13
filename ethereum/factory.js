import web3 from './web3';

//const path = require("path");
//const fs = require("fs-extra"); // fs with extra functions

const CampaignFactory = require('./build/CampaignFactory.json');

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x7e6b3Fe23C63AE654da587F78BebF9B92d1Df549'
    //fs.readFileSync(path.resolve(__dirname, "../ADDRESS"))
);

export default instance;