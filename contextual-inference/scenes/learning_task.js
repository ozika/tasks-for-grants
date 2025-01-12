 // EXPERIMENT SCENE
 class ExperimentScene extends BaseScene {
    constructor() {
        super('ExperimentScene');
    }
    

    preload() {
        // Preload assets
        this.load.image('space', 'assets/nightsky.png');
       
        this.load.image('stim1', 'assets/potion.png');
        this.load.image('stim2', 'assets/starfish.png');
        this.load.image('stim3', 'assets/diamond.png');
        this.load.image('stim4', 'assets/crystals.png');
        this.load.image('stim5', 'assets/stone.png');
        this.load.image('stim6', 'assets/letax.png');
        
        //this.load.image('t1', 'assets/target1.png');
        //this.load.image('t2', 'assets/target2.png');
        this.load.image('submit', 'assets/submit.png');
        this.load.image('submit2', 'assets/submit2.png');
        this.load.image('handle', 'assets/gps.png');
        this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');

        this.load.audio('lvl1', 'assets/sound/soundtrack/game_music1.mp3');



    }

    create() {
        this.cfg =[] 
        this.cfg.ctx_alpha_baseline = 0.1
        this.cfg.ctx_alpha_peak = 1
        this.cfg.tar_alpha_baseline = 0.1

        // Background setup
        this.add.image(400, 300, 'space').setDisplaySize(800, 600).setDepth(-2);


        // Particles for target 
        this.dark = this.add.particles(400, 300, 'flares', {
                    frame: ['white'],
                    color: [0x909497],
                    lifespan: 500,
                    speed: 200,
                    quantity: 2,
                    scale: { start: 0.25, end: 0.1 },
                    blendMode: 'SCREEN',
                }), 

        this.darkwell = this.dark.createGravityWell({
                    x: 0,
                    y: 0,
                    power: 1,
                    epsilon: 80,
                    gravity: 30,
                });
        this.dark.stop()

        this.target_particles = [
            {   // Green particles for target 1
                dyn: this.add.particles(400, 300, 'flares', {
                    frame: ['white'],
                    color: [0xe74c3c], 
                    lifespan: 2000,
                    speed: 200,
                    quantity: 2,
                    scale: { start: 0.25, end: 0.1 },
                    blendMode: 'SCREEN',
                }),
                dynwell: null // Will be set later
            },
            {   // Red particles for target 2
                dyn: this.add.particles(400, 300, 'flares', {
                    frame: ['white'],
                    //color: [0x45b39d], $ nicegreenblue
                    color: [0x5dade2],
                    lifespan: 2000,
                    speed: 200,
                    quantity: 2,
                    scale: { start: 0.25, end: 0.1 },
                    blendMode: 'SCREEN',
                }),
                dynwell: null // Will be set later
            }
        ];
        // Stop particle systems and create gravity wells
        this.target_particles.forEach((particle) => {
                particle.dyn.stop();
                particle.dynwell = particle.dyn.createGravityWell({
                    x: 0,
                    y: 0,
                    power: 1,
                    epsilon: 80,
                    gravity: 30,
                });
            });

        /*
        // Prepare gravity black hole
        this.dyn = this.add.particles(400,300, 'flares', {
            frame: ['green'],
            x: 0,
            y: 0,
            lifespan: 500,
            speed: 200,
            quantity: 2,
            scale: { start: 0.2, end: 0 },
            blendMode: 'MULTIPLY' // NORMAL/ADD/MULTIPLY/SCREEN/ERASE/OVERLAY/LIGHTEN/DARKEN
        });
        this.dyn.stop()
        this.dynwell = this.dyn.createGravityWell({
                x: 0,
                y: 0,
                power: 1,
                epsilon: 80,
                gravity: 30 //+ 30*idx**3
            });
        // Stop emitter by default
        //this.sparkleEmitter.stop();
            */
       this.circleGraphicsArray = [];

        

        // Create group from contextual cues
        this.stimGr = this.add.group(); // Create a group
        const jar_colors = [0xd7bde2, 0xfadbd8, 0xd5f5e3, 0xfcf3cf, 0xd6eaf8, 0xfdebd0];
     
        // Add 6 images at 60-degree increments

        //var jar_colors = [0xd7bde2, 0xfadbd8, 0xd5f5e3, 0xfcf3cf, 0xd6eaf8, 0xfdebd0]
        for (let i = 0; i < 6; i++) {
            let angle = Phaser.Math.DegToRad(i * 60); // Convert degrees to radians
            let x = cX + r * Math.cos(angle);
            let y = cY + r * Math.sin(angle);

            // Create an image and add it to the group
            //let image = this.add.image(x, y, 'stim' + (i + 1)).setDisplaySize(stim_dim_x, stim_dim_y);
            let spr = this.add.sprite(x, y, 'stim' + (i + 1)).setDisplaySize(stim_dim_x, stim_dim_y); 
            spr.setAlpha(this.cfg.ctx_alpha_baseline);
            spr.postFX.addGlow(0x283747, 4, 0);
            // blue 0xaeb6bf
            this.stimGr.add(spr);
        }

        /* Create group from contextual cues
        this.tarGr = this.add.group(); // Create a group

        // Add 2 targets
        for (let i = 0; i < 2; i++) {
            let tim = this.add.image(cX, cY, 't'+(i+1)).setDisplaySize(stim_dim_x*1.5, stim_dim_y*1.5);
            tim.setAlpha(this.cfg.tar_alpha_baseline);
            this.tarGr.add(tim); 
        }
        //targets["t2"].setAlpha(0.8)
        */
        // create gradient texture
        const sliderWidth = 300;
        const sliderHeight = 10;

        if (!this.textures.exists('gradient')) {
            const gradientTexture = this.textures.createCanvas('gradient', sliderWidth, sliderHeight);
            const gradientCtx = gradientTexture.context;

            const grd = gradientCtx.createLinearGradient(0, 0, sliderWidth, 0);
            grd.addColorStop(0, '#8e44ad');
            grd.addColorStop(0.5, 'gray');
            grd.addColorStop(1, '#16a085');

            gradientCtx.fillStyle = grd;
            gradientCtx.fillRect(0, 0, sliderWidth, sliderHeight);
            gradientTexture.refresh();
        } 

        // Fetch trial data
        //fetch('schedules/sch1.csv')
        fetch('https://raw.githubusercontent.com/ozika/tasks-for-grants/main/contextual-inference/schedules/sch1.csv', {mode: 'no-cors'}) 
            .then(response => response.text())
            .then(text => {
                this.trialData = Papa.parse(text, { header: true }).data;
                //this.runTrials(); // Correctly bind this
            });
        
        
        // SHARP START
        this.lvl1music = this.sound.add('lvl1', {volume: 1});
        if (this.lvl1music.isPlaying) {
            this.lvl1music.stop();
        }
        this.lvl1music.play();

        this,this.waitFor(2000)
        
        this.runTrials();

    }

    // Start trial and process stimuli sequence
    async runTrials() {

        console.log(this.trialData);
        


        this.tridx = 0; 
        this.notrials = this.trialData.length;
        this.timing = []
        this.timing.ctx_warupdown = 750;
        this.timing.ctx_cue_dur = 250;
        this.timing.ctx_onsets = [500, 1500, 2500]; // Proper array initialization
        this.timing.ctxs_offset = [3500]
        this.timing.ctx_all = [...this.timing.ctx_onsets, ...this.timing.ctxs_offset]
        this.timing.target_dur = 1000
        this.timing.iti = 2000
        this.timing.isi1 = 1000
        this.timing.isi2 = 1000

        for (let i = 0; i < this.notrials-1; i++) {

            // Reset gravity well and particle properties for each trial
            this.darkwell.gravity = 30
            this.darkwell.power = 1 
            this.dark.lifespan = 500
            this.target_particles[this.trialData[this.tridx].target-1].dynwell.gravity = 30; // Reset to default or base gravity

            //this.dyn.setPosition(cX, cY); // Reset particle emitter position
            

            console.log(`Trial ${this.tridx}`); 
            console.log(`Gravity ${  this.target_particles[this.trialData[this.tridx].target-1].dynwell.gravity}`);
            console.log(`Speed ${  this.target_particles[this.trialData[this.tridx].target-1].dyn.speed}`);
            console.log(`lifespan ${  this.target_particles[this.trialData[this.tridx].target-1].dyn.lifespan}`);
            //this.dyn.speed = 300
            

            // Get sequence for this trial
            this.trialData[this.tridx].seq = [];
            for (let j = 1; j <= 3; j++) {
                let stimPosition = parseInt(this.trialData[this.tridx][`stim_positions_stim${j}`], 10) - 1; // -1 because the positions start at 1, not 0
                this.trialData[this.tridx].seq.push(stimPosition);
            }
            console.log("   Sequence: " + this.trialData[this.tridx].seq);

            // Flash stimuli in sequence
            await this.showCtxtCues(this.trialData[this.tridx].seq);
            
            this.dark.lifespan = 200

            // Show text
            this.showText("Particle incoming!", 400, 100, "18px")

            // ISI 1
            await this.waitFor(this.timing.isi1)//+ Math.random() * 5000);

            

            // Cosmic particle animation
            await this.animateCosmicParticle();
            this.txt.destroy()

            // show the color of the target
            this.target_particles[this.trialData[this.tridx].target-1].dyn.start()
            this.dark.stop()
            // Show target
            //await this.showTarget(this.trialData[this.tridx].target);
            //this.dyn.speed = 300
            //this.dynwell.gravity = 60

            await this.waitFor(this.timing.target_dur);

            // Display slider and wait for rating
            this.createSlider();
            
            await this.waitForSliderInput();

            
            this.target_particles[this.trialData[this.tridx].target-1].dyn.stop()
            
            // ISI 2
            await this.waitFor(this.timing.isi2);
            this.target_particles[this.trialData[this.tridx].target-1].dynwell.gravity = 0

            // Show outcome text
            await this.showOutcomeText(this.trialData[this.tridx].outcome);

            // Change alpha back to baseline
            this.stimGr.children.each((child) => {
                child.alpha = this.cfg.ctx_alpha_baseline; // Set alpha to baseline
            });
            

            await this.waitFor(this.timing.iti);
            this.tridx += 1;

            if (this.tridx >= this.notrials - 1) {
                this.sendTrialData(); // Save the data after the last trial
            }
        }
    }
    

    /*    
    animateCosmicParticle() {
        return new Promise((resolve) => {
            const centerX = this.cameras.main.centerX;
            const centerY = this.cameras.main.centerY;

            // Get the target index and corresponding color
            const targetIndex = this.trialData[this.tridx].target - 1; // Target index (0 or 1)
            const targetColor = targetIndex === 0 ? 0xe74c3c : 0x45b39d; // Example colors for two targets

            // Create the cosmic particle
            const cosmicParticle = this.add.particles(centerX, 0, 'flares', {
                frame: ['white'],
                color: [targetColor],
                lifespan: 300,
                speed: 10, // No initial speed; we move it via tween
                quantity: 1,
                scale: { start: 0.2, end: 0 },
                blendMode: 'ADD',
            });

            cosmicParticle.start()
            // Tween to move the particle down to the center
            this.tweens.add({
                targets: cosmicParticle,
                props: {
                    x: { value: centerX },
                    y: { value: centerY },
                },
                duration: 350, // Adjust for the desired speed
                ease: 'Linear',
                onComplete: () => {
                    // Stop the particle emission upon reaching the target
                    cosmicParticle.stop();

                    // Change the target's particle color to match the cosmic particle
                    this.target_particles[targetIndex].dyn.color = targetColor;

                    // Destroy the particle system after the effect
                    cosmicParticle.destroy();

                    // Continue the trial
                    resolve();
                },
            });
        });
    }
        */
    
/*
    showOutcomeText(outcome) {
        return new Promise((resolve) => {
            const centerX = this.cameras.main.centerX;
            const centerY = this.cameras.main.centerY;

            // Determine glow color based on the outcome
            const glowHexColor = outcome > 0 ? '#16a085': '#8e44ad';
            const txtColor = outcome > 0 ? '#a3e4d7' : '#d7bde2';
            //["#8e44ad", "#16a085"]

            // Add the outcome text
            const outcomeText = this.add.text(centerX, centerY, `${outcome} MW!`, {
                fontSize: '26px',
                fontFamily: 'Arial',
                color: txtColor,
                align: 'center',
            }).setOrigin(0.5);

            // Add crimson glow effect
            outcomeText.setStroke(glowHexColor, 6); // Crimson stroke around the text
            outcomeText.setShadow(2, 2, glowHexColor, 10, true, true); // Crimson glow effect

            // Remove the text after 2 seconds and resolve the promise
            this.time.delayedCall(2000, () => {
                outcomeText.destroy();
                this.circleGraphicsArray.forEach((circle) => circle.destroy());
                this.circleGraphicsArray = []; // Clear the array
                resolve(); // Resolve the promise after the text disappears
            });
        });
    }

    waitForSliderInput() {
        return new Promise((resolve) => {
            const checkSlider = setInterval(() => {
                if (this.sliderSubmitted) {
                    //this.dyn.lifespan = 300
                    clearInterval(checkSlider);
                    resolve();
                }
            }, 100); // Check every 100ms if slider input is complete
        });
    }

    waitFor(duration) {
        return new Promise((resolve) => {
            this.time.delayedCall(duration, resolve);
        });
    }
*/
    async showCtxtCues(sequence) {
        for (let i = 0; i < sequence.length; i++) {
            const stimPos = sequence[i];

            // Show the stimulus at the current position
            this.showStimulus(stimPos);

            // Extend the line from the stimulus to the center and draw the circle
            await this.extendLineAndDrawCircle(stimPos, i);

            // Optionally, wait for the duration of the stimulus (ctx_cue_dur)
            await this.waitFor(this.timing.ctx_cue_dur);
        }
    }

    showTarget(tid) {
        return new Promise((resolve) => { 
            let target = this.tarGr.getChildren()[tid-1]
             // Emit particles from the circle
            // this.flame.start();
            //this.time.delayedCall(50, () => {
            //    this.flame.stop()
            //    //resolve(); // Resolve the promise after the text disappears
           // });
            var targetFlash = this.tweens.chain({ 
                targets: target, 
                start: true,
                tweens: [
                    {alpha: this.cfg.ctx_alpha_peak, duration: this.timing.ctx_warupdown, ease: 'Cubic.easeOut'}
                    //{delay: this.timing.target_dur}, 
                    //{alpha: this.cfg.ctx_alpha_baseline, duration: this.timing.ctx_warupdown, ease: 'Cubic.easeIn'}
                ]
            })
            resolve()
        })
    }

showStimulus(stpos) {
    console.log(`St pos ${stpos}`);
    console.log(`Showing stimulus at position ${stpos}`);

    // Ensure position is valid
    if (stpos < 0 || stpos >= this.stimGr.getChildren().length) {
        console.error(`Invalid stimulus position: ${stpos}`);
        return;
    }
    let targetStim = this.stimGr.getChildren()[stpos]; // Get the image by index
    var stimFlash = this.tweens.chain({ 
        targets: targetStim, 
        start: true,
        tweens: [
            {alpha: this.cfg.ctx_alpha_peak, duration: this.timing.ctx_warupdown, ease: 'Cubic.easeOut'}, 
            {delay: this.timing.ctx_cue_dur}, 
            //{alpha: this.cfg.ctx_alpha_baseline, duration: this.timing.ctx_warupdown, ease: 'Cubic.easeIn'}
        ]
    })
    
}
/*
createSlider() {
    const sliderWidth = 300; // Scale width in pixels
    const sliderHeight = 10; // Scale height
    const sliderHandleWidth = 10; // Slider handle width
    const sliderHandleHeight = 25; // Slider handle height

    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY + 200; // Position slightly below the target

    this.scaleLine = this.add.image(centerX, centerY, 'gradient').setOrigin(0.5, 0.5);
    this.scaleLine.setDisplaySize(sliderWidth, sliderHeight);

    // Add the slider handle
    //this.handle = this.add.rectangle( sliderHandleWidth, sliderHandleHeight, 0x000000).setInteractive();
    this.handle = this.add.sprite(centerX, centerY-15, 'handle').setDisplaySize(30, 30).setInteractive(); 
     //       spr.setAlpha(this.cfg.ctx_alpha_baseline);
      //      spr.postFX.addGlow(0xaeb6bf, 4, 0);
    //this.handle.preFX.addGlow(0x5dade2)
    //this.handle.setDepth(2);

    this.input.setDraggable(this.handle);

    // Add text to display the rating above the slider
    this.ratingText = this.add.text(centerX-150, centerY + 30, 'Expected: 0', {
        fontSize: '14px',
        color: "#5dade2"
    })

    // Add text to display the rating above the slider
    this.lbl1 = this.add.text(centerX-150, centerY - 25, 'Worst', {
        fontSize: '14px',
        color: "#8e44ad"
    });

    this.lbl2 = this.add.text(centerX+118, centerY - 25, 'Best', {
        fontSize: '14px',
        color: "#16a085"
    });
    // ["#8e44ad", "#16a085"]
    // Drag functionality for the slider handle
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        if (gameObject === this.handle) {
            // Clamp handle position to stay within scale line
            gameObject.x = Phaser.Math.Clamp(dragX, centerX - sliderWidth / 2, centerX + sliderWidth / 2);

            // Map handle position to -100 to 100
            const normalizedValue = (gameObject.x - (centerX - sliderWidth / 2)) / sliderWidth;
            const rating = Math.round(normalizedValue * 200 - 100); // Map to range -100 to 100
            this.ratingText.setText(`Expected yield: ${rating}`);
            this.currentRating = rating; // Store the current rating


        }
    });

    // Add the submit button as an image
    this.submitButton = this.add.sprite(centerX+50, centerY + 35, 'submit2').setInteractive();
    let scalefac = 5
    this.submitButton.setDisplaySize(40, 40); // Adjust size as needed
    this.submitButton.preFX.addGlow(0x5dade2)
    //this.submitButton.setDisplaySize((512/scalefac)-20, 302/scalefac); // Adjust size as needed

    this.submitButton.on('pointerdown', () => {
        console.log('Submitted rating:', this.currentRating);
        this.sliderSubmitted = true; // Signal that the slider input is complete
        this.removeSlider(); // Remove all slider components
    });

    // Initialize currentRating
    this.currentRating = 0; // Default value at the center
    this.sliderSubmitted = false;
}

// Helper to remove all slider components
removeSlider() {
    this.scaleLine.destroy();
    this.handle.destroy();
    this.ratingText.destroy();
    this.submitButton.destroy();
    this.lbl1.destroy()
    this.lbl2.destroy()
}
*/
extendLineAndDrawCircle(stimPos, sidx) {
    return new Promise((resolve) => {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        // Get the stimulus position
        const stim = this.stimGr.getChildren()[stimPos];
        const stimX = stim.x;
        const stimY = stim.y;

        // Calculate the center between the stimulus and the center
        const center = {
            x: (stimX + centerX) / 2,
            y: (stimY + centerY) / 2,
        };

        // Create the sparkle particle
        const spark = this.add.particles(center.x, center.y, 'flares', {
            frame: ['yellow'],
            lifespan: 100,
            speed: 150,
            quantity: 1,
            scale: { start: 0.2, end: 0 },
            blendMode: 'ADD',
        });

        // Define the line path for the sparkle
        const linePath = new Phaser.Geom.Line(stimX, stimY, centerX, centerY);
        spark.addEmitZone({
            type: 'edge',
            source: linePath,
            quantity: 1,
            total: 1,
        });

        // Start the sparkle and wait for it to reach the center
        spark.start();

        // Animate the sparkle travel
        const travelDuration = 400; // Adjust as needed for speed
        const sparkleTween = this.tweens.add({
            targets: spark,
            x: centerX,
            y: centerY,
            duration: travelDuration,
            onComplete: () => {
                // Stop sparkle emission
                spark.stop();

                this.target_particles[this.trialData[this.tridx].target-1].dynwell.power = 1
                this.darkwell.power = 1
                this.dark.lifespan +=  400 * sidx ** 2
                
                console.log(sidx)
                if (sidx == 0) {
                    this.dark.start()
                }
                
                console.log(this.trialData[this.tridx].seq.length)
                if ((sidx+1) == this.trialData[this.tridx].seq.length) {
                    this.dark.lifespan = 200
                    // this.darkwell.gravity = 60
                }

                // Handle the "dark" particle effect logic
                if (sidx === 0) {
                    // Start "dark" particles for the first stimulus
                    this.dark.start();
                }


                // Resolve the promise after the sparkle reaches the center
                resolve();
            },
        });
    });
}



}