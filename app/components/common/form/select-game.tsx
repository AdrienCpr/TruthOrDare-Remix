import { Button } from "~/components/common/ui/button"

interface FormPlayersProps {
  handleChoiceGame: (choice: string) => void;
}
export default function FormPlayers({ handleChoiceGame }: FormPlayersProps) {
  return (
    <div className="flex-row">
      <Button onClick={() => handleChoiceGame("truth")}>Trust</Button>
      <Button onClick={() => handleChoiceGame("dare")}>Dare</Button>
    </div>
  )
}
