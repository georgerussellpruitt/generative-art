const fs = require("fs")
let networkConfig = require('./helper-hardhat-config')

module.exports = async({
	getNamedAccounts,
	deployments,
	getChainId
}) => {
	const { deploy, log } = deployments
	const { deployer } = await getNamedAccounts()
	const chainId = await getChainId()

	log("------------------------------------------")
	const PNGNFT = await deploy("PNGNFT", {
		from: deployer,
		log: true
	})
	log(`Your contract deployed successfully to ${PNGNFT.address}`)

	const NFTcontract = await ethers.getContractFactory("PNGNFT")
	const account = await hre.ethers.getSigners()
	const signer = accounts[0]
	const pngNFT
}