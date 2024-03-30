import { Button } from "~/components/common/ui/button"

interface QuestionProps {
  question: {
    question: string;
    translations:{
      fr:string
    }
  } | null;
}
export default function InterfaceQuestion({ question }: QuestionProps) {
  return (
    <div>
      <div className="text-lg w-full text-center">{question?.translations.fr}</div>
      <div className="text-sm w-full text-center">{question?.question}</div>
    </div>
  )
}
