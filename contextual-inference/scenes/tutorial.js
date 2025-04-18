class IntroScene extends BaseScene {
    constructor() {
        super('IntroScene');
    }



    create() {


        

        // Set up background
        this.add.image(400, 300, 'space').setDisplaySize(800, 600).setDepth(-2);

        // set up sounds
        this.instr3 = this.sound.add('instr3');
        this.sparksound = this.sound.add('spark', {volume: 0.5});
        this.particlesound = this.sound.add('particle', {volume: 0.5})
        this.engain = this.sound.add('engain', {volume: 0.5})
        this.enloss = this.sound.add('enloss', {volume: 0.5});

        // Create the spark particle
        this.spark = this.add.particles(400, 300, 'flares', {
            frame: ['blue'],
            x: 0,
            y: 0,
            lifespan: 600,
            speed: 100,
            quantity: 1,
            scale: { start: 0.3, end: 0 },
            blendMode: 'ADD'
        });
        this.spark.wellactive = false

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

        

        this.showIntro()

    }

    async showIntro() {

        //Get instructions from csv 
        await this.fetchSubtitleScript("script.csv");
        
        if (this.scene.isActive('ExperimentScene')) {
            console.log('ExperimentScene is currently active.');
        } else {
            console.log('ExperimentScene is currently NOT active.');
        }
        
        await this.veryStart()

        // Start introduction
        // This will be 10s intro where different shapes will "dance" on th screen
        this.gentlemotion = 1
        this.createGentleMotion();

        this.instr =[] 
        this.instr.x =400
        this.instr.y =200

        // do the above for 10s
        this.blinkStars(10000);
        await this.waitFor(10000); // realMode 10000
        

        // Add instructions 1
       var txt = this.add.text(this.instr.x, this.instr.y, 'Welcome, please carefully read the consent form \n and press continue if you agree.', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#89e1f2',
            align: 'center'
        }).setOrigin(0.5)

        await this.showInstructionButtons('', 0);
        txt.destroy()
        

        this.tweens.add({
            targets:  this.intromusic,
            volume:   0.05,
            duration: 5000 //realMode 5000
            
        });

        await this.stopGentleMotion()

        await this.waitFor(1000); //realMode 3000

        await this.moveAndShowEvee(400, 300, 1200);
        

        //this.temp_txt = this.showSubtitle('instr4');
        await this.showInstructionButtons('instr4', 1);
        //this.temp_txt.destroy();

        // randomize selection of schedule
        await this.moveAndShowEvee(400, 100, 1600);
        await this.condSelectionPhase();

        this.tweens.add({
            targets:  this.intromusic,
            volume:   0.03,
            duration: 5000 //realMode 5000
            
        });

        await this.makeEvePuff()

        await this.moveAndShowEvee(100, 300, 1600);

        await this.showInstructionButtons('instr5', 1);

        await this.makeEvePuff()

        await this.moveAndShowEvee(700, 300, 1600);

        await this.showInstructionButtons('instr6', 1);

        this.showStimuli();

        await this.showInstructionButtons('instr7', 1);

        await this.pingSparkles(1, 0);

        //await this.pingSparkles(4, 1);

        //await this.pingSparkles(0, 2);

        await this.moveAndShowEvee(500, 100, 1600);

        await this.showInstructionButtons('instr8', 1);

        await this.animateCosmicParticle()
        this.target_particles[0].dyn.start()
        //await this.makeEvePuff(2,200)

        this.darkwell.gravity=100
        await this.waitFor(1000); 

        
        this.darkwell.gravity=30
        this.dark.stop()
        

        
        await this.moveAndShowEvee(550, 100, 1600);

        await this.showInstructionButtons('instr8b', 1);

        this.target_particles[0].dyn.stop()
        await this.showOutcomeText(80)

        await this.showInstructionButtons('instr8c', 1);

        await this.pingSparkles(1, 0);
        this.darkwell.gravity=30
        this.dark.start()
        
        await this.waitFor(1000); 
        
        this.darkwell.gravity=100

        
        
        await this.animateCosmicParticle(1)
        this.target_particles[1].dyn.start()
        this.darkwell.gravity=30
        this.dark.stop()
        
        //await this.makeEvePuff(2,200)

        
        await this.waitFor(1000); 

        await this.showOutcomeText(-80)
        this.target_particles[1].dyn.stop()

        await this.showInstructionButtons('instr8d', 1);

        


        await this.makeEvePuff()
        await this.moveAndShowEvee(100, 200, 1600);
        await this.showInstructionButtons('instr9', 1);


        for (let i = 0; i < 6; i++) { 
            this.stimGr.getChildren()[i].alpha=0;
            //await this.waitFor(0); 
        }


        await this.moveAndShowEvee(100, 100, 1600);
        const schemeImage = this.add.image(400, 300, 'scheme').setOrigin(0.5);
        await this.showInstructionButtons('instr_struct', 1);
        schemeImage.destroy(0)

        await this.makeEvePuff()
        await this.showInstructionButtons('instr10', 1);

        await this.makeEvePuff(2, 300)
        await this.showInstructionButtons('instr11', 1);

        await this.moveAndShowEvee(700, 500, 1600);

        for (let i = 0; i < 6; i++) { 
            this.stimGr.getChildren()[i].alpha=0.2;
            await this.waitFor(100); 
        }

        // practice trial 1 
        await this.waitFor(1000); 
        
        this.stimGr.getChildren()[1].alpha=1;
        await this.waitFor(500); 
        await this.pingSparkles(1, 0);
        await this.waitFor(1000); 
        this.stimGr.getChildren()[2].alpha=1;
        await this.waitFor(500); 
        await this.pingSparkles(2, 0);
        await this.waitFor(1000); 
        this.stimGr.getChildren()[4].alpha=1;
        await this.waitFor(500); 
        await this.pingSparkles(4, 0);
        await this.waitFor(1000); 

        await this.animateCosmicParticle(1)
        this.darkwell.gravity=100
        await this.waitFor(1000);                
        this.darkwell.gravity=30
        this.dark.stop()
        this.target_particles[1].dyn.start()

        await this.createSlider() 

        //await this.waitForSliderInput();                  
        this.target_particles[1].dyn.stop()
        
        // ISI 2
        await this.waitFor(1000);
        //this.target_particles[1].dynwell.gravity = 0

        // Show outcome text
        await this.showOutcomeMarker(this.currentRating-10);
        await this.removeSlider();
        this.outcmhandle.destroy()

        // Change alpha back to baseline
        this.stimGr.children.each((child) => {
            child.alpha = 0.2; // Set alpha to baseline
        });

        await this.makeEvePuff(2, 300)
        await this.showInstructionButtons('instr12', 1);


        var stims = [[1,3,5], [2,0,3], [3,2,5]]
        var tt = [1,0,1]
        var outcm = [-30, -70, 80]
        var practiceTrials = 1
        for (let i = 0; i < practiceTrials; i++) { 
            for (let i = 0; i < 6; i++) { 
                this.stimGr.getChildren()[i].alpha=0.2;
                await this.waitFor(100); 
            }

            // practice trial 1 
            await this.waitFor(1000); 
            
            for (let j = 0; j < 3; j++) { 
                this.stimGr.getChildren()[stims[i][j]].alpha=1;
                await this.waitFor(500); 
                await this.pingSparkles(stims[i][j], 0);
                await this.waitFor(1000); 

            }
            await this.animateCosmicParticle(tt[i])
            this.darkwell.gravity=100
            await this.waitFor(1000);                
            this.darkwell.gravity=30
            this.dark.stop()
            this.target_particles[tt[i]].dyn.start()

            await this.createSlider() 

            //await this.waitForSliderInput();                  
            this.target_particles[tt[i]].dyn.stop()
            
            // ISI 2
            await this.waitFor(1000);
            //this.target_particles[1].dynwell.gravity = 0

            // Show outcome text
            await this.showOutcomeMarker(outcm[i]);

            await this.removeSlider();

            this.outcmhandle.destroy()

            // Change alpha back to baseline
            this.stimGr.children.each((child) => {
                child.alpha = 0.2; // Set alpha to baseline
            });

        }
        this.tweens.add({
            targets:  this.intromusic,
            volume:   0,
            duration: 10000 //realMode 5000
            
        });

        this.makeEvePuff()
        await this.showInstructionButtons('instr13', 1);

        await this.showInstructionButtons('instr14', 1);
        
        this.moveAndShowEvee(560, 150, 600);

        await this.showInstructionButtons('instr15', 1);

        await this.showInstructionButtons('instr16', 1);

        this.sound.stopAll(); // Stop all playing sounds
        this.buildup = this.sound.add('buildup', {volume: 1});
        this.buildup.play();

        
        

        this.countdown()
        await this.waitFor(500);

        this.makeEvePuff(2, 200)
        await this.moveAndShowEvee(550, 250, 600);
        this.makeEvePuff(2, 200)
        await this.moveAndShowEvee(200, 200, 600);
        this.makeEvePuff(2, 200)
        await this.moveAndShowEvee(400, 500, 600);
        this.makeEvePuff(2, 200)
        this.spark.speed = 300
        await this.moveAndShowEvee(400, 300, 300);
        
        // Lower gravity
        this.spark.stop()
        this.sparkwell.gravity = 0; // Adjust gravity reduction as needed

        await this.waitFor(1500);


        
        // Move to ExperimentScene on "Spacebar" key press
        
                    
        this.scene.start('ExperimentScene', {
            m1: this.m1,
            m2: this.m2,
            m3: this.m3,
            schid: this.schid
        });
        
        this.spark.destroy(); // Destroy the spark particle

        }

    
    
    countdown() {
        this.loops = 3;

        const text = this.add.text(400, 300, this.loops, { font: '26px Courier', fill: '#fff' }).setOrigin(0.5);

        const emitter = this.add.particles(400, 300, 'flares', {
            frame: 'blue',
            blendMode: 'ADD',
            lifespan: 1000,
            frequency: 10,
            scale: { start: 0.3, end: 0.1 },
            stopAfter: 32
        });

        emitter.on('complete', () => {

            this.loops--;

            
            if (this.loops >= 0) {
                
                text.setText(this.loops);
                emitter.isPlaying
                emitter.start();

            }
            

        });

        emitter.addEmitZone({
            type: 'edge',
            source: new Phaser.Geom.Circle(0, 0, 40),
            quantity: 32
        });
    }

    fakeEnter() {
        return new Promise((resolve) => {
            // Move to ExperimentScene on "Spacebar" key press
                this.input.keyboard.on('keydown-ENTER', () => {
                        resolve()
                });


        });
    }

    
    veryStart() {
        return new Promise((resolve) => {
            const continueButton = this.add.sprite(400, 300, 'submit2').setInteractive();
            continueButton.setDisplaySize(40, 40); // Adjust size as needed
            continueButton.preFX.addGlow(0x87CEFA); // Light blue glow

            // Add instructions 1
            this.txt1 = this.add.text(400, 200, 'Take a comfortable seat, put your headphones on, and when ready, press start.', {
                fontSize: '20px',
                fontFamily: 'Arial',
                color: '#bfebfe',
                align: 'center'
            }).setOrigin(0.5);

            continueButton.on('pointerdown', () => {
                const instructionSound = this.sound.add("instr3a", {volume: 0.5});
                instructionSound.play();

                this.input.keyboard.on('keydown-SPACE', () => {
                    instructionSound.stop()
                    this.waitFor(200);
                    // Remove both buttons
                    this.intromusic = this.sound.add('intromusic', {volume: 1});
                    this.sound.stopAll();

                    this.intromusic.play();
                    this.waitFor(500);
                    continueButton.destroy();
                    this.txt1.destroy()
                    resolve()
                });
            });
        })

    }
    
    

    
}