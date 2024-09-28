import { useGameState } from "../context/gameStateContext.jsx";
import { printCard } from "../utils/gameUtils.js";

const MiddleCard = () => {
    const { gameState } = useGameState();
    return (
        <div>
            <h2>Middle Card: {printCard(gameState.middleCard)}</h2>
        </div>
    )
}

export default MiddleCard;