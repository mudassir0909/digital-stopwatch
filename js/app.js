window.onload = function(){
  var watch = document.getElementById("watch-dial");
  var lapContainer = document.getElementById('laps');
  var lapCount = 0;

  window.updateWatch = function(militaryTime){
    watch.innerHTML = militaryTime;
  }
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
  
  var stopwatch = new StopWatch({callback: 'updateWatch', lapCallback: 'updateLap'});
  var startStopButton = document.getElementById("start-stop");
  var resetLapButton = document.getElementById("reset-lap");
  startStopButton.addEventListener("click", function(){
    var data = this.dataset;
    if(data.action === 'start'){
      data.action = 'stop';
      this.className = this.className.replace("start-button", "stop-button");
      this.innerHTML = 'Stop';
      resetLapButton.innerHTML = 'Lap';
      resetLapButton.dataset.action = 'lap';
      resetLapButton.className = resetLapButton.className.replace("reset-button", "lap-button");
      stopwatch.start();
    }else{
      data.action = 'start';
      this.className = this.className.replace("stop-button", "start-button");
      this.innerHTML = 'Start';
      resetLapButton.innerHTML = 'Reset';
      resetLapButton.dataset.action = 'reset';
      resetLapButton.className = resetLapButton.className.replace("lap-button", "reset-button");
      stopwatch.stop();
    }
  });
  resetLapButton.addEventListener('click', function(){
    var classNames = [].slice.call(this.classList);
    var idx;
    if(this.dataset.action === 'reset'){
      stopwatch.reset();
    }else{
      stopwatch.addLap();
    }
  });
}