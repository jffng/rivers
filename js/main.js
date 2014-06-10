$(document).ready(function() {
	initAudio();
});

var tone = new Tone();
var music = new Music(ref);
var kankakee = {};
var index = 0;

var oscillators = [];
var oscType = "sine";
var oscVol = tone.context.createGain();

function initAudio () {
	oscVol.gain.value = 0.5;
	oscVol.connect(tone);	

	for(var i = 0; i < 3; i++){
		oscillators[i] = new Tone.Oscillator(ref, oscType);
		oscillators[i].connect(oscVol);
		oscillators[i].start();
	}

	tone.input.connect(tone.output);
	tone.toMaster();
}


// Tone.Transport.setTimeout(function(time){
// 	player.start(time);
// 	output.textContent = "of";
// }, "2n");

// Tone.Transport.setTimeout(function(time){
// 	player.start(time);
// 	output.textContent = "events";
// }, "0:3:2");

$.ajax({
	url: 'kankakee.json',
	type: 'GET',
	dataType: 'json',
	data: {param1: 'value1'},
})
.done(function(data) {
	console.log("success");
	kankakee = data;
	Tone.Transport.loop = true;
	Tone.Transport.setLoopStart("0:0");
	Tone.Transport.setLoopEnd("1:0");
	Tone.Transport.setBpm(120);

	Tone.Transport.setInterval(function(time){
		if(index < kankakee.length){
			index++;
		}
		else {
			index = 0;
		}
		oscillators[0].setFrequency(music.snapToNote(kankakee[index].DAVIS));
		$('#davis').html('Davis: ' + kankakee[index].DAVIS);
		oscillators[1].setFrequency(music.snapToNote(kankakee[index].DUNNSBRIDGE));
		$('#dunnsbridge').html('Dunns Bridge: ' + kankakee[index].DUNNSBRIDGE);		
		oscillators[2].setFrequency(music.snapToNote(kankakee[index].SHELBY));
		$('#shelby').html('Shelby: ' + kankakee[index].SHELBY);		
	}, "8n");

	Tone.Transport.start();	
})
.fail(function() {
	console.log("error");
})
.always(function() {
	console.log("complete");
});
