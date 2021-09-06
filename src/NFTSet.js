const fs = require('fs')
const path = require('path')
const { createCanvas, CanvasRenderingContext2D } = require('canvas')

const NFTAsset = require('./NFTAsset')
const BackgroundHandler = require('./BackgroundHandler')
const { exit } = require('process')

class NFTSet {

	constructor(setName, setSize, setMessage, imgWidth, imgHeight){
		this.setName = setName
		this.setSize = setSize
		this.setMessage = setMessage
		this.colorSchemeSize = 10
		this.imgWidth = imgWidth
		this.imgHeight = imgHeight
		this.assets = []
		this.bgHandler = new BackgroundHandler()
	}

	generateSet(){
		let dirPath = path.join(process.cwd(), "sets", this.setName)
		fs.mkdir(dirPath, (err) => {
			if (err) {
				return console.error(err)
			}
		})
		for(let looooop=1;looooop<=this.setSize;looooop++){
			let filename = path.join(dirPath, this.setName + "-" + looooop )
			let tempAsset = new NFTAsset( this.setName, looooop)
			// generate canvas
			let loopCanvas = createCanvas( this.imgWidth, this.imgHeight )
			let loopCTX = loopCanvas.getContext('2d')
			// make a color scheme
			let loopColorScheme = this.randomColorScheme(this.colorSchemeSize)
			tempAsset.imageName = this.setName + "-" + looooop + ".png"
			tempAsset.metaName = this.setName + "-" + looooop + ".json"
			tempAsset.shape = this.bgHandler.randomBgType()
			tempAsset.set = this.setName
			tempAsset.number = looooop
			tempAsset.width = this.imgWidth
			tempAsset.height = this.imgHeight
			tempAsset.backgroundColor = loopColorScheme[0]
			tempAsset.fontColor = loopColorScheme[1]
			tempAsset.fontBorder = loopColorScheme[2]
			tempAsset.scheme = loopColorScheme.slice(3)
			// pass context to background generation
			this.bgHandler.drawBackground(this.imgWidth, this.imgHeight, loopCTX, tempAsset)
			// add draw layers
			// add draw layers
			// add draw layers
			// add font layers on top
			this.bgHandler.drawText(this.imgWidth, this.imgHeight, loopCTX, this.setMessage, tempAsset.fontColor, tempAsset.fontBorder)
			// export image
			let encoded = loopCanvas.toDataURL()
			tempAsset.image = encoded
			let tempBuffer = loopCanvas.toBuffer('image/png')
			fs.writeFileSync( filename + ".png", tempBuffer )
			// finalize metadata
			let metaJson = JSON.stringify(tempAsset)
			// save meta
			fs.writeFileSync( filename + ".json", metaJson )
		}
	}

	randomColorCode() {
		let n = (Math.random() * 0xfffff * 1000000).toString(16);
		return '#' + n.slice(0, 3);
	}

	randomColorScheme(size){
		let scheme = []
		for(let i=0;i<size;i++){
			scheme[i] = this.randomColorCode()
		}
		return scheme
	}

}

module.exports = NFTSet