$(function(){
  initBG();
  var moods = ["rain", "storm", "wind", "night","flame","wave","forest","coffee"];
  var rands = [
    [20,40,50,50,0,0,0,0],
    [50,0,0,0,0,0,0,50],
    [0,0,0,50,50,0,0,0],
    [0,0,30,40,50,0,0,0],
    [50,0,0,0,0,0,0,50],
    [0,0,0,0,0,50,0,0],
    [0,40,0,0,0,50,0,0],
    [0,0,0,0,0,50,50,0],
    [0,0,0,0,60,0,50,0],
    [0,0,50,60,0,0,0,0]
  ];
  var audios = [];
  var sliders = [];
  const fs = require('fs');
  const {shell} = require('electron');
  const remote = require('electron').remote;
  for(i=0;i<moods.length;i++){
    fs.access(__dirname+"/img/"+moods[i]+".png", (err) => {
      if(err) {
        alert(err);
        var window = remote.getCurrentWindow();
        window.close();
      }
    });
    $("ul").append("<li style='display:none' class='sound-item' id='"+moods[i]+"'><img src='"+__dirname+"/img/"+ moods[i] +".png'><div id='slider"+i+"'/></section></li>").find('#'+moods[i]).fadeIn(3000);
    fs.access(__dirname+'/sounds/' + moods[i] + '.mp3', (err) => {
      if(err){
        alert(err);
        var window = remote.getCurrentWindow();
        window.close();
      }
    });
    var audio = new Audio(__dirname+'/sounds/'+moods[i]+'.mp3');
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
    });
    $(".logo img").click(function(){
      if(!audios[0].muted){
        $(this).css("opacity","0.7");
        for(i=0;i<moods.length;i++){
          audios[i].muted = true;
        }
      }else{
        $(this).css("opacity","1");
        for(i=0;i<moods.length;i++){
          audios[i].muted = false;
        }
      }

    });
    $("#close").click(function(){
      window.close();
    });
    $("#min").click(function(){
        remote.BrowserWindow.getFocusedWindow().minimize();
    });
    $("#hide").click(function(){
        remote.BrowserWindow.getFocusedWindow().hide();
    });
    $("#full").click(function(){
      if(remote.BrowserWindow.getFocusedWindow().isFullScreen()){
        $('.logo').css("margin-top","55px");
        remote.BrowserWindow.getFocusedWindow().setFullScreen(false);
        remote.BrowserWindow.getFocusedWindow().restore();
      }else{
        $('.logo').css("margin-top","200px");
        remote.BrowserWindow.getFocusedWindow().setFullScreen(true);
      }
    });

    $("#facebook").click(function(){
      shell.openExternal('https://www.facebook.com/MedRedaBenchraa');
    });
    $("#github").click(function(){
      //shell.openExternal('https://www.github.com/Redb3n');
      random(rands,moods,audios);
    });

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

function random(rands,moods,audios){
  var o = Math.floor(Math.random()*(10-1+1)+1);
  for(i=0;i<rands[o].length;i++){
    if(rands[o][i] != 0){
        $("#"+moods[i] +" img").css("opacity","1");
        audios[i].volume = rands[o][i]/100;
        audios[i].play();
        $("#slider"+i).slider('value', rands[o][i]);
        $("#slider"+i).fadeIn();
    }else{
      audios[i].pause();
      $("#"+moods[i]+" img").css("opacity","0.5");
      $("#slider"+i).fadeOut();
    }
  }
}
