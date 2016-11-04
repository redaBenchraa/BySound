
$(function(){
  initBG();
  var moods = ["rain", "storm", "wind", "night","flame","wave","forest","coffee"];
  var audios = [];
  var sliders = [];
  const fs = require('fs');
  const remote = require('electron').remote;
  for(i=0;i<moods.length;i++){
    fs.access("img/"+moods[i]+".png", (err) => {
      if(err) {
        alert(err);
        var window = remote.getCurrentWindow();
        window.close();
      }
    });
    $("ul").append("<li style='display:none' class='sound-item' id='"+moods[i]+"'><img src='img/"+ moods[i] +".png'><div id='slider"+i+"'/></section></li>").find('#'+moods[i]).fadeIn(3000);
    fs.access('sounds/' + moods[i] + '.wav', (err) => {
      if(err) ;//console.log(err);
    });
    var audio = new Audio('sounds/'+moods[i]+'.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audios.push(audio);
    createSlider('slider'+i,audio);
  }

    $(".sound-item img").click(function(){
      var audioId = $(this).next().attr('id').substring(6, 7);
      if(audios[audioId].paused){
        $(this).css("opacity","1");
        audios[audioId].play();
        $(this).next().fadeIn();
      }
      else{
        audios[audioId].pause();
        $(this).css("opacity","0.5");
        $(this).next().fadeOut();
      }
    })
});
function initBG(){
var granimInstance = new Granim({
    element: '#canvas-image',
    direction: 'top-bottom',
    opacity: [0.5, 0.2, 0],
    isPausedWhenNotInView: true,
    states : {
        "default-state": {
            gradients: [
                ['#485563', '#29323c', '#29323c'],
                ['#ff3131', '#b4002a', '#ef1630']
            ],
            transitionSpeed: 5000
        }
    }
});
  granimInstance.play();
}
function createSlider(id,Audio){

  var slider  = $('#'+id);
  slider.css("display",'none');
  var value;
  slider.slider({
    range: "min",
    min: 0,
    value: 50,
    start: function(event,ui) {},
    slide: function(event, ui) {
    value  = slider.slider('value');
    Audio.volume = value/100;
    },
    stop: function(event,ui) {
      Audio.volume = value/100;
      console.log(value);
    },
  });
}
