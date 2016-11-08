var globalVol = 70;
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
const fs = require('fs');
const {shell} = require('electron');
const remote = require('electron').remote;
var audios = [];
var sliders = [];
$(function(){
  getFiles();
  initBG();
  for(i=0;i<moods.length;i++){
    fs.access(__dirname+"/img/"+moods[i]+".png", (err) => {
      if(err) {
        alert(err);
        var window = remote.getCurrentWindow();
        window.close();
      }
    });
    $("ul").append("<li style='display:none' class='sound-item' id='"+moods[i]+"'><img src='"+__dirname+"/img/"+ moods[i] +".png'><div id='slider"+i+"' > </div></li>").find('#'+moods[i]).fadeIn(3000);
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
  createSlider('slider',null);

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
      shell.openExternal('https://www.github.com/Redb3n');
    });
    $("#option").click(function(event){
      $("#option").fadeOut();
      $(".bar").show("slide", { direction: "left" }, 500);
    });
    $("#closeBar").click(function(){
      getFiles();
      $("#option").fadeIn();
      $(".bar").hide("slide", { direction: "left" }, 300);
    });
    $("#shuffle").click(function(){
      random();
    });
    $("#slider").slider('value', globalVol);
    $('.listProfiles').on('click', '.profile span',function(e) {
      readXML($(this).text());
    });
    $('.listProfiles').on('click', '.profile img',function(e) {
      if (confirm('Are you sure you want to delete this profile ?')) {
        var filePath = "profiles/"+$(this).parent().text()+".xml";
        console.log(filePath);
        fs.unlinkSync(filePath);
        getFiles();
      } else {
        // Do nothing!
      }

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
  if(Audio != null) slider.css("display",'none');
  var value;
  slider.slider({
    range: "min",
    min: 0,
    value: 50,
    start: function(event,ui) {},
    slide: function(event, ui) {
    value  = slider.slider('value');
      if(Audio != null){
        Audio.volume = (value/100) * (globalVol/100);
      }  else {
        for(i=0;i<moods.length;i++){
            vlm = $("#slider"+i).slider('value')*globalVol/100;
            vlm/=100;
            if(vlm >= 0 && vlm <= 1){
              audios[i].volume = vlm;
            }
        }
        globalVol = value;
      }

    },
    stop: function(event,ui) {
        if(Audio!=null){
          Audio.volume = (value/100) * (globalVol/100) ;
        }
    },
  });
}

function random(){
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
function getFiles(){
  var testFolder = 'profiles/';
  $(".listProfiles").empty();
  fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
      $(".listProfiles").append("<div id='" + file + "' class='profile'>"+
                "<span>" + file.split(".")[0] + "</span>"+
                "<img src='img/control/close.png'/>"+
            "</div>");
      console.log("->"+file);
  });
})
}
function readXML(file){
  xml2js = require('xml2js');
  var parser = new xml2js.Parser();
  fs.readFile( "profiles/"+file+".xml", function(err, data) {
      parser.parseString(data, function (err, result) {
        if(result.profile.globalVol != undefined){
            globalVol = result.profile.globalVol;
            $("#slider").slider('value', globalVol);
        }
        for(i=0;i<moods.length;i++){
          if(result.profile.mood[i] != undefined){
              if(result.profile.mood[i] != 0){
                  $("#"+moods[i] +" img").css("opacity","1");
                  audios[i].volume = (result.profile.mood[i]/100) * (globalVol/100);
                  audios[i].play();
                  $("#slider"+i).slider('value', result.profile.mood[i]);
                  $("#slider"+i).fadeIn();
              }else{
                audios[i].pause();
                $("#"+moods[i]+" img").css("opacity","0.5");
                $("#slider"+i).fadeOut();
              }
            }
        }
      });
  });
}
