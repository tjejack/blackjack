import { useState } from "react"
import { Header } from "./components/Header"
import { InfoButton } from "./components/InfoButton"
import { InfoPane } from "./components/InfoPane";
import { Dealer } from "./components/Dealer";
import { GameButton } from "./components/GameButton";
import { Player } from "./components/Player";
import { CardsHolder } from "./components/CardsHolder";

function App() {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div id="content">
      <Header />
      <InfoButton setShowInfo={setShowInfo}/>
      {showInfo ? <InfoPane /> : null}
      <Dealer />
      <CardsHolder />
      <GameButton purpose={"Hit"}/>
      <GameButton purpose={"Stand"}/>
      <Player />
      <CardsHolder />
    </div>
  )
}

export default App
