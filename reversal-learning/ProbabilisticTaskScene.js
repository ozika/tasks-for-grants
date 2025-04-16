class ProbabilisticTaskScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ProbabilisticTaskScene' });
        this.trialData = [];
        this.currentTrial = 0;
    }

    preload() {
        this.load.image('stim1', 'imgs/im1.jpg');
        this.load.image('stim2', 'imgs/im2.jpg');
        this.load.image('stim3', 'imgs/im3.jpg');
        this.load.audio('aversive', 'sounds/aversive_sound.wav');
    }

    async create() {
        this.aversiveSound = this.sound.add('aversive', { volume: 1 });

        const testImg = this.add.image(400, 100, 'stim1').setDisplaySize(100, 100);
        console.log("Added test image: ", testImg);
    
        const startText = this.add.text(400, 300, 'Click to Start Task', {
            fontSize: '24px',
            color: '#000'
        }).setOrigin(0.5);
    
        this.input.once('pointerdown', async () => {
            startText.destroy();
    
            const params = new URLSearchParams(window.location.search);
            const schid = params.get("id") || "default";
            const scheduleName = `schedules/sch_${schid}.csv`;
    
            await this.loadSchedule(scheduleName);
            await this.runTrials();
    
            this.add.text(400, 300, 'Task complete. Thank you!', {
                fontSize: '28px',
                color: '#000'
            }).setOrigin(0.5);
        });
    }

    async loadSchedule(filename) {
        return new Promise((resolve) => {
            fetch(filename)
                .then(response => response.text())
                .then(text => {
                    const parsed = Papa.parse(text, { header: true });
                    this.schedule = parsed.data.filter(row => row.stimulus !== "");
                    resolve();
                });
        });
    }

    async runTrials() {
        for (let i = 0; i < this.schedule.length; i++) {
            this.currentTrial = i;
            const trial = this.schedule[i];

            if (trial.trial_type === 'decision') {
                await this.runDecisionTrial(trial);
            } else {
                await this.runRatingTrial(trial);
            }
        }

        this.saveData();
    }

    async runRatingTrial(trial) {
        this.cameras.main.setBackgroundColor('#595959'); 
        //this.cameras.main.setBackgroundColor('#000000');
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        console.log(trial.stimulus);
        const stim = this.add.image(centerX, centerY - 100, trial.stimulus).setDisplaySize(120, 120).setDepth(1);;

        const slider = this.add.rectangle(centerX, centerY + 100, 160, 8, 0x000000).setOrigin(0.5);
        const handle = this.add.circle(centerX, centerY + 100, 10, 0x888888).setInteractive({ draggable: true });
        const valueText = this.add.text(centerX, centerY + 130, "50%", { fontSize: "16px" }).setOrigin(0.5);
        const leftText = this.add.text(centerX - 90, centerY + 80, "0%", { fontSize: "14px" });
        const rightText = this.add.text(centerX + 70, centerY + 80, "100%", { fontSize: "14px" });

        let value = 50;
        this.input.setDraggable(handle);
        this.input.on('drag', (pointer, gameObject, dragX) => {
            const minX = centerX - 80;
            const maxX = centerX + 80;
            gameObject.x = Phaser.Math.Clamp(dragX, minX, maxX);
            value = Math.round(((gameObject.x - minX) / 160) * 100);
            valueText.setText(`${value}%`);
        });

        const submitBtn = this.add.text(centerX, centerY + 180, "Submit", {
            fontSize: "20px", color: "#ffffff", backgroundColor: "#333"
        }).setPadding(8).setOrigin(0.5).setInteractive();

        await new Promise(resolve => {
            submitBtn.once('pointerdown', resolve);
        });

        handle.setFillStyle(0x00008B); // Dark blue
        this.input.off('drag');

        await this.waitFor(parseInt(trial.ISI) || 2000);

        const outcome = parseInt(trial.outcome);
        if (outcome === 1) {
            handle.setFillStyle(0xFF69B4); // Pink
            this.aversiveSound.play();
        } else {
            handle.setFillStyle(0xFF69B4);
        }

        await this.waitFor(1500);

        stim.destroy(); slider.destroy(); handle.destroy(); valueText.destroy();
        leftText.destroy(); rightText.destroy(); submitBtn.destroy();

        const fixation = this.add.text(centerX, centerY, "+", {
            fontSize: "40px", color: "#ffffff"
        }).setOrigin(0.5);

        await this.waitFor(parseInt(trial.ITI) || 2000);
        fixation.destroy();

        this.trialData.push({ trialIndex: this.currentTrial, stimulus: trial.stimulus, type: "rating", response: value, outcome });
    }

    async runDecisionTrial(trial) {
        this.cameras.main.setBackgroundColor('#595959'); 
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        const options = trial.stimulus.replace("DECISION_", "").split("_vs_");
        const stim1 = this.add.image(centerX - 100, centerY, options[0]).setDisplaySize(120, 120).setInteractive();
        const stim2 = this.add.image(centerX + 100, centerY, options[1]).setDisplaySize(120, 120).setInteractive();

        const choice = await new Promise(resolve => {
            stim1.once('pointerdown', () => resolve(options[0]));
            stim2.once('pointerdown', () => resolve(options[1]));
        });

        const outcome = parseInt(trial.outcome);
        const outcomeText = this.add.text(centerX, centerY + 150, outcome === 1 ? "⚠ Sound!" : "✓ No sound", {
            fontSize: "24px", color: "#ffffff"
        }).setOrigin(0.5);

        if (outcome === 1) this.aversiveSound.play();

        await this.waitFor(2000);

        stim1.destroy(); stim2.destroy(); outcomeText.destroy();

        this.trialData.push({ trialIndex: this.currentTrial, stimulus: choice, type: "decision", outcome });
    }

    waitFor(ms) {
        return new Promise(resolve => this.time.delayedCall(ms, resolve));
    }

    saveData() {
        const blob = new Blob([JSON.stringify(this.trialData)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'trial_data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
