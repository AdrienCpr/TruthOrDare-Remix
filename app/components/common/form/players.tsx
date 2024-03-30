// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Trash } from "lucide-react";
import React from "react"

import { Button } from "~/components/common/ui/button"
import { Input } from "~/components/common/ui/input"
import { Toggle } from "~/components/common/ui/toggle"
import { ScrollArea } from "../ui/scroll-area";

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
    <>
      <h3 className="my-4 text-xl">Joueurs</h3>
      <div>
        {players.map((player, i) => (
          <div key={player.id} className="flex items-center space-x-4 mb-3">
            <Input
              key={player.id}
              placeholder="Nom du joueur"
              onChange={e => handleChange(e, i)}
              value={player.value}
              type="text"
              /*@ts-ignore*/
            />
            <Toggle
              onClick={() => handleToggleChange(i)}
              className="bg-blue-500 data-[state=on]:bg-pink-500 data-[state=on]:text-accent-foreground"
            >
              {player.isMale ? <span>♂️</span> : <span>♀️</span>}
            </Toggle>
            {players.length !== 1 ? (
              <Button variant="destructive" size="sm" onClick={() => removePlayer(i)}>
                <Trash className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        ))}
      </div>
      <Button variant="ghost" onClick={addPlayer}>+ Ajouter un joueur</Button>
    </>
  );
}

export default FormPlayers;
