window.onload = function(){
  var watch = document.getElementById("watch-dial");
  var lapContainer = document.getElementById('laps');
  var lapCount = 0;

  //callback which gets invoked during timeDidChange() observer of stopwatch
  window.updateWatch = function(militaryTime){
    watch.innerHTML = militaryTime;
  }

  //callback that gets invoked during lapDidChange() observer of stopwatch
  window.updateLap = function(lapSplitString, isReset){
    if(isReset){
      lapContainer.innerHTML = "";
      lapCount = 0;
    }else{
      var li = document.createElement('li');
      lapCount += 1;
      li.innerHTML = "#"+lapCount+" "+lapSplitString;
      li.className = "tile";
      lapContainer.appendChild(li);
    }
  }

  //replace's an element's given class with a specified class
  var replaceClass = function(ele, class1, class2){
    if(ele.className.indexOf(class1) > 1){
      ele.className = ele.className.replace(class1, class2);
    }
  }
  
  var stopwatch = new StopWatch({callback: 'updateWatch', lapCallback: 'updateLap'});
  var startStopButton = document.getElementById("start-stop");
  var resetLapButton = document.getElementById("reset-lap");
  
  var startStopButtonEvent = function(){
    if(!stopwatch.running()){
      replaceClass(startStopButton, 'start-button', 'stop-button');
      replaceClass(resetLapButton, 'reset-button', 'lap-button');
      startStopButton.innerHTML = 'Stop';
      resetLapButton.innerHTML = 'Lap';
      stopwatch.start();
    }else{
      replaceClass(startStopButton, 'stop-button', 'start-button');
      replaceClass(resetLapButton, 'lap-button', 'reset-button');
      startStopButton.innerHTML = 'Start';
      resetLapButton.innerHTML = 'Reset';
      stopwatch.stop();
    }
  }
  
  var resetLapButtonEvent = function(){
    if(!stopwatch.running()){
      stopwatch.reset();
    }else{
      stopwatch.addLap();
    }
  }

  //Adding event listeners to the buttons
  if(!document.addEventListener){
    startStopButton.attachEvent("onclick", startStopButtonEvent); //For IE8
    resetLapButton.attachEvent("onclick", resetLapButtonEvent); //For IE8
  }else{
    startStopButton.addEventListener("click", startStopButtonEvent);
    resetLapButton.addEventListener('click', resetLapButtonEvent);
  }
}