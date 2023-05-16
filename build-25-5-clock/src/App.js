import { useState, useEffect } from "react";

function App() {
  
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [play, setPlay] = useState(false);
  const [timingType, setTimingType] = useState("SESSION");
  const [timeLeft, setTimeLeft] = useState(1500);
  
  const timeout = setTimeout(() => {
    if(timeLeft && play){
      setTimeLeft(timeLeft - 1)
    }
  }, 1000);
  
  const handleBreakIncrease = () => {
    if(breakLength < 60){
      setBreakLength(breakLength + 1)
    }
  }
  const handleBreakDecrease = () => {
    if(breakLength > 1){
      setBreakLength(breakLength - 1)
    }
  }
  const handleSessionIncrease = () => {
    if(sessionLength < 60){
      setSessionLength(sessionLength + 1)
      setTimeLeft(timeLeft + 60)
    }
  }
  const handleSessionDecrease = () => {
    if(sessionLength > 1){
      setSessionLength(sessionLength - 1)
      setTimeLeft(timeLeft - 60)
    }
  }
  
  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes} : ${formattedSeconds}`;
  }
  
  const handlePlay = () => {
    clearTimeout(timeout)
    setPlay(!play)
  }
  
  const resetTimer = () => {
    const audio = document.getElementById("beep");
    
    if(!timeLeft && timingType === "SESSION"){
      setTimeLeft(breakLength * 60)
      setTimingType("BREAK")
      audio.play()
    }
   
    if(!timeLeft && timingType === "BREAK"){
      setTimeLeft(sessionLength * 60)
      setTimingType("SESSION")
      audio.pause()
      audio.currentsTime = 0;
    }
  }
  
  const clock = () => {
    if(play){
      // eslint-disable-next-line no-unused-expressions
      timeout
      resetTimer()
    }else{
      clearTimeout(timeout)
    }
  }
  
  const handleReset = () => {
    const audio = document.getElementById("beep");
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("SESSION");
    audio.pause()
    audio.currentsTime = 0;
  }
  
  useEffect(() => {
   clock()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, timeLeft, timeout]);
  
  const title = timingType === "SESSION" ? "Session" : "Break";
  
  return(
    <div>
      <div className="wrapper">
        <div className="header">
          <h1 className="main-title">25 + 5 <span className="clock">Clock</span></h1>
          </div>
          <div className="break-session-length d-flex m-4 justify-content-around">
         <div>
            <h2 id="break-label">Break Length</h2>
            
            <div>
            <button className="btn-level" id="break-increment" disabled={play} onClick={handleBreakIncrease} >
              <i className="fa fa-arrow-up fa-2x"></i>
              </button>
              <div className="btn-level" id="break-length"><strong>{breakLength}</strong></div>
              
            <button className="btn-level" id="break-decrement" disabled={play} onClick={handleBreakDecrease} >
              <i className="fa fa-arrow-down fa-2x"></i></button>
        </div>
             </div> 
         <div>
            <h2 id="session-label">Session Length</h2>
            <div>
              <button className="btn-level" id="session-increment" disabled={play} onClick={handleSessionIncrease} value="+">
              <i className="fa fa-arrow-up fa-2x"></i>
              </button>
              <strong className="btn-level" id="session-length">{sessionLength}</strong>
            
            <button className="btn-level" id="session-decrement" disabled={play} onClick={handleSessionDecrease} value="-">
              <i className="fa fa-arrow-down fa-2x"></i>
                
              </button>
            </div>
            </div>
        </div>
            
          <div className="timer-wrapper">
            <div className="timer">
              <h2 id="timer-label" className="m-2 p-1">{title}</h2>
              <div id="time-left">{timeFormatter()}</div>
              </div>
            
            <button onClick={handlePlay} id="start_stop">
              <i className="fa fa-play fa-2x"></i>
              <i className="fa fa-pause fa-2x"></i>
              </button>
            
            <button onClick={handleReset} id="reset">
              <i className="fa fa-refresh fa-2x"></i></button>
              
            <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"/>
    </div>
          <div className="footer">
    <div className="author"> Designed & Coded by <br/>
              <h5>Ayman Aly</h5>
            </div>
        </div>
      </div>
     </div>
  );
}
export default App;