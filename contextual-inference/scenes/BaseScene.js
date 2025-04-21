class BaseScene extends Phaser.Scene {
    constructor(key) {
        super(key);
    }
    
    init() {
        this.subtitleMap = {};
        this.width = width;
        this.height = height;
    }


    preload() {
        // Preload assets
        this.load.image('space', 'assets/nightsky.png');
        this.load.image('replay', 'assets/replay.png');
        this.load.image('submit2', 'assets/submit2.png');
        this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
        this.load.audio('instr3', 'assets/sound/instructions/instr3.wav');
        this.load.audio('instr4', 'assets/sound/instructions/instr4.wav');
        this.load.audio('instr4b', 'assets/sound/instructions/instr4b.wav');
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
        this.load.audio('instr_struct', 'assets/sound/instructions/instr_struct.wav');
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
        this.load.image('scheme', 'assets/scheme.png');

        //this.load.text('subtitle_script', 'assets/script/script.csv');
    }

    

    function_test() {
        console.log("Shared function called from", this.scene.key);
    }

    fetchSubtitleScript(script_name) {
        return new Promise((resolve) => {
            console.log("Fetching script from: assets/script/" + script_name);
            fetch('assets/script/' + script_name)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(text => {
                    try {
                        const parsed = Papa.parse(text, { header: true });
                        console.log(parsed);
                        this.subtitleMap = {};
                        parsed.data.forEach(row => {
                            if (row.code && row.Text_visual) {
                                this.subtitleMap[row.code.trim()] = row.Text_visual.trim();
                            }
                        });
                        console.log(this.subtitleMap);
                        console.log('Subtitle script successfully loaded.');
                        resolve();
                    } catch (parseError) {
                        console.error('Error parsing subtitle CSV:', parseError);
                    }
                })
                .catch(error => {
                    console.error('Error fetching subtitle script:', error);
                });
        });
    }

    fetchData(schedule_name) {
        return new Promise((resolve) => {
            console.log("fetching "+ "schedules/"+schedule_name)
            fetch('schedules/'+schedule_name)
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

    
    // Add this new method inside the IntroScene class:
    condSelectionPhase() {
        return new Promise((resolve) => {
            const centerX = this.cameras.main.centerX;
            const centerY = this.cameras.main.centerY - text_panel_h / 2;
            const spacing = 70;
            const startX = centerX - (spacing * 2.5);
            const squareSize = 50;

            const squareGroup = this.add.group();

            // Play audio instruction
            this.temp_txt = this.showSubtitle('instr4b');
            const audio = this.sound.add('instr4b');
            audio.play();

            for (let i = 0; i < 6; i++) {
                const square = this.add.rectangle(startX + spacing * i, centerY, squareSize, squareSize, 0xffffff)
                    .setInteractive();

                squareGroup.add(square);

                square.on('pointerdown', () => {
                    this.cond_idx = i;
                    squareGroup.clear(true, true); // destroy all squares

                    // Schedule options
                    const options = ["234", "243", "324", "342", "423", "432"];
                    Phaser.Utils.Array.Shuffle(options);
                    const schval = options[i];

                    this.m1 = parseInt(schval[0]);
                    this.m2 = parseInt(schval[1]);
                    this.m3 = parseInt(schval[2]);
                    this.schid = Phaser.Math.Between(1, 5);
                    this.temp_txt.destroy()

                    console.log("Schedule chosen:", schval, "-> m1:", this.m1, "m2:", this.m2, "m3:", this.m3, "schid:", this.schid);

                    resolve();
                });
            }
        });
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


    showSubtitle(code) {
        console.log("inside showSubtitle")
        const subtitle = this.subtitleMap?.[code] || '';
        //console.log(subtitle);
        if (!subtitle) {
            console.warn(`Subtitle for code "${code}" not found.`);
            return null;
        }
    
        const subtitleText = this.add.text(400, 650, subtitle, {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#FFFFFF',
            align: 'center',
            wordWrap: { width: 780 }
        }).setOrigin(0.5);
    
        return subtitleText;
    }

    pingSparkles(stimPos, sidx) {
        return new Promise((resolve) => {
            
            this.sparksound.play();
            const centerX = this.cameras.main.centerX;
            const centerY = this.cameras.main.centerY-text_panel_h/2;
            //console.log("in pingSprkles(), centerX: "+centerX)
            //console.log("in pingSprkles(), centerY: "+centerY)

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

    animateCosmicParticle(target=0, x0=this.cameras.main.centerX, y0=0, xend=this.cameras.main.centerX, yend=this.cameras.main.centerY-text_panel_h/2) {
        return new Promise((resolve) => {
            this.particlesound.play();
            // Get the target index and corresponding color
            const targetIndex = target; // Target index (0 or 1)
            const targetColor = targetIndex === 0 ? 0xe74c3c : 0x45b39d; // Example colors for two targets

            // Create the cosmic particle
            const cosmicParticle = this.add.particles(x0, y0, 'flares', {
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
                    x: { value: xend },
                    y: { value: yend },
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
        return new Promise((resolve) => {
            const sliderWidth = 300; // Scale width in pixels
            const sliderHeight = 10; // Scale height
    
            const centerX = this.cameras.main.centerX;
            const centerY = this.cameras.main.centerY - text_panel_h/2 + 200; // Position slightly below the target
    
            // Scale line (clickable)
            this.scaleLine = this.add.image(centerX, centerY, 'gradient').setOrigin(0.5, 0.5);
            this.scaleLine.setDisplaySize(sliderWidth, sliderHeight);
            this.scaleLine.setInteractive(); // Make scale line clickable
    
            // Add the slider handle (invisible at first)
            this.handle = this.add.sprite(centerX, centerY - 15, 'handle')
                .setDisplaySize(30, 30)
                .setInteractive()
                .setAlpha(0); // Invisible at start
    
            this.input.setDraggable(this.handle);
    
            // Add text to display the rating above the slider
            this.ratingText = this.add.text(centerX - 150, centerY + 30, '', {
                fontSize: '14px',
                color: "#5dade2"
            });
    
            // Add min/max labels
            this.lbl1 = this.add.text(centerX - 160, centerY - 25, '-100 MW', {
                fontSize: '14px',
                color: "#8e44ad"
            });
    
            this.lbl2 = this.add.text(centerX + 105, centerY - 25, '100 MW', {
                fontSize: '14px',
                color: "#16a085"
            });
    
            if (!this.scene.isActive('IntroScene')) {
                this.trialData[this.tridx]["t_slider_shown"] = performance.now();
            }
    
            // Function to update slider position and value
            const updateSlider = (xPos) => {
                this.handle.x = Phaser.Math.Clamp(xPos, centerX - sliderWidth / 2, centerX + sliderWidth / 2);
    
                // Map position to -100 to 100
                const normalizedValue = (this.handle.x - (centerX - sliderWidth / 2)) / sliderWidth;
                const rating = Math.round(normalizedValue * 200 - 100);
                this.ratingText.setText(`Estimate: ${rating} MW`);
                this.currentRating = rating;
            };
    
            // Clicking on the scale line makes the handle visible & moves it
            this.scaleLine.on('pointerdown', (pointer) => {
                this.handle.setAlpha(1); // Show the handle
                updateSlider(pointer.x);
            });
    
            // Dragging the handle updates the rating
            this.input.on('drag', (pointer, gameObject, dragX) => {
                if (gameObject === this.handle) {
                    if (!this.scene.isActive('IntroScene')) {
                        this.trialData[this.tridx]["t_first_click_on_handle"] = performance.now();
                    }
                    updateSlider(dragX);
                }
            });
    
            // Add the submit button
            this.submitButton = this.add.sprite(centerX + 50, centerY + 35, 'submit2').setInteractive();
            this.submitButton.setDisplaySize(40, 40);
            this.submitButton.preFX.addGlow(0x5dade2);
    
            this.submitButton.on('pointerdown', () => {
                if (!this.scene.isActive('IntroScene')) {
                    this.trialData[this.tridx]["t_response_made"] = performance.now();
                    this.trialData[this.tridx].rating = this.currentRating;
                }
                console.log('Submitted rating:', this.currentRating);
    
                this.sliderSubmitted = true;
                resolve();
            });
    
            // Initialize currentRating
            this.currentRating = 0;
            this.sliderSubmitted = false;
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


    // Helper to remove all slider components
    removeSlider() {
        //console.log("inside remove slider")
        this.scaleLine.destroy();
        this.handle.destroy();
        this.ratingText.destroy();
        this.submitButton.destroy();
        this.lbl1.destroy()
        this.lbl2.destroy()
    }

    async getStimClick() {
        //console.log("inside getStimClick")
        // Enable interactivity for all sprites
        this.stimGr.children.each((sprite) => {
            sprite.setInteractive();
        });

        // Wait for a sprite to be clicked
        await this.waitForStimClick();

        console.log(`Player clicked sprite with ID: ${this.stimSelected}`);

        return this.stimSelected

        // Disable interactivity for all sprites
        //this.disableStimInteractivity();
    } 


    async disableStimInteractivity() {
        this.stimGr.children.each((sprite) => {
            sprite.disableInteractive(); // Disable interactivity
            sprite.off('pointerdown'); // Remove the pointerdown listener
        });
    
        console.log("Sprites are no longer interactive");
    } 


    

    async waitForStimClick() {
        return new Promise((resolve) => {
            console.log("inside waitForStimClick")
            this.stimGr.getChildren().forEach((sprite, index) => {
                sprite.on('pointerdown', () => {
                    this.stimSelected = index; // Save the index of the selected sprite
                    sprite.setAlpha(1); // Highlight the clicked sprite
                    console.log(`Sprite clicked at index: ${index}`);
    
                    // Disable interactivity for all sprites
                    this.stimGr.getChildren().forEach((s) => s.disableInteractive());

                    this.time.delayedCall(150, () => {
                        sprite.setAlpha(1); // Highlight the clicked sprite
                        resolve(sprite); // Resolve the promise with the clicked sprite
                    });
    
                    
                });
            });


        });
    }

    async getStimClicks() {
        return new Promise((resolve) => { 
        console.log("inside getStimClicks");
    
        var ingr = this.add.text(400, 300, 'Select all ingredients that you think interacted\n with the particle.\n\n\n (click on as many as you want and then click submit)', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#48e0fc',
            align: 'center'
        }).setOrigin(0.5);
    
        const centerX = this.cameras.main.centerX;
        this.subbutton = this.add.sprite(centerX, 530, 'submit2').setOrigin(0.5).setInteractive();
        this.subbutton.setDisplaySize(40, 40);
        this.subbutton.setAlpha(0.2); // Initially low visibility
        this.subbutton.preFX.addGlow(0x808080); // Gray taint
    
        let confirmText = null;
        let firstClick = false;
    
        let selectedStimuli = new Set();
        let group = this.stimset == 2 ? this.stimGrReal : this.stimset == 3 ? this.stimGrReal2 : this.stimset == 4 ? this.stimGrReal3 : 1;
    
        const resetSubmitButton = () => {
            firstClick = false;
            if (confirmText) {
                confirmText.destroy();
                confirmText = null;
            }
        };
    
        group.children.each((sprite, index) => {
            sprite.setInteractive();
            sprite.setAlpha(1); // Default full opacity
    
            sprite.on('pointerdown', () => {
                if (selectedStimuli.has(index)) {
                    selectedStimuli.delete(index);
                    sprite.setAlpha(1); // Reset to normal appearance
                    sprite.preFX?.clear(); // Remove glow effect
                } else {
                    selectedStimuli.add(index);
                    sprite.preFX?.clear();
                    sprite.preFX?.addGlow(0x48e0fc, 5, 2, false);
                }
    
                // Update submit button opacity based on selections
                if (selectedStimuli.size > 0) {
                    this.subbutton.setAlpha(1);
                    this.subbutton.preFX.clear();
                    this.subbutton.preFX.addGlow(0x5dade2);
                } else {
                    this.subbutton.setAlpha(0.2);
                    this.subbutton.preFX.clear();
                    this.subbutton.preFX.addGlow(0x808080);
                }
    
                // If they modify selection after clicking submit, reset confirmation
                resetSubmitButton();
            });
        });
    
        // Handle submit button clicks
        this.subbutton.on('pointerdown', async () => {
            if (!firstClick) {
                firstClick = true;
    
                // Display confirmation text next to the button
                if (!confirmText) {
                    confirmText = this.add.text(this.subbutton.x + 50, this.subbutton.y, 'Click again to confirm', {
                        fontSize: '18px',
                        fontFamily: 'Arial',
                        color: '#48e0fc',
                        align: 'left'
                    }).setOrigin(0, 0.5);
                }
            } else {
                // Second click confirms selection
                if (confirmText) confirmText.destroy();
                this.subbutton.destroy()
    
                this.trialData[this.tridx].relevant_chosen = selectedStimuli;
                console.log(`Player selected stimuli with IDs: ${Array.from(selectedStimuli)}`);
                ingr.destroy();
        
                resolve(Array.from(selectedStimuli));
            }
        });
    
        // Wait for the submit button click (the function will only proceed after the second click)
        //await this.waitForSubmitClick();
    })
    }
    
    async waitForSubmitClick() {
        return new Promise((resolve) => {
            this.subbutton.once('pointerdown', () => {
                this.subbutton.destroy()
                resolve(); // Resolve when submit button is clicked
            });
        });
    }

    createVolumeControl(targetSound) {
        const x = 770;
        const y = 550;
        const barWidth = 10;
        const barHeight = 50;
    
        // Label
        const label = this.add.text(x, y - 60, 'Volume', {
            fontSize: '12px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);
    
        // Background bar
        const bar = this.add.rectangle(x, y, barWidth, barHeight, 0x888888).setOrigin(0.5);
    
        // Draggable handle
        const handle = this.add.rectangle(x, y - barHeight / 2, barWidth + 10, 10, 0xffffff).setInteractive({ useHandCursor: true });
        this.input.setDraggable(handle);
    
        // Volume % text
        const volText = this.add.text(x, y + 40, '100%', {
            fontSize: '12px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);
    
        // Drag behavior
        const dragCallback = (pointer, gameObject, dragX, dragY) => {
            if (gameObject === handle) {
                handle.y = Phaser.Math.Clamp(dragY, y - barHeight / 2, y + barHeight / 2);
                const normalized = 1 - (handle.y - (y - barHeight / 2)) / barHeight;
                const volume = Phaser.Math.Clamp(normalized, 0, 1);
                targetSound.setVolume(volume);
                volText.setText(`${Math.round(volume * 100)}%`);
            }
        };
    
        this.input.on('drag', dragCallback);
    
        // Return a control interface
        return {
            disable: () => {
                handle.disableInteractive();
                this.input.off('drag', dragCallback);
            },
            destroy: () => {
                handle.destroy();
                bar.destroy();
                volText.destroy();
                label.destroy();
                this.input.off('drag', dragCallback);
            }
        };
    }

    showOutcomeMarker(outcome) {
        return new Promise((resolve) => {
            console.log("inside showOutcomeMarker ")
            const centerX = this.cameras.main.centerX;
            const centerY = this.cameras.main.centerY -text_panel_h/2 + 200;

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

    showOutcomeText(outcome, x=this.cameras.main.centerX, y=this.cameras.main.centerY -text_panel_h/2) {
        return new Promise((resolve) => {
            const glowHexColor = outcome > 0 ? '#16a085' : '#8e44ad';
            const txtColor = outcome > 0 ? '#a3e4d7' : '#d7bde2';
    
            // Play sound effect
            if (outcome > 0) {
                this.engain.play();
            } else {
                this.enloss.play();
            }
    
            // Show outcome text at the specified position
            const outcomeText = this.add.text(x, y, `${outcome} MW!`, {
                fontSize: '26px',
                fontFamily: 'Arial',
                color: txtColor,
                align: 'center',
            }).setOrigin(0.5);
            if (!this.scene.isActive('IntroScene') == true) {
                this.trialData[this.tridx]["t_outcome_txt_shown"] = performance.now();
            }
    
            outcomeText.setStroke(glowHexColor, 6);
            outcomeText.setShadow(2, 2, glowHexColor, 10, true, true);
    
            // Remove text after 2 seconds
            this.time.delayedCall(2000, () => {
                outcomeText.destroy();
                if (!this.scene.isActive('IntroScene') == true) {
                    this.trialData[this.tridx]["t_outcome_txt_removed"] = performance.now();
                }
                resolve();
            });
        });
    }

    showText(text, x, y, size) {
        return new Promise((resolve) => {
             let txtobj = this.add.text(x, y, text, {
                    fontSize: size,
                    fontFamily: 'Arial',
                    color: "#87D8FC",
                    align: 'center',
                }).setOrigin(0.5);
                resolve(txtobj)
        });
    }

    stopGentleMotion() {
        if (this.sparkTween) {
            this.sparkTween.stop(); // Stop the current tween
            this.sparkTween = null; // Clear the reference
        }
        this.gentlemotion = 0; // Ensure the flag is set to stop motion
    }

    createGentleMotion() {
        const padding = 50; // Ensure the spark stays within bounds
        const randomX = () => Phaser.Math.Between(padding, 800 - padding);
        const randomY = () => Phaser.Math.Between(padding, 600 - padding);

        const moveSpark = () => {
            if (this.gentlemotion === 1) { // Only move the spark if gentlemotion is active
                const sparkTween = this.tweens.add({
                    targets: this.spark,
                    x: randomX(),
                    y: randomY(),
                    duration: Phaser.Math.Between(4000, 6000), // Smooth motion duration
                    ease: 'Sine.easeInOut',
                    onComplete: () => {
                        moveSpark(); // Recursively call for continuous motion
                    }
                });

                // Save the reference to the active tween for cleanup
                this.sparkTween = sparkTween;
            }
        };

        moveSpark(); // Start the initial tween
    }

    blinkStars(duration) {
        // Create a group for blue flares
        this.stars = this.add.group({
            key: 'flares',
            frame: 'blue',
            repeat: 100, // Total 100 flares
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
            repeat: 100, // Total 100 flares
            setXY: { x: 0, y: 0 }, // Start with all flares at (0, 0)
            visible: false // Initially invisible
        });

        this.stars2.children.iterate((flare) => {
            flare.setScale(Phaser.Math.FloatBetween(0.05, 0.15)); // Random size (0.05 or 0.15)
            flare.setAlpha(0); // Start fully transparent
        });

        // Start the flare animation loops
        const blueEvent = this.time.addEvent({
            delay: 100, // Schedule a new blue flare to appear every 100ms
            callback: () => this.showRandomFlare(this.stars),
            callbackScope: this,
            loop: true
        });

        const redEvent = this.time.addEvent({
            delay: 100, // Schedule a new red flare to appear every 100ms
            callback: () => this.showRandomFlare(this.stars2),
            callbackScope: this,
            loop: true
        });

        // Stop the sparkle effect after the specified duration
        this.time.delayedCall(duration, () => {
            blueEvent.remove();
            redEvent.remove();
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

    showInstructionButtons(instr_string, sound, skipbuttons = false, key = 'pointerdown') {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY - text_panel_h / 2;
    
        return new Promise((resolve) => {
            // Display subtitle
            this.temp_txt = this.showSubtitle(instr_string);
    
            const continueButton = this.add.sprite(centerX + 200, 500, 'submit2').setOrigin(0.5).setInteractive();
            continueButton.setDisplaySize(40, 40);
    
            if (sound > 0) {
                const replayButton = this.add.sprite(centerX - 200, 500, 'replay').setOrigin(0.5).setInteractive();
                replayButton.setDisplaySize(40, 40);
    
                const instructionSound = this.sound.add(instr_string, { volume: 1 });
                instructionSound.play();
    
                if (!instructionSound.isPlaying && skipbuttons === true) {
                    replayButton.destroy();
                    continueButton.destroy();
                    if (instructionSound.isPlaying) instructionSound.stop();
                    if (this.temp_txt) this.temp_txt.destroy(); // Cleanup subtitle
                    resolve();
                }
    
                replayButton.on(key, () => {
                    if (instructionSound.isPlaying) instructionSound.stop();
                    instructionSound.play();
                });
    
                continueButton.on(key, () => {
                    if (instructionSound.isPlaying) instructionSound.stop();
                    replayButton.destroy();
                    continueButton.destroy();
                    if (this.temp_txt) this.temp_txt.destroy(); // Cleanup subtitle
                    resolve();
                });
            } else {
                continueButton.on(key, () => {
                    continueButton.destroy();
                    if (this.temp_txt) this.temp_txt.destroy(); // Cleanup subtitle
                    resolve();
                });
            }
        });
    }



    sendTrialData() {
        const outdata = {partial: false, subid: this.subID+"_"+this.cond_name, data: this.trialData} 
        this.postData(JSON.stringify(outdata));
    
    }

    sendRatingsData(data) {
        const outdata = {partial: false, subid: this.subID+"_"+this.cond_name+"_ratings", data: data} 
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