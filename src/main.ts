import { Actor, CollisionType, Color, Engine, Font, FontUnit, Label, Loader, Sound, vec } from "excalibur"

//1- criar uma instancia de Engine, que representar o jogo
const game = new Engine({
	width: 800,
	height: 600
})

//2 - criar barra do player
const barra = new Actor({

	x: 150,
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
const velocidadeBolinha = vec(400, 400)

//Após 1 segundo (1000ms), define a velocidade da bolinha em x = 100 e y = 100
setTimeout(() => {
	bolinha.vel = velocidadeBolinha
}, 1000)
//unidade de tempo em milesegundos

//6 - fazer bolinha rebater na parede
bolinha.on("postupdate", () => {
	//se a bolinha colidir com o lado esquerdo
	if (bolinha.pos.x < bolinha.width / 2) {
		bolinha.vel.x = velocidadeBolinha.x
	}

	//se a bolinha colidir com o lado direito
	if (bolinha.pos.x + bolinha.width / 2 > game.drawWidth) {
		bolinha.vel.x = velocidadeBolinha.x * -1
	}

	//se a bolinha colidir com a parte superior
	if (bolinha.pos.y < bolinha.height / 2) {
		bolinha.vel.y = velocidadeBolinha.y
	}

	//se a bolinha colidir com a parte inferior
	//if (bolinha.pos.y + bolinha.height / 2 > game.drawHeight) {
	//	bolinha.vel.y = velocidadeBolinha.y * -1
	//}
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

const corBloco = [Color.Red, Color.Orange, Color.Yellow]

const larguraBloco = (game.drawWidth / colunas) - padding - (padding / colunas)
const alturaBloco = 30

const listaBlocos: Actor[] = []

//renderização dos bloquinhos


//renderiza 3 linhas
for (let j = 0; j < linhas; j++) {



	//renderiza 5 bloquinhos  
	for (let i = 0; i < colunas; i++) {
		listaBlocos.push(
			new Actor({
				x: xoffset + i * (larguraBloco + padding) + padding,
				y: yoffset + j * (alturaBloco + padding) + padding,
				width: larguraBloco,
				height: alturaBloco,
				color: corBloco[j]
			})
		)
	}

}


listaBlocos.forEach(bloco => {
	//define o tipo de colisor de cada bloco
	bloco.body.collisionType = CollisionType.Active

	//adciona cada bloco no game
	game.add(bloco)
})



//adicionando pontuação
let pontos = 0
const textoPontos = new Label({
	text:pontos.toString(),

	font: new Font({
		size: 40,
		color: Color.White,
		strokeColor: Color.Black,
		unit: FontUnit.Px
	}),
	pos: vec (600,500)

})

game.add(textoPontos)



let colidindo: boolean = false
const sound = new Sound('./src/sound/audio.wav ');
const loader = new Loader([sound]);


bolinha.on("collisionstart", (event) => {

	



	//verificar se  abolinha colidiu com algum bloco destrutivel
	if (listaBlocos.includes(event.other)) {
		//destruir bloco colidido
		event.other.kill()
		//adicionanum ponto
		pontos ++

		sound.play(0.5);
		//atuaiza valor do placar - textosPontos
		textoPontos.text = pontos.toString()
	}

	//rebater a bolinha + inverter as direções
	let interseccao = event.contact.mtv.normalize()

	if(pontos == 15){
		alert("você venceu")
		window.location.reload()
	}

	




	if (!colidindo) {
		colidindo = true

		//interseccao.x e interseccao.y
		//o maior representa o eixo onde ouve houve o contato
		if ( Math.abs(interseccao.x) > Math.abs(interseccao.y)) {
			bolinha.vel.x = bolinha.vel.x * -1
		} else {
			bolinha.vel.y = bolinha.vel.y * -1
		}
		
	}
})

bolinha.on("collisionend", () => {
	colidindo = false
})

bolinha.on("exitviewport", () => {
	alert("vc morreu")
	window.location.reload()
})




game.start(loader)
//inicia o game
game.start()
