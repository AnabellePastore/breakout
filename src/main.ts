import { Actor, CollisionType, Color, Engine, vec } from "excalibur"

//1- criar uma instancia de Engine, que representar o jogo
const game = new Engine({
	width: 800,
	height: 600
})

//2 - criar barra do player
const barra = new Actor({

	x:150,
	y: game.drawHeight - 40, //altura do game
	width: 200,
	height: 20,
	color: Color.Chartreuse
})


//define o tipo de colisao da barra
//CollisionType.Fixed = significa que ele nçao irá se "mexer" quando colidir
barra.body.collisionType = CollisionType.Fixed


//insere o actor- player, no gane
game.add(barra)

//3 - movimetar a barra de acordo com a posição do mouse
game.input.pointers.primary.on("move", (event) => {
	//Faz a posição x da barra, ser igual a posição x do mouse
	barra.pos.x = event.worldPos.x
})


//4 - Criar o Actor bolinha
const bolinha = new Actor({
	x: 100,
	y: 300,
	radius: 10, 
	color: Color.Red
})

bolinha.body.collisionType = CollisionType.Passive

//5 -  criar movimentação da bolinha
const velocidadeBolinha = vec(100, 100)

//Após 1 segundo (1000ms), define a velocidade da bolinha em x = 100 e y = 100
setTimeout(() => {
	bolinha.vel = velocidadeBolinha
}, 1000)
//unidade de tempo em milesegundos

//6 - fazer bolinha rebater na parede
bolinha.on("postupdate", () => {
	//se a bolinha colidir com o lado esquerdo
	if(bolinha.pos.x < bolinha.width / 2){
		bolinha.vel.x = velocidadeBolinha.x
	}
		
	//se a bolinha colidir com o lado direito
	if(bolinha.pos.x + bolinha.width / 2 > game.drawWidth){
		bolinha.vel.x = velocidadeBolinha.x * -1
	}

	//se a bolinha colidir com a parte superior
	if(bolinha.pos.y < bolinha.height / 2){
		bolinha.vel.y = velocidadeBolinha.y
	}

	//se a bolinha colidir com a parte inferior
	if(bolinha.pos.y + bolinha.height / 2 > game.drawHeight){
		bolinha.vel.y = velocidadeBolinha.y * -1
	}
})


//insere a bolinha no game
game.add(bolinha)



// 7 - criar os blocos
//configurações de tamanho e espaçamento dos blocos
const padding = 20

const xoffset = 65
const yoffset = 20

const colunas = 5
const linhas = 3

const corBloco = [Color.Violet, Color.Orange, Color.Yellow]

const larguraBloco = (game.drawWidth / colunas) - padding - (padding / colunas)
const alturaBloco = 30



//inicia o game
game.start()
