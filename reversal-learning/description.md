## Prompt 
Generate two scripts:
1) Schedule-generation script in Python
2) Probabilistic learning task in Phaser (Javascript game engine)
Use the description below to generate precise content. 

 

## Probabilistic learning task 
In this task, users have to learn the probability of each stimulus to be associated with a negative sound. The task is made of individual trials. On each trial, the participant sees an image (i.e. "stimulus") and below it there is a response slider (controlled by mouse) which ranges between 0% and 100% probability of negative sound. The image is situated at the center of the screen (both horizontally and vertically). The slider is about 10% of screen height below, centered along the x axis. its width is approximately 20% of the screen (10% on each side from a center line). The image takes approximately 15% of the screen width. The images are located in the folder imgs/{im1.jpg im2.jpg im3.jpg }. Below the slider, there is a text showing the current percentage of the slider, which corresponds to its position on the bar. The edges are marked with 0% and 100%. This way particpnat always knows what is the current answer. They can use the mouse to move the slider left and right and once they are happy they click a button below which reads "submit" on the top. At this point, the slider changes color to darkblue (just the slider, not the line on which it lies, that remains black). After this, there is a jittered inter-stimulus interval (2-3s) after which an outcome occurs. When outcome occurs, the slider changes color to pink. On trials which are reinforced this change is accompanied by an aversive sound (sounds/aversive_sound.wav). The slider and the imgage stay on the screen for another 1.5s after which they disappear and only a fixation cross remains in the middle. An inter-stimulus interval then happens (2-3s jittered). After this next trial starts. 
The three stimuli are ordered randomly, although two rules apply: no stimulus occurs more than thrice in a row. 
The reversal stimulus (stim3) reverses its probability ever 15 trials +- jitter given by parameter sigma_switch. When it reverses, it is important that the first 5 trials after reversal include 3-4 of the more likley outcomes. That is, when the change was from low (20%) to high (80%), then out of the first five trials after reversal 3 or 4 will be no-sound outcomes. Then. since the ouutcomes are probabilistic, an oddball event should happen. Oddballs happpen between trials 7 and 13 after reversal. When the stim3 is in low state, this means hat asingle sound not preceeded or succeeded by another sound occurs at least once. In total there, are 9 reversals, one every 15 trials on average, which results in 135 trials in total. Now, stim3 occurs more frequently than stim1 and stim2, this is controlled by stim_percentages parameter. As default stim3 appears on 50% of trials, the other two on 25% of trials. which should make it about 270 trials. 

For each state of the reversal cue, genreate a proposal outcomes, then check that tthere are between 11 and 13 correct outcomes, that is if it's low state, then 11 to 13 otcomes are no-sound. if it's high state then 11 to 13 outcomes are sounds. 

There is a single break after approx 120-140 trials. It should not occur in 5 trials before or after reversal. 

Decision trials - the trials presented above are called "rating trials". In between them, so called decision trials occur. participant is presented with two of the stimuli and they have to choose on eby clicking on it. then they get the outcome currently associated with the stim. over all, there should be no_decisions instances of the following decisions: stim1 vs stim2, stim1 vs stim3-low-state, stim1 vs stim3-high-state, stim2 vs stim3-low-state, stim2 vs stim3-high-state (if no_decisions is 4 then there are 20 decisions). Half of each decision type occur in the first half and half in the second half.     

# parameters
trials_per_reversal = 15
sigma_switch = 2
stim_percentages = [0.25, 0.25, 0.5]
reinforcement_rates = [0.2, 0.8]
no_decisions = 4 

## Schedule generation script
Write a python script to generate 20 schedules - generate randomly, and check for the criteria outlined above. save schedules meeting criteria in schedules/schedule_{id}.csv
each trial contains on row with information abotu which stim was shown (stim-3), what was the outcome (sound / no sound), what is the ISI (in ms), what is the ITI, what state is the stim3 currently in (high / low), what is the number of current reversal of stim3 (1-9). 

Plot each schedule separately for each stim, showing trials on x axis and outcome (red dots) on the y axis (0/1). Run a basic rescorla-wagner model with alpha 0.2 and generate plausible trajecotry, and plot it. Do this for each of the 20 schedules. 

Once the schedules are done, we will proceed with codign up the actual task. 