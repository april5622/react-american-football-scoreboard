//TODO: STEP 1 - Import the useState hook.
import React, {useState, useEffect} from "react";
import "./App.css";
import BottomRow from "./BottomRow";


function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homescore, setHomescore] = useState(32);
  const [awayscore, setAwayscore] = useState(32);

  const [seconds, setSeconds] = useState(3);
  const [isActive, setIsActive] = useState(false);
  
  const homeTouchdown = e => {
    setHomescore(homescore + 7);
  };

  const homeFieldgoal = e => {
    setHomescore(homescore + 3);
  };

  const awayTouchdown = e => {
    setAwayscore(awayscore + 7);
  };

  const awayFieldgoal = e => {
    setAwayscore(awayscore + 3);
  };

  const toggle = e => {
    setIsActive(!isActive);
  }

  const reset = e => {
    setSeconds(0);
    setIsActive(false);
  }


  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

          <div className="home__score">{homescore}</div>
          </div>
          <div className="timer">00:0{seconds}</div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{awayscore}</div>
          </div>
        </div>
        <BottomRow />
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button className="homeButtons__touchdown" onClick={homeTouchdown}>Home Touchdown</button>
          <button className="homeButtons__fieldGoal" onClick={homeFieldgoal}>Home Field Goal</button>
        </div>
        <div className="awayButtons">
          <button className="awayButtons__touchdown" onClick={awayTouchdown}>Away Touchdown</button>
          <button className="awayButtons__fieldGoal" onClick={awayFieldgoal}>Away Field Goal</button>
        </div>
        <div className="timerButtons">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
      </section>
    </div>
  );
}

export default App;

