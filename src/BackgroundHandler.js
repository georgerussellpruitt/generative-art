class BackgroundHandler {
	
	constructor(){}

	drawBackground(width,height,ctx,asset){
		let shapeSize = width * 0.025
		ctx.fillStyle = asset.backgroundColor
		ctx.fillRect(0,0,width,height)
		if(asset.shape !== 'randomness'){
			// draw BG shapes
			this.drawBGShapes(width,height,ctx,shapeSize,asset)
		} else {
			this.drawRandomness(width,height,ctx,asset)
		}
	}

	drawText(width,height,ctx,message,fill,stroke){
		ctx.font = this.relativeFontSize(width,0.2)
		ctx.lineWidth = 3
		ctx.fillStyle = fill
		ctx.strokeStyle = stroke
		ctx.fillText('CANCER', width * 0.075, height * 0.4)
		ctx.strokeText('CANCER', width * 0.075, height * 0.4)
		ctx.fillText('SUCKS', width * 0.175, height * 0.75)
		ctx.strokeText('SUCKS', width * 0.175, height * 0.75)
	}

	randomBgType(){
		let rand = this.getRandomInt(600) + 1
		let shape
		if(rand <= 125){
			shape = "circle"
		} else if (rand >= 126 && rand <= 251) {
			shape = "triangle"
		} else if (rand >= 251 && rand <= 376){
			shape = "diamond"
		} else if (rand >= 376 && rand <= 501){
			shape = "heart"
		} else if (rand >= 501 && rand <= 551){
			shape = "smiley"
		} else if (rand >= 551){
			shape = "randomness"
		}
		return shape
	}

	drawBGShapes(width,height,ctx,shapeSize,props){
		for (let yOffet = 0;yOffet <= height/shapeSize; yOffet++) {
			for (let xOffet = 0;xOffet <= width/shapeSize; xOffet++) {
				let x = xOffet * shapeSize
				let y = yOffet * shapeSize
				let stroke = props.scheme[this.getRandomInt(props.scheme.length)]
				switch (props.shape) {
					case 'circle':
						this.drawCircle(x, y, shapeSize, ctx, stroke)
						break;
					case 'triangle':
						this.drawTriangle(x, y, shapeSize, ctx, stroke)
						break;
					case 'diamond':
						this.drawDiamond(x, y, shapeSize, ctx, stroke)
						break;
					case 'heart':
						this.drawHeart(x, y, shapeSize, ctx, stroke)
						break;
					case 'smiley':
						this.drawSmiley(x, y, shapeSize, ctx, stroke)
						break;
					case 'randomness':
						this.drawRandomLine(props.width, props.height, y, ctx, stroke, shapeSize)
						break;
				}
				
			}
		}
	}

	drawCircle(x, y, size, ctx, stroke){
		ctx.strokeStyle = stroke
		ctx.beginPath()
		ctx.arc((size * 0.5) + x, (size * 0.5) + y, (size * 0.4), 0, Math.PI * 2, true)
		ctx.stroke()
	}

	drawDiamond(x, y, size, ctx, stroke){
		ctx.strokeStyle = stroke
		ctx.lineWidth = 1
		ctx.beginPath()
		ctx.moveTo(x, y)
		ctx.lineTo(x+(size*0.5), y+(size*0.5))
		ctx.lineTo(x+size, y)
		ctx.lineTo(x+(size*0.5), y-(size*0.5))
		ctx.lineTo(x, y)
		ctx.stroke()
	}

	drawTriangle(x, y, size, ctx, stroke){
		ctx.strokeStyle = stroke
		ctx.lineWidth = 2
		ctx.beginPath()
		ctx.moveTo(x, y)
		ctx.lineTo(x+(size * 0.5), y+size)
		ctx.lineTo(x+size, y)
		ctx.lineTo(x, y)
		ctx.stroke()
	}

	drawSmiley(x, y, size, ctx, stroke){
		let adjustedSize = size * 0.5
		ctx.strokeStyle = stroke
		ctx.lineWidth = 1
		ctx.beginPath()
		ctx.arc(x, y, adjustedSize, 0, Math.PI * 2, true) // Outer circle
		ctx.stroke()
		ctx.beginPath()
		ctx.arc(x, y, (adjustedSize * 0.7), 0, Math.PI, false)  // Mouth (clockwise)
		ctx.stroke()
		ctx.beginPath()
		ctx.arc(x-(adjustedSize * 0.3), y-(adjustedSize * 0.3), (adjustedSize * 0.1), 0, Math.PI * 2, true)  // Left eye
		ctx.stroke()
		ctx.beginPath()
		ctx.arc(x+(adjustedSize * 0.3), y-(adjustedSize * 0.3), (adjustedSize * 0.1), 0, Math.PI * 2, true)  // Right eye
		ctx.stroke()
	}

	drawHeart(x, y, size, ctx, stroke){
		ctx.beginPath()
		ctx.moveTo(x + (size * 0.5), y + size)
		ctx.bezierCurveTo(x + (size * 0.45), y + (size * 0.65), x + (size * 0.01), y + (size * 0.75), x + (size * 0.01), y + (size * 0.34))
		ctx.bezierCurveTo(x + (size * 0.01), y + (size * 0.01), x + (size * 0.5), y + (size * 0.01), x + (size * 0.5), y + (size * 0.34))
		ctx.bezierCurveTo(x + (size * 0.5), y + (size * 0.01), x + (size * 0.99), y + (size * 0.01), x + (size * 0.99), y + (size * 0.34))
		ctx.bezierCurveTo(x + (size * 0.99), y + (size * 0.75), x +  (size * 0.55), y + (size * 0.65), x + (size * 0.5), y + (size * 0.99))
		ctx.strokeStyle = stroke
		ctx.lineWidth = 1
		ctx.stroke()
	}

	drawRandomLine(x, y, ctx, stroke, size){
		let rowSize = size * 0.2
		let yVar = (y * 0.45) * Math.random()
		ctx.strokeStyle = stroke
		ctx.beginPath(0, y)
		ctx.bezierCurveTo( 0, y + yVar, width*0.67, y + (y * Math.random()), width, y + yVar * Math.random())
		ctx.stroke()
	}

	drawRandomness(width, height, ctx, asset){
		for (let i = 0; i+1 < height/25; i++) {
			for (let j = 0; j+1 < width/25; j++) {
				let widthOffset = (j * 50) + 25
				let heightOffset = (i * 50) + 20
				let tempColor = asset.scheme[this.getRandomInt(asset.scheme.length)]
				ctx.strokeStyle = tempColor
				ctx.beginPath()
				ctx.moveTo(widthOffset * Math.random(), heightOffset * Math.random())
				ctx.bezierCurveTo(widthOffset * 0.45, heightOffset * 0.65, widthOffset * 0.3, heightOffset * 0.65, widthOffset * 0.2, heightOffset * 0.34)
				ctx.bezierCurveTo(widthOffset * 0.2, heightOffset * 0.2, widthOffset * 0.45, heightOffset * 0.1, widthOffset * 0.5, heightOffset * 0.34)
				ctx.bezierCurveTo(widthOffset * 0.55, heightOffset * 0.25, widthOffset * 0.70, heightOffset * 0.1, widthOffset * 0.8, heightOffset * 0.34)
				ctx.bezierCurveTo(widthOffset * 0.6, heightOffset * 0.45, widthOffset * 0.6, heightOffset * 0.55, widthOffset * 0.5, heightOffset * 0.9)
				ctx.stroke()
			}
		}
	}

	getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	relativeFontSize(imgWidth,ratio){
		let size = imgWidth * ratio
		return 'bold ' + size + 'px tahoma';
	}

}

module.exports = BackgroundHandler