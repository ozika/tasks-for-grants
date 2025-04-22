 // EXPERIMENT SCENE
 class ExperimentScene extends BaseScene {
    constructor() {
        super('ExperimentScene');
    }

    init(data) {
        if (flag == "_test") {
            this.m1 = "2";
            this.m2 = "3";
            this.m3 = "4";
            this.schid = "3";
        }
        else {
            this.m1 = data.m1;
            this.m2 = data.m2;
            this.m3 = data.m3;
            this.schid = data.schid;
        }
        
        
    }
    
    preload() {
        // Preload assets
        this.load.image('space', 'assets/nightsky.png');
        this.load.image('replay', 'assets/replay.png');
        this.load.image('submit2', 'assets/submit2.png');
        this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
        this.load.audio('instr3', 'assets/sound/instructions/instr3.wav');
        this.load.audio('instr4', 'assets/sound/instructions/instr4.wav');
        this.load.audio('instr5', 'assets/sound/instructions/instr5.wav');
        this.load.audio('instr6', 'assets/sound/instructions/instr6.wav');
        this.load.audio('instr7', 'assets/sound/instructions/instr7.wav');
        this.load.audio('instr8', 'assets/sound/instructions/instr8.wav');
        this.load.audio('instr8b', 'assets/sound/instructions/instr8b.wav');
        this.load.audio('instr8c', 'assets/sound/instructions/instr8c.wav');
        this.load.audio('instr8d', 'assets/sound/instructions/instr8d.wav');
        this.load.audio('instr9', 'assets/sound/instructions/instr9.wav');
        this.load.audio('instr10', 'assets/sound/instructions/instr10.wav');
        this.load.audio('instr11', 'assets/sound/instructions/instr11.wav');
        this.load.audio('instr12', 'assets/sound/instructions/instr12.wav');
        this.load.audio('instr13', 'assets/sound/instructions/instr13.wav');
        this.load.audio('instr14', 'assets/sound/instructions/instr14.wav');
        this.load.audio('instr15', 'assets/sound/instructions/instr15.wav');
        this.load.audio('instr16', 'assets/sound/instructions/instr16.wav');
        this.load.audio('instr3a', 'assets/sound/instructions/instr3a.wav');
        this.load.audio('instr3b', 'assets/sound/instructions/instr3b.wav');
        
        this.load.audio('instr_1_1', 'assets/sound/instructions/instr_1_1.wav');
        this.load.audio('instr_1_2a', 'assets/sound/instructions/instr_1_2a.wav');
        this.load.audio('instr_1_2b', 'assets/sound/instructions/instr_1_2b.wav');
        this.load.audio('instr_1_2bb', 'assets/sound/instructions/instr_1_2bb.wav');
        this.load.audio('instr_1_2b2', 'assets/sound/instructions/instr_1_2b2.wav');
        this.load.audio('instr_1_2b3', 'assets/sound/instructions/instr_1_2b3.wav');
        this.load.audio('instr_1_2b4', 'assets/sound/instructions/instr_1_2b4.wav');
        this.load.audio('instr_1_3', 'assets/sound/instructions/instr_1_3.wav');
        this.load.audio('instr_2_1', 'assets/sound/instructions/instr_2_1.wav');
        this.load.audio('instr_2_2', 'assets/sound/instructions/instr_2_2.wav');
        this.load.audio('instr_2_3', 'assets/sound/instructions/instr_2_3.wav');
        this.load.audio('instr_choice', 'assets/sound/instructions/instr_choice.wav');
        this.load.audio('instr_3_1', 'assets/sound/instructions/instr_3_1.wav');
        this.load.audio('instr_3_2_right', 'assets/sound/instructions/instr_3_2_right.wav');
        this.load.audio('instr_3_2_mostly', 'assets/sound/instructions/instr_3_2_mostly.wav');
        this.load.audio('instr_3_2_wrong', 'assets/sound/instructions/instr_3_2_wrong.wav');
        this.load.audio('instr_3_3', 'assets/sound/instructions/instr_3_3.wav');
        this.load.audio('instr_4_1', 'assets/sound/instructions/instr_4_1.wav');
        this.load.audio('instr_mf', 'assets/sound/instructions/instr_mf.wav');
        


        this.load.audio('intromusic', 'assets/sound/soundtrack/space_music1.mp3');
        this.load.audio('lvl1', 'assets/sound/soundtrack/game_music1.mp3');
        this.load.audio('lvl2', 'assets/sound/soundtrack/chapter1_playlist.mp3');
        this.load.audio('lvl3', 'assets/sound/soundtrack/chapter2_playlist.mp3');
        this.load.audio('lvl4', 'assets/sound/soundtrack/chapter3_playlist.mp3');
        this.load.audio('final_music', 'assets/sound/soundtrack/quirky_game_music.mp3');

        this.load.audio('buildup', 'assets/sound/effects/buildup.wav');
        this.load.audio('evee_swish', 'assets/sound/effects/evee_swish.wav');
        this.load.audio('spark', 'assets/sound/effects/spark1.wav');
        this.load.audio('particle', 'assets/sound/effects/particle.wav');
        this.load.audio('engain', 'assets/sound/effects/energygain2.wav');
        this.load.audio('enloss', 'assets/sound/effects/energyloss.wav');

        this.load.image('stim1', 'assets/potion.png');
        this.load.image('stim2', 'assets/starfish.png');
        this.load.image('stim3', 'assets/diamond.png');
        this.load.image('stim4', 'assets/crystals.png');
        this.load.image('stim5', 'assets/stone.png');
        this.load.image('stim6', 'assets/letax.png');

        this.load.image('realstim1', 'assets/donut.png');
        this.load.image('realstim2', 'assets/red-blood-cells.png');
        this.load.image('realstim3', 'assets/egg.png');
        this.load.image('realstim4', 'assets/elixir.png');
        this.load.image('realstim5', 'assets/mustard.png');
        this.load.image('realstim6', 'assets/cube.png');

        this.load.image('realstim21', 'assets/sd.png');
        this.load.image('realstim22', 'assets/cheese.png');
        this.load.image('realstim23', 'assets/oil.png');
        this.load.image('realstim24', 'assets/grass.png');
        this.load.image('realstim25', 'assets/frost.png');
        this.load.image('realstim26', 'assets/soil.png');

        this.load.image('realstim31', 'assets/salt.png');
        this.load.image('realstim32', 'assets/brw.png');
        this.load.image('realstim33', 'assets/ice.png');
        this.load.image('realstim34', 'assets/sun.png');
        this.load.image('realstim35', 'assets/leaf.png');
        this.load.image('realstim36', 'assets/herb.png');

        
        this.load.image('handle', 'assets/gps.png');
        this.load.image('outcm-handle', 'assets/gps2.png');




    }

    create() {
        console.log("m1:", this.m1, "m2:", this.m2, "m3:", this.m3);
        //this.m2 = m2
        this.flag=flag
        this.stimset = 1
        this.cfg =[] 
        this.cfg.ctx_alpha_baseline = 0.1
        this.cfg.ctx_alpha_peak = 1
        this.cfg.tar_alpha_baseline = 0.1

        this.cfg.music_vol = 0.4

        this.cfg.evee_volume = 1

        this.subID = idValue

        this.sparksound = this.sound.add('spark', {volume: 0.5});
        this.particlesound = this.sound.add('particle', {volume: 0.5})
        this.engain = this.sound.add('engain', {volume: 0.5})
        this.enloss = this.sound.add('enloss', {volume: 0.5});

        this.centerX = this.cameras.main.centerX;
        this.centerY = this.cameras.main.centerY -text_panel_h/2;

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



        // CREATE particles and wells for decision trials
        this.target_particles_1 = this.add.particles(this.centerX - 100, 300, 'flares', {
            frame: ['white'],
            color: [0xe74c3c], // Left particle color (red)
            lifespan: 2000,
            speed: 200,
            quantity: 2,
            scale: { start: 0.25, end: 0.1 },
            blendMode: 'SCREEN',
        });
        this.target_particles_1.stop()
        
        this.target_particles_2 = this.add.particles(this.centerX + 100, 300, 'flares', {
            frame: ['white'],
            color: [0x5dade2], // Right particle color (blue)
            lifespan: 2000,
            speed: 200,
            quantity: 2,
            scale: { start: 0.25, end: 0.1 },
            blendMode: 'SCREEN',
        });
        this.target_particles_2.stop()
        
        // Create two gravity wells
        this.target_particles_1_well = this.target_particles_1.createGravityWell({
            x: 0,
            y: 0,
            power: 1,
            epsilon: 80,
            gravity: 30,
        });
        
        this.target_particles_2_well = this.target_particles_2.createGravityWell({
            x: 0,
            y: 0,
            power: 1,
            epsilon: 80,
            gravity: 30,
        });

        //Make EVEEE

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
        this.spark.stop()

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
        this.stimGrReal = this.add.group(); // Create a group
        this.stimGrReal2 = this.add.group(); // Create a group
        this.stimGrReal3 = this.add.group(); // Create a group
        const jar_colors = [0xd7bde2, 0xfadbd8, 0xd5f5e3, 0xfcf3cf, 0xd6eaf8, 0xfdebd0];
     
        // Add 6 images at 60-degree increments

        //var jar_colors = [0xd7bde2, 0xfadbd8, 0xd5f5e3, 0xfcf3cf, 0xd6eaf8, 0xfdebd0]
        for (let i = 0; i < 6; i++) {
            let angle = Phaser.Math.DegToRad(i * 60); // Convert degrees to radians

            let x = this.cameras.main.centerX + r * Math.cos(angle);
            let y = (this.cameras.main.centerY - text_panel_h/2) + r * Math.sin(angle);

            // Create an image and add it to the group
            //let image = this.add.image(x, y, 'stim' + (i + 1)).setDisplaySize(stim_dim_x, stim_dim_y);
            let spr = this.add.sprite(x, y, 'stim' + (i + 1)).setDisplaySize(stim_dim_x, stim_dim_y); 
            spr.setAlpha(this.cfg.ctx_alpha_baseline);
            spr.postFX.addGlow(0x283747, 4, 0);
            // blue 0xaeb6bf
            this.stimGr.add(spr);

            let sti = this.add.sprite(x, y, 'realstim' + (i + 1)).setDisplaySize(stim_dim_x, stim_dim_y); 
            sti.setAlpha(0);
            sti.postFX.addGlow(0x283747, 4, 0);
            // blue 0xaeb6bf
            this.stimGrReal.add(sti);

            let sti2 = this.add.sprite(x, y, 'realstim2' + (i + 1)).setDisplaySize(stim_dim_x, stim_dim_y); 
            sti2.setAlpha(0);
            sti2.postFX.addGlow(0x283747, 4, 0);
            // blue 0xaeb6bf
            this.stimGrReal2.add(sti2);

            let sti3 = this.add.sprite(x, y, 'realstim3' + (i + 1)).setDisplaySize(stim_dim_x, stim_dim_y); 
            sti3.setAlpha(0);
            sti3.postFX.addGlow(0x283747, 4, 0);
            // blue 0xaeb6bf
            this.stimGrReal3.add(sti3);


        }

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

        
        
        
        

        

        
        
        this.runTask();



    }

    async runTask() {
        await this.fetchSubtitleScript("script.csv");

        // SHARP START
        this.lvl1music = this.sound.add('lvl1', {volume: 0.8, loop: true});
        if (this.lvl1music.isPlaying) {
            this.lvl1music.stop();
        }
        this.lvl1music.play();
        this.cv = this.createVolumeControl(this.lvl1music);

        // INITIAL WAIT
        await this.waitFor(2000);

        

        let cond = [];
        //cond[0] = { name: "train1", rel: "1" }; // make sure this is obvious like +20 -25
        cond[0] = { name: "train", flag:"", rel: "1"};
        cond[1] = { name: "train", flag:"", rel: "1" };
        cond[2] = { name: "main", bl:"1", flag:"", rel: this.m1.toString() };
        cond[3] = { name: "main", bl:"2", flag:"", rel: this.m2.toString() };
        cond[4] = { name: "main", bl:"3", flag:"", rel: this.m3.toString() };
        cond[5] = { name: "main", bl:"3", flag:"_extra", rel: this.m3.toString() };

        this.first_decision_made = 0

        // RUN TRAINING
        await this.runTrials(cond[0]);
        this.tweens.add({
            targets: this.lvl1music,
            volume: 0.02,
            duration: 4000 // Original duration
        });
        this.cv.destroy()
        await this.waitFor(3500)
                
        console.log("training 1 completed")
        for (let i = 0; i < 6; i++) { 
            this.stimGr.getChildren()[i].alpha=0.5;
            //this.stimGr.getChildren()[i].setGlow(0x85c1e9)
            await this.waitFor(100); 
        }

        // await this.showInstructionButtons('instr_1_1', 1, true);
        let instructionSound = this.sound.add('instr_1_1', {volume: 1});
        instructionSound.play();

        // Collect a click
        let clickedid = await this.getStimClick() 

        this.tweens.add({
            targets: this.lvl1music,
            volume: 0,
            duration: 2000 // Original duration
        });
        this.sound.stopAll();

        console.log("Correct stim: " + this.trialData[0].correct_stim)
        // Check if they selected the correct stimulus
        if (clickedid == this.trialData[0].correct_stim) {
            //this.stimGr.getChildren()[clickedid].alpha = 1
            await this.showInstructionButtons('instr_1_2a', 1, true);

        } else {
            while (clickedid !=this.trialData[0].correct_stim) {
                for (let i = 0; i < 6; i++) { 
                    this.stimGr.getChildren()[i].alpha=0.1;
                    //this.stimGr.getChildren()[i].setGlow(0x85c1e9)
                    //await this.waitFor(100); 
                }

                let i_1_2b = this.sound.add('instr_1_2b', {volume: 1});
                i_1_2b.play();
    
                await this.waitFor(2500)

                this.stimGr.getChildren()[this.trialData[0].correct_stim].alpha = 1

                await this.waitFor(4500)

                await this.showInstructionButtons('instr_1_2bb', 1, true);
                await this.showInstructionButtons('instr_1_2b2', 1, true);
                for (let i = 0; i < 6; i++) { 
                    this.stimGr.getChildren()[i].alpha=0.1;
                    //this.stimGr.getChildren()[i].setGlow(0x85c1e9)
                    await this.waitFor(100); 
                }


                this.lvl1music.stop();
                this.tweens.add({
                    targets: this.lvl1music,
                    volume: 0.8,
                    duration: 2000 // Original duration
                });

                this.lvl1music.play();
                this.cv = this.createVolumeControl(this.lvl1music);
                


                this.waitFor(3000)
                await this.runTrials(cond[1]);
                this.cv.destroy();

                this.tweens.add({
                    targets: this.lvl1music,
                    volume: 0,
                    duration: 4000 // Original duration
                });
                await this.waitFor(3500)
                        
                console.log("training 1 completed")
                for (let i = 0; i < 6; i++) { 
                    this.stimGr.getChildren()[i].alpha=0.5;
                    //this.stimGr.getChildren()[i].setGlow(0x85c1e9)
                    await this.waitFor(100); 
                }
                // await this.showInstructionButtons('instr_1_1', 1, true);
                //let instructionSound = this.sound.add('instr_1_1', {volume: 1});
                instructionSound.play();

                // Collect a click
                clickedid = await this.getStimClick() 
                console.log("Correct stim: " + this.trialData[0].correct_stim)
            }

            await this.showInstructionButtons('instr_1_2b3', 1, true);

        }
        
        this.lvl1music.stop();

        // Change alpha back to baseline
        this.stimGr.children.each((child) => {
            child.destroy(); 
        });

        await this.waitFor(1500)
       
        this.blinkStars(5000);
        
        await this.showInstructionButtons('instr_1_2b4', 1, true);
        //await this.waitFor(4000)

        //for (let i = 0; i < 6; i++) { 
        //    this.stimGrReal.getChildren()[i].alpha=0.5;
        ///    //this.stimGr.getChildren()[i].setGlow(0x85c1e9)
        //    await this.waitFor(200); 
       // }

        this.flashStimuli(this.stimGrReal);

        await this.showInstructionButtons('instr_1_3', 1, true);


        // SHARP START
        this.lvl2music = this.sound.add('lvl2', {volume: this.cfg.music_vol, loop: true});
        if (this.lvl2music.isPlaying) {
            this.lvl2music.stop();
        }
        this.lvl2music.play();
        this.cv = this.createVolumeControl(this.lvl2music);

        await this.waitFor(1000)
        for (let i = 0; i < 6; i++) { 
            this.stimGrReal.getChildren()[i].alpha=0.3;
            //this.stimGr.getChildren()[i].setGlow(0x85c1e9)
            await this.waitFor(200); 
        }
        

        await this.waitFor(8000)

        // RUN MAIN TASK I
        this.stimset = 2
        await this.runTrials(cond[2]);

        this.cv.destroy(); 
        this.tweens.add({
            targets: this.lvl2music,
            volume: 0,
            duration: 4000 // Original duration
        });

        await this.waitFor(2000)
        let i2_1 = this.sound.add('instr_2_1', {volume: 1});
        i2_1.play();
        await this.waitFor(5500)
        
        let post_rating = await this.getStimClicks() 

        this.blinkStars(5000)
        let ratings = [{"rated_relevant": post_rating, "no_rated_relevant": post_rating.length, "subID": this.subID, "condition": "main1", "truly_relevant": this.trialData[0].correct_stimuli}]
        console.log(ratings)


        this.sendRatingsData(ratings);

        console.log("submitted relevant ctxts: " + ratings.rated_relevant)
        console.log("no relevant ctxts: " + ratings.no_rated_relevant)

        for (let i = 0; i < 6; i++) { 
            this.stimGrReal.getChildren()[i].alpha=0;
            this.stimGrReal.getChildren()[i].disableInteractive()
            //this.stimGr.getChildren()[i].setGlow(0x85c1e9)
            await this.waitFor(20); 
        }

        await this.showInstructionButtons('instr_2_2', 1);

        await this.waitFor(1500)

        await this.showInstructionButtons('instr_2_3', 1);

        await this.flashStimuli(this.stimGrReal2);

        //for (let i = 0; i < 6; i++) { 
         //   this.stimGrReal2.getChildren()[i].alpha=0.1;
         //   this.stimGrReal2.getChildren()[i].disableInteractive()
            //this.stimGr.getChildren()[i].setGlow(0x85c1e9)
         //   await this.waitFor(100); 
        //}

        await this.waitFor(1000); 
        // RUN next barch of 
        this.lvl3music = this.sound.add('lvl3', {volume: this.cfg.music_vol, loop: true});
        if (this.lvl3music.isPlaying) {
            this.lvl3music.stop();
        }
        this.lvl3music.play();
        this.cv = this.createVolumeControl(this.lvl3music);
        await this.waitFor(5000); 

        this.stimset = 3

        await this.runTrials(cond[3]);

        this.cv.destroy();
        this.tweens.add({
            targets: this.lvl3music,
            volume: 0,
            duration: 2500 // Original duration
        });
        await this.waitFor(2500)
        //await this.showInstructionButtons('instr_2_1', 1, true);

        // Collect a click
        //const centerX = this.cameras.main.centerX;
        //this.subbutton =  this.add.sprite(centerX, 500, 'submit2').setOrigin(0.5).setInteractive();

        i2_1.play();
        await this.waitFor(5500)
        let post_rating2 = await this.getStimClicks() 

        this.blinkStars(5000)
        

        let ratings2 = [{"rated_relevant": post_rating2, "no_rated_relevant": post_rating2.length, "subID": this.subID, "condition": "main2", "truly_relevant": this.trialData[0].correct_stimuli}]
        console.log(ratings2)

        console.log("submitted relevant ctxts: " + ratings2.rated_relevant_2)
        console.log("no relevant ctxts: " + ratings2.no_rated_relevant_2)


        this.sendRatingsData(ratings2);

        for (let i = 0; i < 6; i++) { 
            this.stimGrReal2.getChildren()[i].alpha=0;
            this.stimGrReal2.getChildren()[i].disableInteractive()
        }

        this.blinkStars(5000);


        await this.showInstructionButtons('instr_3_1', 1);

        await this.showInstructionButtons('instr_4_1', 1);

        for (let i = 0; i < 6; i++) { 
            this.stimGrReal3.getChildren()[i].alpha=0.2;
            //this.stimGrReal3.getChildren()[i].disableInteractive()
            //this.stimGr.getChildren()[i].setGlow(0x85c1e9)
            await this.waitFor(50); 
        }

        await this.flashStimuli(this.stimGrReal3);


        ///Run main3 here
        this.lvl4music = this.sound.add('lvl4', {volume: this.cfg.music_vol, loop: true});
        if (this.lvl4music.isPlaying) {
            this.lvl4music.stop();
        }
        this.lvl4music.play();
        this.cv = this.createVolumeControl(this.lvl4music);
        await this.waitFor(5000);

        this.stimset = 4
        await this.runTrials(cond[4]);
        //take the volume down
        
        this.tweens.add({
            targets: this.lvl4music,
            volume: 0,
            duration: 2500 // Original duration
        });
        await this.waitFor(1500)

        await this.showInstructionButtons('instr_mf', 1);

        this.tweens.add({
            targets: this.lvl4music,
            volume: this.cfg.music_vol,
            duration: 2500 // Original duration
        });
        await this.runTrials(cond[5]);
        this.cv.destroy();
        this.tweens.add({
            targets: this.lvl4music,
            volume: 0,
            duration: 2500 // Original duration
        });
        
        i2_1.play();
        await this.waitFor(5500)
        let post_rating3 = await this.getStimClicks() 

        this.blinkStars(5000)
        

        let ratings3 = [{"rated_relevant": post_rating3, "no_rated_relevant": post_rating3.length, "subID": this.subID, "condition": "main3", "truly_relevant": this.trialData[0].correct_stimuli}]
        console.log(ratings3)

        console.log("submitted relevant ctxts: " + ratings2.rated_relevant_2)
        console.log("no relevant ctxts: " + ratings2.no_rated_relevant_2)


        this.sendRatingsData(ratings3);

        for (let i = 0; i < 6; i++) { 
            this.stimGrReal3.getChildren()[i].alpha=0;
            this.stimGrReal3.getChildren()[i].disableInteractive()
        }

        this.blinkStars(5000);
        this.spark.start()
        await this.moveAndShowEvee(400, 300, 200, true);

        

        this.waitFor(1000)
        this.createGentleMotion()

        // calcualte average accuracy
        await this.showInstructionButtons('instr_3_2_mostly', 1);

        await this.showInstructionButtons('instr_3_3', 1);

        this.fin = this.sound.add('final_music', {volume: 1, loop: true});
        if (this.fin.isPlaying) {
            this.fin.stop();
        }
        this.fin.play();
        await this.waitFor(5000)
        this.tweens.add({
            targets: this.fin,
            volume: 0,
            duration: 10000 // Original duration
        });
        await this.waitFor(5000)
        this.sparkwell.gravity = 0
        this.spark.stop()
        
        

    }

    
    flashStimuli(group) {
        group.getChildren().forEach((stim, i) => {
            // Step 1: Light up to alpha = 1
            this.tweens.add({
                targets: stim,
                alpha: 1,
                duration: 500, // Quick increase
                ease: 'Cubic.easeOut',
                onComplete: () => {
                    // Step 2: Create blue particle effect behind the stimulus
                    const blinkParticles = this.add.particles(stim.x, stim.y, 'flares', {
                        frame: ['blue'], // Blue particle effect
                        lifespan: 500, // Particles last for 500ms
                        speed: 100,
                        quantity: 10,
                        scale: { start: 0.2, end: 0 },
                        blendMode: 'SCREEN',
                    });
        
                    blinkParticles.setDepth(-1); // Move the particles behind the stimuli
                    blinkParticles.start();
        
                    // Stop particle emission after 30ms (quick flash)
                    this.time.delayedCall(30, () => {
                        blinkParticles.stop();
                    });
        
                    // Remove the particles after their lifespan ends
                    this.time.delayedCall(500, () => {
                        blinkParticles.destroy(); // Destroy particles after their effect is done
        
                        // Step 3: Fade to alpha = 0.2
                        this.tweens.add({
                            targets: stim,
                            alpha: 0.2,
                            duration: 3000,
                            ease: 'Cubic.easeIn',
                        });
                    });
                }
            });
        });
    }
    // Start trial and process stimuli sequence
    async runTrials(conf) {
            
            
            var cond_name = "r"+conf.rel +"_"+conf.name+"_"+this.schid.toString()+conf.flag+this.flag
            this.cond_name = "r"+conf.rel +"_"+conf.name+conf.bl+"_"+this.schid.toString()+conf.flag+this.flag
            await this.fetchData("sch_"+cond_name+".csv")


            if (!this.trialData || this.trialData.length === 0) {
                console.error('No trial data available!');
                return;
            } else {
                console.log("sch_"+cond_name+".csv" + " succesfully loaded!")
            }
            this.tridx = 0; 
            this.trialData.t_loadstart = performance.now();
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
                this.startMouseTrack()
                this.trialData[this.tridx].t_trial_start = performance.now();
                await this.showMouseStartAnchor();

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
                var no_shown = this.trialData[0].no_shown 
                console.log("no stimuli shown:" + no_shown)
                for (let j = 1; j <= no_shown; j++) {
                    let stimPosition = parseInt(this.trialData[this.tridx][`stim_positions_stim${j}`], 10) - 1; // -1 because the positions start at 1, not 0
                    this.trialData[this.tridx].seq.push(stimPosition);
                }
                console.log("   Sequence: " + this.trialData[this.tridx].seq);

                // Flash stimuli in sequence
                await this.showCtxtCues(this.trialData[this.tridx].seq);
                
                this.dark.lifespan = 200

                // Show text
                //var txt =[]
                //txt = this.showText("Particle incoming!", 400, 100, "18px")
                this.trialData[this.tridx]["t_part_incoming_msg"] = performance.now();
                let txtobj = this.add.text(400, 100, "Particle incoming!", {
                    fontSize: "18px",
                    fontFamily: 'Arial',
                    color: "#87D8FC",
                    align: 'center',
                }).setOrigin(0.5);
                

                // ISI 1
                await this.waitFor(this.timing.isi1)//+ Math.random() * 5000);

                

                
                if (this.trialData[this.tridx].decision == 1 ) {
                    
                                        
                    // stop particle incubator
                    this.target_particles[this.trialData[this.tridx].target-1].dyn.stop()
                    // assign rating NaN
                    this.trialData[this.tridx].rating = "NaN"

                    let chtext = this.add.text(400, 200, "Choose one to collect energy!", {
                        fontSize: "18px",
                        fontFamily: 'Arial',
                        color: "#87D8FC",
                        align: 'center',
                    }).setOrigin(0.5);
                    this.trialData[this.tridx]["t_ch_cosmic_particle_start"] = performance.now();
                    this.animateCosmicParticle(0, this.centerX-200, 0, this.centerX-100, this.centerY);
                    await this.animateCosmicParticle(1, this.centerX+200, 0, this.centerX+100, this.centerY);
                    // Safely destroy the text
                    txtobj.destroy();

                    // Show two possible targets
                    this.trialData[this.tridx]["t_ch_targets_shown"] = performance.now();
                    this.target_particles_1.start();
                    this.target_particles_2.start();
                    this.dark.stop()

                    if (this.first_decision_made == 0 & this.stimset == 1)  {
                        this.tweens.add({
                            targets: this.lvl1music,
                            volume: 0.2,
                            duration: 2000 // Original duration
                        });
                        await this.waitFor(2000)
                        let ds = this.sound.add('instr_choice', {volume: 1});
                        ds.play();
                        await this.waitFor(8000)
                        this.first_decision_made = 1
                        this.tweens.add({
                            targets: this.lvl1music,
                            volume: 1,
                            duration: 2000 // Original duration
                        });
                    }

                    await this.decision_trial()
                    chtext.destroy()

                    await this.waitFor(3000);

                } else {
                    this.trialData[this.tridx].choice = "NaN";

                    // Cosmic particle animation
                    this.trialData[this.tridx]["t_cosmic_particle_start"] = performance.now();
                    await this.animateCosmicParticle(this.trialData[this.tridx].target - 1);
                    // Safely destroy the text
                    txtobj.destroy();
                    // show the color of the target
                    this.trialData[this.tridx]["t_target_shown"] = performance.now();
                    this.target_particles[this.trialData[this.tridx].target-1].dyn.start()
                    this.dark.stop()
                    // Show target
                    //await this.showTarget(this.trialData[this.tridx].target);
                    //this.dyn.speed = 300
                    //this.dynwell.gravity = 60

                    await this.waitFor(this.timing.target_dur);

                    // Display slider and wait for rating
                    if (this.trialData[this.tridx].require_rating == 1) {
                        await this.createSlider();
                        this.removeSlider()
                        this.trialData[this.tridx]["t_slider_removed"] = performance.now();
                    } else { 
                        this.trialData[this.tridx].rating = "NaN"
                    }
                    //await this.waitForSliderInput();

                    
                    this.target_particles[this.trialData[this.tridx].target-1].dyn.stop()

                    // ISI 2
                    await this.waitFor(this.timing.isi2);
                    this.target_particles[this.trialData[this.tridx].target-1].dynwell.gravity = 0

                    // Show outcome text
                    await this.showOutcomeText(this.trialData[this.tridx].outcome);

                }
                
                
                

                // Change alpha back to baseline
                if (this.stimset == 1) {
                    this.stimGr.children.each((child) => {
                        child.alpha = this.cfg.ctx_alpha_baseline; // Set alpha to baseline
                    });
                } else if (this.stimset == 2) {
                    this.stimGrReal.children.each((child) => {
                        child.alpha = this.cfg.ctx_alpha_baseline; // Set alpha to baseline
                    });
                } else if (this.stimset == 3) {
                    this.stimGrReal2.children.each((child) => {
                        child.alpha = this.cfg.ctx_alpha_baseline; // Set alpha to baseline
                    });
                } else if (this.stimset == 4) {
                    this.stimGrReal3.children.each((child) => {
                        child.alpha = this.cfg.ctx_alpha_baseline; // Set alpha to baseline
                    });
                }
                 
                

                await this.waitFor(this.timing.iti);
                this.stopMouseTrack()
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

    startMouseTrack() {
        // Clear any previous tracking
        if (this.mouseTrackInterval) {
            clearInterval(this.mouseTrackInterval);
        }
        
        // Reset mouse tracking storage
        this.mouseData = [];

        // Start tracking every 50ms
        this.mouseTrackInterval = setInterval(() => {
            let time = performance.now(); // High-resolution timestamp
            let xpos = this.input.activePointer.x;
            let ypos = this.input.activePointer.y;
            
            this.mouseData.push({ time, xpos, ypos });
        }, 50);

        //console.log(`Started mouse tracking for Trial: ${trialID}, Condition: ${cond_name}`);
    }

    stopMouseTrack() {
        if (this.mouseTrackInterval) {
            clearInterval(this.mouseTrackInterval);
            this.mouseTrackInterval = null;
        }

        // Store tracked data in trialData
        if (this.trialData && this.trialData[this.tridx]) {
            this.trialData[this.tridx].mouse_time = this.mouseData.map(d => d.time);
            this.trialData[this.tridx].mouse_xpos = this.mouseData.map(d => d.xpos);
            this.trialData[this.tridx].mouse_ypos = this.mouseData.map(d => d.ypos);
        }

        //console.log(`Mouse tracking stopped for Trial: ${trialID}, Condition: ${cond_name}`);
    }

    decision_trial() {
        return new Promise((resolve) => { 
            const centerX = this.cameras.main.centerX;
            const centerY = this.cameras.main.centerY -text_panel_h/2;
            this.leftTargetZone = this.add.rectangle(centerX - 100, centerY, 50, 50, 0xffffff, 0)
                .setOrigin(0.5)
                .setInteractive();

            this.rightTargetZone = this.add.rectangle(centerX + 100, centerY, 50, 50, 0xffffff, 0)
                .setOrigin(0.5)
                .setInteractive();

            

            const handleChoice = (choice) => {
                this.trialData[this.tridx]["t_ch_choice_made"] = performance.now();
                // Stop both particle emitters
                this.target_particles_1.stop();
                this.target_particles_2.stop();
            
                // Hide interactive zones
                this.leftTargetZone.disableInteractive();
                this.rightTargetZone.disableInteractive();
            
                // Save the choice
                this.trialData[this.tridx].choice = choice; // 1 = left, 2 = right
            
                // Determine outcome
                let outcomeText = (choice === 1) ? this.trialData[this.tridx].t1_ev : this.trialData[this.tridx].t2_ev;
                let outcomeX = (choice === 1) ? centerX - 100 : centerX + 100;
            
                // Show outcome at the chosen target location
                this.trialData[this.tridx]["t_outcome_txt_shown"] = performance.now();
                this.showOutcomeText(outcomeText, outcomeX, centerY);
                resolve()
            };
            
            // Click events
            this.leftTargetZone.once('pointerdown', () => handleChoice(1));
            this.rightTargetZone.once('pointerdown', () => handleChoice(2));

        
        })
    }


    async showCtxtCues(sequence) {
        for (let i = 0; i < sequence.length; i++) {
            const stimPos = sequence[i];
            

            // Show the stimulus at the current position
            this.trialData[this.tridx]["t_stim"+(i+1).toString()+"_shown"] = performance.now();
            this.showStimulus(stimPos);

            // Extend the line from the stimulus to the center and draw the circle
            await this.extendLineAndDrawCircle(stimPos, i);
            this.trialData[this.tridx]["t_stim"+(i+1).toString()+"_spark_arrived"] = performance.now();
            console.log("timing_recorded")
            console.log(this.trialData[this.tridx])

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

    if (this.stimset == 1) {
        group = this.stimGr
    } else if (this.stimset == 2) {
        group =this.stimGrReal

    } else if (this.stimset == 3) {
        group =this.stimGrReal2

    } else if (this.stimset == 4) {
        group =this.stimGrReal3

    }

    // Ensure position is valid
    if (stpos < 0 || stpos >= group.getChildren().length) {
        console.error(`Invalid stimulus position: ${stpos}`);
        return;
    }
    let targetStim = group.getChildren()[stpos]; // Get the image by index
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
        this.sparksound.play();
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY -text_panel_h/2;

        // Get the stimulus position
        console.log("Stimset:"+  this.stimset)
        let stim =1
        if (this.stimset == 1) {
            console.log("In stimset 1")
            stim = this.stimGr.getChildren()[stimPos];
        } else if (this.stimset == 2) {
            console.log("In stimset 2")
            stim = this.stimGrReal.getChildren()[stimPos];

        } else if (this.stimset == 3) {
            console.log("In stimset 3")
            stim = this.stimGrReal2.getChildren()[stimPos];

        } else if (this.stimset == 4) {
            console.log("In stimset 4")
            stim = this.stimGrReal3.getChildren()[stimPos];

        }
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