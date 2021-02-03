class Platform {
    constructor(master, bottom_style, platform_left) {

        this.master = master
        this.visual = document.createElement('div')
        this.visual.classList.add('platform')
        this.visual.style.left = platform_left + 'px'

        this.left = platform_left;
        this.bottom = bottom_style

        this.visual.style.bottom = this.bottom + 'px'
        master.appendChild(this.visual)
    }
    move(bottom_style = 0) {
        this.bottom += bottom_style
        this.visual.style.bottom = this.bottom + 'px'
    }
    reset() {
        this.left = Math.random() * (this.master.offsetWidth - 193);
        this.visual.style.left = this.left + 'px'
        this.move(this.master.offsetHeight)
        console.log("reset platform")
    }
    returnBottom() {
        return this.bottom;
    }
    returnLeft() {
        return this.left;
    }
}