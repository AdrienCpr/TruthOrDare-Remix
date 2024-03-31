// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LoaderFunctionArgs, redirect } from "@remix-run/node"
// eslint-disable-next-line import/order
import { Link } from "@remix-run/react"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from "react"
import { typedjson, useTypedLoaderData } from "remix-typedjson"

import SelectGame from "~/components/common/form/select-game"
import InterfaceQuestion from "~/components/common/interface-question/interface-question"
import { BackgroundGradientAnimation } from "~/components/common/ui/background-gradient-animation"
import { Button, buttonVariants } from "~/components/common/ui/button"
import { Card, CardFooter } from "~/components/common/ui/card"
import { cn } from "~/utils/cn"

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const players = url.searchParams.get("players")
  const gameParams = url.searchParams.get("gameParams")

  if (!players || !gameParams) {
    throw redirect("/")
  }

  const playersObject = JSON.parse(players)
  const gameParamsObject = JSON.parse(gameParams)

  return typedjson({ players: playersObject, gameParams: gameParamsObject })
}

export default function GamePage() {
  const { players } = useTypedLoaderData<typeof loader>()
  const { gameParams } = useTypedLoaderData<typeof loader>()

  // const navigate = useNavigate()
  // const location = useLocation()
  // const players = location?.state?.players

  const [turnPlayer, setTurn] = useState(randomTurn())
  const [showSelectGame, setShowSelectGame] = useState(true)
  const [question, setQuestion] = useState(null)
  const [turnPlayer, setTurnPlayer] = useState(0)

  function randomTurn() {
    let index = turnPlayer
    index === players.lenght() ? setTurnPlayer(0) : setTurnPlayer(index++)
    return players[index]
  }
  
  async function handleChoiceGame(choiceGame: string) {
    const question = await fetchQuestion(choiceGame)
    setQuestion(question)
    setShowSelectGame(false)
  }

  async function fetchQuestion(choiceGame: string) {
    try {
      const response = await fetch("https://api.truthordarebot.xyz/v1/" + choiceGame + "?rating=" + gameParams.typeQuestion)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error("Could not fetch the question:", error)
    }
  }

  function handleNextTurn() {
    setTurn(randomTurn())
    setShowSelectGame(true)
    setQuestion(null)
  }


  return (
    <BackgroundGradientAnimation>
    <main className="relative min-h-screen sm:flex sm:items-center sm:justify-center z-10">
        <div className="absolute top-[15px] left-[15px]">
          <Link to="/" className={buttonVariants()}>
            Go Back
          </Link>
        </div>
        <Card className={cn("p-4 relative bg-card/10 border-none space-y-6", !showSelectGame && "pb-28")}>
          <div className="text-2xl font-semiboldw-full text-center">{turnPlayer.value}</div>
          {showSelectGame ?
            <SelectGame handleChoiceGame={handleChoiceGame} />
            :
            <InterfaceQuestion question={question}/>
          }
          {!showSelectGame ? (
            <>
              <CardFooter className="absolute left-0 bottom-0 right-0">
                <Button onClick={handleNextTurn} className="bg-gradient h-auto w-full text-2xl text-white">
                  Tour suivant
                </Button>
              </CardFooter>
            </>
          ) : null}
        </Card>
    </main>
    </BackgroundGradientAnimation>
  )
}
