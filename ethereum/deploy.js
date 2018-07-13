const path = require("path");
const fs = require("fs-extra"); // fs with extra functions
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'tragic square news business dad cricket nurse athlete tide split about ring',
    'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode, arguments: [] })
        .send({ from: accounts[0], gas: '1000000' });

    fs.writeFileSync(
        path.resolve(__dirname, "../ADDRESS"),
        result.options.address
    );
    console.log('Contract deployed to', result.options.address);
};
deploy();
