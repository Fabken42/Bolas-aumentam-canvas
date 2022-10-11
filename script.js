// Mouse aumenta bolas ao redor
var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')

var mouse = {
    x: undefined,
    y: undefined
}
raioLimite = 40
arrayCores = ['#034159', '#025951', '#02735E', '#038C3E', '#0CF25D']

//------------------------------------------------------------------------//
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
})
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth //altera largura de canvas
    canvas.height = window.innerHeight //altera altura de canvas
    init()
})
//------------------------------------------------------------------------//

function Circle(x, y, dx, dy, raio) {
    this.x = x //eixo das abscissas
    this.y = y
    this.dx = dx //altera posição da bola no eixo x 
    this.dy = dy
    this.raio = raio
    this.raioMinimo = raio
    this.cor = arrayCores[Math.floor(Math.random() * arrayCores.length)]

    this.draw = ()=> {
        c.beginPath()
        c.arc(this.x, this.y, this.raio, 0, 2 * Math.PI) //desenha circulo
        c.fillStyle = this.cor
        c.fill()
    }

    this.update = function () {
        if (this.x >= window.innerWidth - this.raio || this.x <= this.raio) //se bola toca lado direito ou esquerdo da tela, dx*=-1
            this.dx = -this.dx;
        if (this.y >= window.innerHeight - this.raio || this.y <= this.raio)
            this.dy = -this.dy

        this.x += this.dx
        this.y += this.dy

        //interação
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50 &&
            this.raio < raioLimite) {
            this.raio += 1
        }
        else if (this.raio > this.raioMinimo) {
            this.raio -= 1
        }

        this.draw()
    }
}

var circleArray = []
const arrayComprimento = 600 //qtd de bolas

function init() {
    circleArray = []
    for (let i = 0; i < arrayComprimento; i++) {
        var raio = Math.random() * 10 + 1 //raio aleatório
        var x = Math.random() * (innerWidth - 2 * raio) + raio //posição aleatória
        var y = Math.random() * (innerHeight - 2 * raio) + raio
        var dx = (Math.random() - .7) + 0.3 //velocidade aleatória
        var dy = (Math.random() - .7) + 0.3
        circleArray.push(new Circle(x, y, dx, dy, raio)) //insere objeto instanciado no array 
    }
    animate()
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < arrayComprimento; i++) {
        circleArray[i].update()
    }
}

init()