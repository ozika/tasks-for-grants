// EXPERIMENT SCENE
class TemplateScene extends BaseScene {
    constructor() {
        super('TemplateScene');
    }

    preload() {
        // Preload assets
        this.load.image('space', 'assets/nightsky.png');
        this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
    }

    create() {
        // Background setup
        this.add.image(400, 300, 'space').setDisplaySize(800, 600).setDepth(-2);

        // Create a group for blue flares
        this.stars = this.add.group({
            key: 'flares',
            frame: 'blue',
            repeat: 100, // Total 10 flares
            setXY: { x: 0, y: 0 }, // Start with all flares at (0, 0)
            visible: false // Initially invisible
        });

        this.stars.children.iterate((flare) => {
            flare.setScale(Phaser.Math.FloatBetween(0.1, 0.2)); // Random size (0.1 or 0.2)
            flare.setAlpha(0); // Start fully transparent
        });

        // Create a group for red flares
        this.stars2 = this.add.group({
            key: 'flares',
            frame: 'red',
            repeat: 100, // Total 10 flares
            setXY: { x: 0, y: 0 }, // Start with all flares at (0, 0)
            visible: false // Initially invisible
        });

        this.stars2.children.iterate((flare) => {
            flare.setScale(Phaser.Math.FloatBetween(0.05, 0.15)); // Random size (0.1 or 0.2)
            flare.setAlpha(0); // Start fully transparent
        });

        // Start the flare animation loops
        this.time.addEvent({
            delay: 100, // Every 500ms, schedule a new blue flare to appear
            callback: () => this.showRandomFlare(this.stars),
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 100, // Every 700ms, schedule a new red flare to appear
            callback: () => this.showRandomFlare(this.stars2),
            callbackScope: this,
            loop: true
        });
    }

    showRandomFlare(group) {
        // Pick a random flare that isn't currently visible
        const availableFlares = group.getChildren().filter(flare => !flare.visible);

        if (availableFlares.length > 0) {
            const flare = Phaser.Utils.Array.GetRandom(availableFlares);
            const x = Phaser.Math.Between(50, 750); // Random x position within canvas
            const y = Phaser.Math.Between(50, 550); // Random y position within canvas

            flare.setPosition(x, y);
            flare.setVisible(true);

            // Animate flare appearance and disappearance
            this.tweens.add({
                targets: flare,
                alpha: { from: 0, to: 1 }, // Gradually appear
                duration: 1000, // 1 second to fully appear
                yoyo: true, // Reverse to fade out
                hold: 1000, // Stay fully visible for 1 second
                onComplete: () => {
                    flare.setVisible(false); // Hide the flare once the tween completes
                }
            });
        }
    }
}
