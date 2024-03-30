import { Button } from "~/components/common/ui/button"

interface FormPlayersProps {
  handleChoiceGame: (choice: string) => void;
}
export default function FormPlayers({ handleChoiceGame }: FormPlayersProps) {
  return (
    <div className="flex gap-4 items-center">
      <Button onClick={() => handleChoiceGame("dare")}>Action</Button>
      <div className="text-sm">Ou</div>
      <Button onClick={() => handleChoiceGame("truth")}>Vérité</Button>
    </div>
  )
}
