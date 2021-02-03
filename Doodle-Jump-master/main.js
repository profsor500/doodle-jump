document.addEventListener('DOMContentLoaded', () => {
    game = new Game()
    game.newGame()
})

class Game {
    newGame(speedOfDoodler = 15) {
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'ArrowLeft' || e.key === 'a') && this.doodler.returnLeft() > 0) {
                this.doodler.turn('left')
                this.doodler.moveHorizontal(-speedOfDoodler)
            } else if ((e.key === 'ArrowRight' || e.key === 'd') && this.doodler.returnRight() < 795) {
                this.doodler.turn('right')
                this.doodler.moveHorizontal(speedOfDoodler)
            }

        })
        this.game_window = document.getElementById('game_window')
        this.platformMenager = new PlatformMenager(this.game_window)
        this.doodler = new Doodler(this.game_window, this.platformMenager.returnFirstPlatformBottom() + 40, this.platformMenager.returnFirstPlatformLeft() + 45)
            //ruch platform
        this.movingPlatformInterval = setInterval(() => {
            this.platformMenager.movePlatforms(-5)
        }, 30)

        this.doodlerMenagerInterval = setInterval(() => {
                if (this.platformMenager.checkIfTouch(this.doodler)) {
                    console.log("proboje skoczyc")
                    this.doodler.tryJump()

                }
            }, 30)
            //this.doodler.jump()
        this.mainInterval = setInterval(() => {
            if (this.doodler.returnBottom() <= 0) {
                console.log("game over")
                this.gameOver()
            }
        }, 10)
    }

    gameOver() {
        this.platformMenager.clearPlatforms()
        this.doodler.destroy()
        clearInterval(this.movingPlatformInterval)
        clearInterval(this.mainInterval)
        clearInterval(this.doodlerMenagerInterval)
        this.doodler.destroy()
        console.log("zdobyto", this.platformMenager.returnPoints(), "punkty(ow)")
        $('#doodler').remove();
        this.endGame = document.createElement('div')
        this.endGame.innerHTML = "Zdobyte punkty: " + this.platformMenager.returnPoints()
        this.endGame.classList.add('endDiv')
        this.game_window.appendChild(this.endGame)
        this.resetButton = document.createElement('button')
        this.resetButton.classList.add('redbutton')
        this.endGame.appendChild(this.resetButton)
        this.resetButton.textContent = 'Zagraj ponownie';
        this.resetButton.addEventListener("click", () => {
            location.reload()
        })

    }
}