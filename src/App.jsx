import { useState } from "react"
import { Header } from "./components/Header"
import { InfoButton } from "./components/InfoButton"
import { InfoPane } from "./components/InfoPane";
import { Dealer } from "./components/Dealer";
import { GameButton } from "./components/GameButton";
import { Player } from "./components/Player";

function App() {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div id="content">
      <Header />
      <InfoButton setShowInfo={setShowInfo}/>
      {showInfo ? <InfoPane /> : null}
      <Dealer />
      <GameButton purpose={"Hit"}/>
      <GameButton purpose={"Stand"}/>
      <Player />
    </div>
  )
}

export default App
