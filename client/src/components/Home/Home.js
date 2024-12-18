import Landing from "../Landing/Landing";
import CovGen from "../CovGen/CovGen";
import About from "../About/About";

function Home({loggedIn}) {
  return (
    <div className="App">
      <Landing></Landing>
      <CovGen loggedIn={loggedIn}></CovGen>
      <About></About>
    </div>
  );
}

export default Home;
