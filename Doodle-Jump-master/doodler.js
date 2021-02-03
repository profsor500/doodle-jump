class Doodler {
    constructor(master, bottom_style = 0, left_style = 0, jump_speed = 12, jump_interval = 30) {
        this.isFalling = true
        this.jump_speed = jump_speed
        this.jump_interval = jump_interval
        this.upTimer
        this.downTimer
        this.bottom_style = bottom_style
        this.left_style = left_style
        this.doodler = document.createElement('div')
        master.appendChild(this.doodler)
        this.doodler.id = "doodler"
        this.doodler.style.left = this.left_style + 'px'
        this.doodler.style.bottom = this.bottom_style + 'px'
    }
    move(bottom_style = 0, left_style = 0) {
        this.bottom_style += bottom_style
        this.left_style += left_style
        this.doodler.style.left = this.left_style + 'px'
        this.doodler.style.bottom = this.bottom_style + 'px'
    }
    tryJump = () => {
        console.log("tryJump")
        if (this.isFalling) {
            console.log("bede skakał")
            this.isFalling = false
            clearInterval(this.downTimer)
            var max_jump = this.returnBottom() + 225
            this.upTimer = setInterval(() => {
                if (this.returnBottom() < max_jump) {
                    this.move(12)
                } else {
                    console.log("powinienem spaść")
                    this.fall()
                }
            }, this.jump_interval)
        }
    }
    fall() {
        console.log("spadam")
        this.isFalling = true
        clearInterval(this.upTimer)
        this.downTimer = setInterval(() => {
            this.move(-this.jump_speed)
        }, this.jump_interval)
    }
    returnBottom() {
        return this.bottom_style
    }
    returnLeft = () => {
        return this.left_style
    }
    returnRight = () => {
        return this.left_style + 127
    }
    destroy() {
        clearInterval(this.upTimer)
        clearInterval(this.downTimer)
        console.log("doodler is destroyed")
    }
    turn(direction = 'left') {
        if (direction == 'left') {
            this.doodler.style.backgroundImage = "url('imgs/mario-left.png')"
        } else
            this.doodler.style.backgroundImage = "url('imgs/mario-right.png')"
    }
}