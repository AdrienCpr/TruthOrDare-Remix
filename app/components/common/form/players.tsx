// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react"

import { Button } from "~/components/common/ui/button"
import { Input } from "~/components/common/ui/input"
import { Toggle } from "~/components/common/ui/toggle"

interface Player {
  id: number;
  value: string;
  isMale: boolean;
}

interface FormPlayersProps {
  players: Player[];
  addPlayer: () => void;
  removePlayer: (index: number) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleToggleChange: (index: number) => void;
}

const FormPlayers: React.FC<FormPlayersProps> = ({
  players,
  addPlayer,
  removePlayer,
  handleChange,
  handleToggleChange
}) => {
  return (
    <div>
      <h1> Truth or Dare</h1>
      <h3>List of Players :</h3>
      {players.map((player, i) => (
        <div key={player.id} className="flex items-center space-x-4 mb-3">
          <Input
            key={player.id}
            placeholder={"Player name"}
            onChange={e => handleChange(e, i)}
            value={player.value}
            type="text"
            /*@ts-ignore*/
            size="40"
          />
          <Toggle
            onClick={() => handleToggleChange(i)}
            className="bg-blue-500 data-[state=on]:bg-pink-500 data-[state=on]:text-accent-foreground"
          >
            {player.isMale ? <span>♂️</span> : <span>♀️</span>}
          </Toggle>
          {players.length !== 1 ? (
            <Button onClick={() => removePlayer(i)}>🚮</Button>
          ) : null}
        </div>
      ))}
      <Button onClick={addPlayer}>+</Button>
    </div>
  );
}

export default FormPlayers;
