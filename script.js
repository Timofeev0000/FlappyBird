const 
        cvs = document.getElementById('canvas')
        ctx = cvs.getContext('2d')
        bird = new Image()
        bg = new Image()
        fg = new Image()
        pipeUp = new Image()
        pipeBottom = new Image()

bird.src = "img/bird.png"
bg.src = "img/bg.png"
fg.src = "img/fg.png"
pipeUp.src = "img/pipeUp.png"
pipeBottom.src = "img/pipeBottom.png"

const
        fly = new Audio()
        scoreAudio = new Audio()
        gap = 90
        xPos = 10
        yPos = 150
        grav = 1.5
        score = 0

fly.src = 'audio/fly.mp3'
scoreAudio.src = 'audio/score.mp3'

document.addEventListener('keydown', moveUp)

function moveUp() {
    yPos -= 25
    fly.play()
}

const pipe = []

pipe[0] = {
    x: cvs.width,
    y: 0
}

function draw() {
    ctx.drawImage(bg, 0, 0)

    for(i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)

        pipe[i].x--

        if(pipe[i].x === 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
                || yPos + bird.height >= cvs.height - fg.height) {
                    location.reload()
                }
        if(pipe[i].x === 5) {
            score++
            scoreAudio.play()
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height)
    ctx.drawImage(bird, xPos, yPos)

    yPos += grav

    ctx.fillStyle = '#000'
    ctx.font = '24px Verdana'
    ctx.fillText('Счёт: ' + score, 10, cvs.height - 20)

    requestAnimationFrame(draw)
}

pipeBottom.onload = draw

