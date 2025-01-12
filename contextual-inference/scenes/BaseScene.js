class BaseScene extends Phaser.Scene {
    constructor(key) {
        super(key);
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
        this.load.audio('intromusic', 'assets/sound/soundtrack/space_music1.mp3');
        this.load.audio('lvl1', 'assets/sound/soundtrack/game_music1.mp3');
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
        this.load.image('handle', 'assets/gps.png');
        this.load.image('outcm-handle', 'assets/gps2.png');
    }

    function_test() {
        console.log("Shared function called from", this.scene.key);
    }

    
    fetchData() {
        return new Promise((resolve) => {
            fetch('http://141.5.101.169/tasks-for-grants/contextual-inference/schedules/sch1.csv')
            .then(response => {
                // Check if the response is successful (status code 200–299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
                }
                return response.text();
            })
            .then(text => {
                try {
                    // Parse the CSV data using PapaParse
                    this.trialData = Papa.parse(text, { header: true }).data;

                    // Check if parsing resulted in any data
                    if (!this.trialData || this.trialData.length === 0) {
                        throw new Error('Parsed CSV data is empty.');
                    } else {
                        console.log('CSV data successfully loaded and parsed:', this.trialData);
                        resolve()
                    }

                    

                    // Call the function to run trials
                    // this.runTrials(); // Uncomment if applicable
                } catch (parseError) {
                    console.error('Error parsing CSV data:', parseError);
                }
            })
            .catch(error => {
                // Handle fetch and other errors
                console.error('Error fetching CSV file:', error);
                if (error.name === 'TypeError') {
                    console.error('This might be due to a network issue or an incorrect URL.');
                }
            });
        })

    }

    showStimuli() {
        const centerX = 400; // Center of the scene
        const centerY = 300; // Center of the scene
        const radius = 150; // Radius of the hexagon
        const stimSize = 50; // Size of each stimulus
        this.stimGr = this.add.group(); // Create a group for stimuli

        // Loop through the six positions (hexagonal layout)
        for (let i = 0; i < 6; i++) {
            const angle = Phaser.Math.DegToRad(i * 60); // Convert to radians (60-degree increments)
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            // Add each stimulus to the group
            const stim = this.add.sprite(x, y, `stim${i + 1}`).setDisplaySize(stimSize, stimSize);
            
            stim.alpha=0.2;

            this.time.delayedCall(400, () => {
                // Revert the speed after 50ms
                stim.alpha=1;
            });

            this.time.delayedCall(400, () => {
                // Revert the speed after 50ms
                stim.alpha=0.2;
            });
            
            
            this.stimGr.add(stim);
        }

        return; // Return the group if further manipulation is needed
    }


    pingSparkles(stimPos, sidx) {
        return new Promise((resolve) => {
            
            this.sparksound.play();
            const centerX = this.cameras.main.centerX;
            const centerY = this.cameras.main.centerY;

            // Get the stimulus position
            const stim = this.stimGr.getChildren()[stimPos];
            stim.alpha = 1
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
            const travelDuration = 800; // Adjust as needed for speed
            const sparkleTween = this.tweens.add({
                targets: spark,
                x: centerX,
                y: centerY,
                duration: travelDuration,
                onComplete: () => {
                    // Stop sparkle emission
                    spark.stop();

                    this.darkwell.power = 1
                    this.dark.lifespan +=  400 * sidx ** 2
                    
                    console.log(sidx)
                    if (sidx == 0) {
                        this.dark.start()
                    }
                    

                    if ((sidx+1) == 3) {
                        //this.dark.lifespan = 200
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

    animateCosmicParticle(target=0) {
        return new Promise((resolve) => {
            this.particlesound.play();
            const centerX = this.cameras.main.centerX;
            const centerY = this.cameras.main.centerY;

            // Get the target index and corresponding color
            const targetIndex = target; // Target index (0 or 1)
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

                    this.dark.color = [targetColor]

                    // Destroy the particle system after the effect
                    cosmicParticle.destroy();

                    // Continue the trial
                    resolve();
                },
            });
        });
    }

    createSlider() {
        const sliderWidth = 300; // Scale width in pixels
        const sliderHeight = 10; // Scale height

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY + 200; // Position slightly below the target

        this.scaleLine = this.add.image(centerX, centerY, 'gradient').setOrigin(0.5, 0.5);
        this.scaleLine.setDisplaySize(sliderWidth, sliderHeight);

        // Add the slider handle
        this.handle = this.add.sprite(centerX, centerY-15, 'handle').setDisplaySize(30, 30).setInteractive(); 

        this.input.setDraggable(this.handle);

        // Add text to display the rating above the slider
        this.ratingText = this.add.text(centerX-150, centerY + 30, 'Expected: 0', {
            fontSize: '14px',
            color: "#5dade2"
        })

        // Add text to display the rating above the slider
        this.lbl1 = this.add.text(centerX-160, centerY - 25, '-100 MW', {
            fontSize: '14px',
            color: "#8e44ad"
        });

        this.lbl2 = this.add.text(centerX+105, centerY - 25, '100 MW', {
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
                //this.currentRating
                const normalizedValue = (gameObject.x - (centerX - sliderWidth / 2)) / sliderWidth;
                const rating = Math.round(normalizedValue * 200 - 100); // Map to range -100 to 100
                this.ratingText.setText(`Estimate: ${rating} MW`);
                this.currentRating = rating; // Store the current rating


            }
        });

        // Add the submit button as an image
        this.submitButton = this.add.sprite(centerX+50, centerY + 35, 'submit2').setInteractive();
        this.submitButton.setDisplaySize(40, 40); // Adjust size as needed
        this.submitButton.preFX.addGlow(0x5dade2)


        this.submitButton.on('pointerdown', () => {
            console.log('Submitted rating:', this.currentRating);
            //save rating 
            if (this.inject_data = true) {
                console.log("Injected rating data")
                this.trialData[this.tridx].rating = this.currentRating;
            }
            this.removeSlider();
            this.sliderSubmitted = true; // Signal that the slider input is complete
            
        });

        // Initialize currentRating
        this.currentRating = 0; // Default value at the center
        this.sliderSubmitted = false;
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


    // Helper to remove all slider components
    removeSlider() {
        console.log("inside remove slider")
        this.scaleLine.destroy();
        this.handle.destroy();
        this.ratingText.destroy();
        this.submitButton.destroy();
        this.lbl1.destroy()
        this.lbl2.destroy()
    }

    showOutcomeMarker(outcome) {
        return new Promise((resolve) => {
            console.log("inside showOutcomeMarker ")
            const centerX = this.cameras.main.centerX;
            const centerY = this.cameras.main.centerY + 200;

            // Determine glow color based on the outcome
            const glowHexColor = outcome > 0 ? '#16a085': '#8e44ad';
            const txtColor = outcome > 0 ? '#a3e4d7' : '#d7bde2';
            //["#8e44ad", "#16a085"]
            if (outcome>0) {
                this.engain.play()
            } else {
                this.enloss.play()
            }
            // Add the outcome text
            const outcomeText = this.add.text(centerX, centerY-200, `${outcome} MW!`, {
                fontSize: '26px',
                fontFamily: 'Arial',
                color: txtColor,
                align: 'center',
            }).setOrigin(0.5);

            // Add crimson glow effect
            outcomeText.setStroke(glowHexColor, 6); // Crimson stroke around the text
            outcomeText.setShadow(2, 2, glowHexColor, 10, true, true); // Crimson glow effect

            // SHow their indicated outcome
            const sliderWidth = 300
            //const normalizedValue = (this.currentRating - (centerX - sliderWidth / 2)) / sliderWidth;
            console.log("X-coords outcome marker: " + centerX+outcome*1.5)
            this.outcmhandle = this.add.sprite(centerX+outcome*1.5, centerY-15, 'outcm-handle').setDisplaySize(30, 30).setOrigin(0.5);
            
            this.time.delayedCall(2000, () => {
                outcomeText.destroy();
                resolve(); // Resolve the promise after the text disappears
            });
        });
    }

    showOutcomeText(outcome) {
        return new Promise((resolve) => {
            const centerX = this.cameras.main.centerX;
            const centerY = this.cameras.main.centerY;

            // Determine glow color based on the outcome
            const glowHexColor = outcome > 0 ? '#16a085': '#8e44ad';
            const txtColor = outcome > 0 ? '#a3e4d7' : '#d7bde2';
            //["#8e44ad", "#16a085"]

            if (outcome>0) {
                this.engain.play()
            } else {
                this.enloss.play()
            }

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

                resolve(); // Resolve the promise after the text disappears
            });
        });
    }

    showText(text, x, y, size) {
    this.txt = this.add.text(x, y, text, {
                fontSize: size,
                fontFamily: 'Arial',
                color: "#87D8FC",
                align: 'center',
            }).setOrigin(0.5);
    }

    // GENERAL TIMING FUNCS
    waitFor(duration) {
        return new Promise((resolve) => {
            this.time.delayedCall(duration, resolve);
        });
    }


    // GENERAL SOUNDS THINGS
    playSound(sound) {
        return new Promise((resolve) => {
            const instructionSound = this.sound.add(sound, {volume: 0.5});
                instructionSound.play();
                resolve()
        })
    }


    // EVE THINGS
    makeEvePuff(newgravity=15, newspeed=200) {
        // Save the original properties of the particle system
        const originalSpeed = this.spark.speed;
        const originalGravity = this.sparkwell.gravity;

        // Temporarily increase speed
        this.spark.speed = newspeed; // Adjust speed increase as needed

        // Lower gravity
        this.sparkwell.gravity = newgravity; // Adjust gravity reduction as needed

        // Use delayed calls to restore the original properties
        this.time.delayedCall(50, () => {
            // Revert the speed after 50ms
            this.spark.speed = originalSpeed;
        });

        this.time.delayedCall(200, () => {
            // Revert the gravity after 200ms
            this.sparkwell.power = 1
            this.sparkwell.gravity = originalGravity;
        });
    }

    moveAndShowEvee(x, y, dur, puff=false) {
        return new Promise((resolve) => {
            if (!this.spark.wellactive) {
                this.sparkwell = this.spark.createGravityWell({
                            x: 0,
                            y: 0,
                            power: 1,
                            epsilon: 80,
                            gravity: 30,
                        });
                this.spark.wellactive =true
                }
            
            this.es = this.sound.add('evee_swish', {volume: 0.5});
            this.es.play()

            this.tweens.add({
                targets:  this.spark,
                x: x,
                y: y,
                speed: 150, 
                lifespan: 2000,
                duration: dur,
                ease: 'Cubic.easeOut',
                onComplete: () => {
                    //this.spark.x = x 
                    //this.spark.y = y 

                    
                    resolve();
                } 
            });
        })

    }

    showInstructionButtons(instr_string, sound, skipbuttons=false, key='pointerdown') {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        return new Promise((resolve) => {
            // Add replay button
            
            const continueButton = this.add.sprite(centerX+200, 500, 'submit2').setOrigin(0.5).setInteractive();
            continueButton.setDisplaySize(40, 40); // Adjust size as needed
            //continueButton.preFX.addGlow(0x87CEFA); // Light blue glow

            if (sound>0) {
                // /replayButton.destroy()
                const replayButton = this.add.sprite(centerX-200, 500, 'replay').setOrigin(0.5).setInteractive();
                replayButton.setDisplaySize(40, 40); // Adjust size as needed
                //replayButton.preFX.addGlow(0x87CEFA); // Light blue glow

                // Play the instruction sound initially
                const instructionSound = this.sound.add(instr_string, {volume: 0.5});
                instructionSound.play();

                if (!instructionSound.isPlaying & skipbuttons==true) {
                    replayButton.destroy();
                    continueButton.destroy();
                    if (instructionSound.isPlaying) {
                        instructionSound.stop();
                    }
                    resolve();
                }

                // Replay button logic
                replayButton.on(key, () => {
                    if (instructionSound.isPlaying) {
                        instructionSound.stop(); // Stop any active sound
                    }
                    instructionSound.play(); // Play the audio
                });

                continueButton.on(key, () => {
                    if (instructionSound.isPlaying) {
                        instructionSound.stop();
                    }
                    // Remove both buttons
                    replayButton.destroy();
                    continueButton.destroy();

                    resolve();
                });
            } else {
                continueButton.on(key, () => {
                // Remove both buttons
                continueButton.destroy();

                resolve();
            });

            }
            // Continue button logic
            
        });
    }



    sendTrialData() {
        const outdata = {partial: false, subid: "newstest", data: this.trialData} 
        this.postData(JSON.stringify(outdata));
    
    }
    
    postData(data) {
        console.log(data)
        console.log('entered postData');
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'save_data.php', true); // change 'write_data.php' to point to php script.
        xhr.setRequestHeader('Content-Type', 'application/json');
    
        xhr.addEventListener('readystatechange', function(e) {
            if( this.readyState === 4 ) {
                console.log(xhr.responseText)
                console.log('bye')
                //window.location.replace("http://www.thebestdinosaur.com")
                //window.location.replace("https://app.prolific.co/submissions/complete?cc="+completion_code)
                //window.location.replace("https://survey.academiccloud.de/index.php/614246?lang=en&PROLIFIC_PID="+prolific_pid)
    
            }});
        
        //console.log(data);
        xhr.send(data);
    
    
    }


}