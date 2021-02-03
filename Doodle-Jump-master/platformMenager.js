class PlatformMenager {
    constructor(master, platformCount = 5) {
        this.resetedPlatforms = 0
        this.master = master
        this.platformList = []
        for (let i = 0; i < platformCount; i++) {
            let platformGap = master.offsetHeight / platformCount
            let platform_left = Math.random() * (this.master.offsetWidth - 193)
            let newPlatformBottom = 100 + i * platformGap
            let newPlatform = new Platform(master, newPlatformBottom, platform_left)
            this.platformList.push(newPlatform)
        }
    }
    movePlatforms(move_height) {
        this.platformList.forEach(platform => {
            platform.move(move_height)
            if (platform.returnBottom() <= 0) {
                platform.reset()
                this.resetedPlatforms += 1
            }
        })

    }
    checkIfTouch = (doodler) => {
        let result = false;
        this.platformList.forEach(platform => {
            if (doodler.returnBottom() >= (platform.returnBottom() + 25) &&
                doodler.returnBottom() <= (platform.returnBottom() + 52)) {
                if ((doodler.returnLeft() + 193) >= platform.returnLeft() &&
                    doodler.returnLeft() <= (platform.returnLeft() + 203)) {
                    result = true
                }
            }
        })
        return result;
    }
    returnFirstPlatformLeft() {
        return this.platformList[0].returnLeft()
    }
    returnFirstPlatformBottom() {
        return this.platformList[0].returnBottom()
    }
    clearPlatforms() {
        $('.platform').remove();
    }
    returnPoints() {
        return this.resetedPlatforms
    }
}