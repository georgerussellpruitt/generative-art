const fs = require('fs')
const { createCanvas, CanvasRenderingContext2D } = require('canvas')
const width = 800
const height = 600

function random_hex_color_code() {
	let n = (Math.random() * 0xfffff * 1000000).toString(16);
	return '#' + n.slice(0, 3);
}

function makeRandomColor(){
	return random_hex_color_code()
	// return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function getColorScheme(size){
	let scheme = []
	for (i=0;i<size;i++){
		scheme[i] = makeRandomColor()
	}
	return scheme
}

function relativeFontSize(imgWidth,ratio){
	let size = imgWidth * ratio
	return 'bold ' + size + 'px tahoma';
}

function generateBackground(imgWidth, imgHeight, ctx, loop){
	let rand = getRandomInt(600)
	let bgColor = makeRandomColor()
	ctx.fillStyle =bgColor
	ctx.fillRect(0, 0, imgWidth, imgHeight)
	let props = {
		set: "cancer-sucks",
		number: loop,
		background: bgColor
	}
	let meta
	if(rand <= 125){
		meta = generateCircleBg(imgWidth, imgHeight, ctx, props)
	} else if (rand >= 126 && rand <= 251) {
		meta = generateDiamondBg(imgWidth, imgHeight, ctx, props)
	} else if (rand >= 251 && rand <= 376){
		meta = generateTriangleBg(imgWidth, imgHeight, ctx, props)
	} else if (rand >= 376 && rand <= 501){
		meta = generateSmileyBg(imgWidth, imgHeight, ctx, props)
	} else if (rand >= 501 && rand <= 551){
		meta = generateHeartBg(imgWidth, imgHeight, ctx, props)
	} else if (rand >= 551){
		meta = generateRandomHeartnessBg(imgWidth, imgHeight, ctx, props)
	}
	return meta
}

function generateCircleBg(imgWidth, imgHeight, ctx, props){
	let meta = props
	let colorSet = getColorScheme(10)
	meta.colorScheme = colorSet
	meta.shape = "circle"
	for (let i = 0; i <= imgHeight/25; i++) {
		for (let j = 0; j < imgWidth/25; j++) {
			let tempColor = colorSet[getRandomInt(colorSet.length)]
			ctx.strokeStyle = tempColor
			ctx.beginPath()
			ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true)
			ctx.stroke()
			ctx.closePath()
		}
	}
	return meta
}

function generateDiamondBg(imgWidth, imgHeight, ctx, props){
	let meta = props
	let colorSet = getColorScheme(10)
	meta.colorScheme = colorSet
	meta.shape = "diamond"
	for (let i = 0; i <= imgHeight/25; i++) {
		for (let j = 0; j <= imgWidth/25; j++) {
			let widthOffset = j * 25
			let heightOffset = i * 25
			let tempColor = colorSet[getRandomInt(colorSet.length)]
			ctx.strokeStyle = tempColor
			ctx.lineWidth = 2
			ctx.beginPath()
			ctx.moveTo(widthOffset, heightOffset)
			ctx.lineTo(widthOffset+12.5, heightOffset+12.5)
			ctx.lineTo(widthOffset+25, heightOffset)
			ctx.lineTo(widthOffset+12.5, heightOffset-12.5)
			ctx.lineTo(widthOffset, heightOffset)
			ctx.stroke()
			ctx.closePath()
		}
	}
	return meta
}

function generateTriangleBg(imgWidth, imgHeight, ctx, props){
	let meta = props
	let colorSet = getColorScheme(10)
	meta.colorScheme = colorSet
	meta.shape = "triangle"
	for (let i = 0; i <= imgHeight/25; i++) {
		for (let j = 0; j <= imgWidth/25; j++) {
			let widthOffset = j * 25
			let heightOffset = i * 25
			let tempColor = colorSet[getRandomInt(colorSet.length)]
			ctx.strokeStyle = tempColor
			ctx.lineWidth = 2
			ctx.beginPath()
			ctx.moveTo(widthOffset, heightOffset)
			ctx.lineTo(widthOffset+12.5, heightOffset+25)
			ctx.lineTo(widthOffset+25, heightOffset)
			ctx.lineTo(widthOffset, heightOffset)
			ctx.stroke()
			ctx.closePath()
		}
	}
	return meta
}

function generateSmileyBg(imgWidth, imgHeight, ctx, props){
	let meta = props
	let colorSet = getColorScheme(10)
	meta.colorScheme = colorSet
	meta.shape = "smiley"
	for (let i = 0; i <= imgHeight/50; i++) {
		for (let j = 0; j < imgWidth/50; j++) {
			let widthOffset = (j * 50) + 25
			let heightOffset = (i * 50) + 25
			let tempColor = colorSet[getRandomInt(colorSet.length)]
			ctx.strokeStyle = tempColor
			ctx.beginPath()
			ctx.arc(widthOffset, heightOffset, 25, 0, Math.PI * 2, true) // Outer circle
			ctx.stroke()
			ctx.beginPath()
			ctx.arc(widthOffset, heightOffset, 18, 0, Math.PI, false)  // Mouth (clockwise)
			ctx.stroke()
			ctx.beginPath()
			ctx.arc(widthOffset-7.5, heightOffset-7.5, 5, 0, Math.PI * 2, true)  // Left eye
			ctx.stroke()
			ctx.beginPath()
			ctx.arc(widthOffset+7.5, heightOffset-7.5, 5, 0, Math.PI * 2, true)  // Right eye
			ctx.stroke()
		}
	}
	return meta
}

function generateHeartBg(imgWidth, imgHeight, ctx, props){
	let meta = props
	let colorSet = getColorScheme(10)
	meta.colorScheme = colorSet
	meta.shape = "heart"
	for (let i = 0; i+1 < imgHeight/25; i++) {
		for (let j = 0; j+1 < imgWidth/25; j++) {
			drawHeart(j * 50,i * 50, 50, ctx, colorSet[getRandomInt(colorSet.length)])
		}
	}
	return meta
}

function generateRandomHeartnessBg(imgWidth, imgHeight, ctx, props){
	let meta = props
	let colorSet = getColorScheme(10)
	meta.colorScheme = colorSet
	meta.shape = "randomness"
	for (let i = 0; i+1 < imgHeight/25; i++) {
		for (let j = 0; j+1 < imgWidth/25; j++) {
			let widthOffset = (j * 50) + 25
			let heightOffset = (i * 50) + 20
			let tempColor = colorSet[getRandomInt(colorSet.length)]
			ctx.strokeStyle = tempColor
			ctx.beginPath()
			ctx.moveTo(widthOffset * Math.random(), heightOffset * Math.random())
			//ctx.bezierCurveTo(imgWidth * 0.45, imgHeight * 0.65, imgWidth * 0.3, imgHeight * 0.65, imgWidth * 0.2, imgHeight * 0.34)
			ctx.bezierCurveTo(widthOffset * 0.45, heightOffset * 0.65, widthOffset * 0.3, heightOffset * 0.65, widthOffset * 0.2, heightOffset * 0.34)
			//ctx.bezierCurveTo(imgWidth * 0.2, imgHeight * 0.2, imgWidth * 0.45, imgHeight * 0.1, imgWidth * 0.5, imgHeight * 0.34)
			ctx.bezierCurveTo(widthOffset * 0.2, heightOffset * 0.2, widthOffset * 0.45, heightOffset * 0.1, widthOffset * 0.5, heightOffset * 0.34)
			//ctx.bezierCurveTo(imgWidth * 0.55, imgHeight * 0.25, imgWidth * 0.70, imgHeight * 0.1, imgWidth * 0.8, imgHeight * 0.34)
			ctx.bezierCurveTo(widthOffset * 0.55, heightOffset * 0.25, widthOffset * 0.70, heightOffset * 0.1, widthOffset * 0.8, heightOffset * 0.34)
			//ctx.bezierCurveTo(imgWidth * 0.6, imgHeight * 0.45, imgWidth * 0.6, imgHeight * 0.55, imgWidth * 0.5, imgHeight * 0.9)
			ctx.bezierCurveTo(widthOffset * 0.6, heightOffset * 0.45, widthOffset * 0.6, heightOffset * 0.55, widthOffset * 0.5, heightOffset * 0.9)
			ctx.stroke()
		}
	}
	return meta
}

function cancerCollection(imgWidth, imgHeight, batchSize, start=1){
	for (let loooop = start; loooop <= batchSize; loooop++) {
		let loopCanvas = createCanvas(imgWidth, imgHeight)
		if (loopCanvas.getContext) {
			let ctx = loopCanvas.getContext('2d')
			let meta = generateBackground(imgWidth, imgHeight, ctx, loooop)
			ctx.font = relativeFontSize(imgWidth,0.2)
			ctx.lineWidth = 3
			tempCol1 = makeRandomColor()
			tempCol2 = makeRandomColor()
			meta.fontFill = tempCol1
			ctx.fillStyle = tempCol1
			ctx.fillText('CANCER', imgWidth * 0.075, imgHeight * 0.4)
			meta.fontStroke = tempCol2
			ctx.strokeStyle = tempCol2
			ctx.strokeText('CANCER', imgWidth * 0.075, imgHeight * 0.4)
			ctx.fillStyle = tempCol1
			ctx.fillText('SUCKS', imgWidth * 0.175, imgHeight * 0.75)
			ctx.strokeStyle = tempCol2
			ctx.strokeText('SUCKS', imgWidth * 0.175, imgHeight * 0.75)
			let metaJson = JSON.stringify(meta)
			let tempBuffer = loopCanvas.toBuffer('image/png')
			fs.writeFileSync('./cancer-set/image-' + loooop + '.png', tempBuffer )
			fs.writeFileSync('./cancer-set/image-' + loooop + '.json', metaJson )
		}
	}
}

function soloTest(imgWidth, imgHeight, batchSize, start=1){
	for (let loooop = start; loooop <= batchSize; loooop++) {
		let loopCanvas = createCanvas(imgWidth, imgHeight)
		if (loopCanvas.getContext) {
			let ctx = loopCanvas.getContext('2d')
			let meta = generateBackground(imgWidth, imgHeight, ctx, loooop)
			ctx.font = relativeFontSize(imgWidth,0.2)
			ctx.lineWidth = 3
			tempCol1 = makeRandomColor()
			meta.fontFill = tempCol1
			ctx.fillStyle = tempCol1
			ctx.fillText('TEST', imgWidth * 0.075, imgHeight * 0.4)
			tempCol2 = makeRandomColor()
			meta.fontStroke = tempCol2
			ctx.strokeStyle = tempCol2
			ctx.strokeText('TEST', imgWidth * 0.075, imgHeight * 0.4)
			ctx.fillStyle = tempCol1
			ctx.fillText('SET', imgWidth * 0.15, imgHeight * 0.75)
			ctx.strokeStyle = tempCol2
			ctx.strokeText('SET', imgWidth * 0.15, imgHeight * 0.75)
			let metaJson = JSON.stringify(meta)
			let tempBuffer = loopCanvas.toBuffer('image/png')
			fs.writeFileSync('./test-set/image-' + loooop + '.png', tempBuffer )
			fs.writeFileSync('./test-set/image-' + loooop + '.json', metaJson )
		}
	}
}

function bannerSet(imgWidth, imgHeight, batchSize){
	for (let loooop = 0; loooop < batchSize; loooop++) {
		let loopCanvas = createCanvas(imgWidth, imgHeight)
		if (loopCanvas.getContext) {
			let ctx = loopCanvas.getContext('2d')
			generateBackground(imgWidth, imgHeight, ctx)
			ctx.font = relativeFontSize(imgWidth,0.125)
			ctx.lineWidth = 3
			tempCol1 = makeRandomColor()
			ctx.fillStyle = tempCol1
			ctx.fillText('CANCER', imgWidth * 0.02, imgHeight * 0.65);
			tempCol2 = makeRandomColor()
			ctx.strokeStyle = tempCol2
			ctx.strokeText('CANCER', imgWidth * 0.02, imgHeight * 0.65);
			ctx.fillStyle = tempCol1
			ctx.fillText('SUCKS', imgWidth * 0.56, imgHeight * 0.65);
			ctx.strokeStyle = tempCol2
			ctx.strokeText('SUCKS', imgWidth * 0.56, imgHeight * 0.65);
			let tempBuffer = loopCanvas.toBuffer('image/png')
			fs.writeFileSync('./banner/banner-'+loooop+'.png', tempBuffer)
		}
	}
}

function drawHeart(x, y, size, ctx, stroke){
	// Cubic curves example
	ctx.beginPath()
	ctx.moveTo(x + 25, y + 50)
	ctx.bezierCurveTo(x + (size * 0.45), y + (size * 0.65), x + (size * 0.01), y + (size * 0.75), x + (size * 0.01), y + (size * 0.34))
	ctx.bezierCurveTo(x + (size * 0.01), y + (size * 0.01), x + (size * 0.5), y + (size * 0.01), x + (size * 0.5), y + (size * 0.34))
	ctx.bezierCurveTo(x + (size * 0.5), y + (size * 0.01), x + (size * 0.99), y + (size * 0.01), x + (size * 0.99), y + (size * 0.34))
	ctx.bezierCurveTo(x + (size * 0.99), y + (size * 0.75), x +  (size * 0.55), y + (size * 0.65), x + (size * 0.5), y + (size * 0.99))
	ctx.strokeStyle = stroke
	ctx.lineWidth = 1
	ctx.stroke()
	// ctx.fillStyle = stroke
	// let rand = getRandomInt(2)
	// if(rand){
	// 	ctx.fill()
	// } else {
	// 	ctx.stroke()
	// }
}


//cancerCollection(width,height,5000,11)

soloTest(600,400,10)

//bannerSet(1400,400,1)
