import { printCard } from "../utils/gameUtils.js";

export const MiddleCard = ({gameState}) => {
    return (
        <div>
            <h2>Middle Card: {printCard(gameState.middleCard)}</h2>
        </div>
    )
}