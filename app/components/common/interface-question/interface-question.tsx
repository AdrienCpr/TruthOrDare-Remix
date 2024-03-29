import { Button } from "~/components/common/ui/button"

interface QuestionProps {
  question: {
    question: string;
    translations:{
      fr:string
    }
  } | null;
  handleNextTurn: () => void;
}
export default function InterfaceQuestion({ question, handleNextTurn }: QuestionProps) {
  return (
    <div className="flex-row">
      <h1>{question?.translations.fr}</h1>
      <Button onClick={handleNextTurn}>Next turn</Button>
    </div>
  )
}
