// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LoaderFunctionArgs, redirect } from "@remix-run/node"
// eslint-disable-next-line import/order
import { Link } from "@remix-run/react"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from "react"
import { typedjson, useTypedLoaderData } from "remix-typedjson"

import DarkModePickerPopover
  from "~/components/common/dark-mode-picker/dark-mode-picker-popover/dark-mode-picker-popover"
import SelectGame from "~/components/common/form/select-game"
import InterfaceQuestion from "~/components/common/interface-question/interface-question"
import { buttonVariants } from "~/components/common/ui/button"

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

  function randomTurn() {
    const randomIndex = Math.floor(Math.random() * players.length)
    return players[randomIndex]
  }

  const [turnPlayer, setTurn] = useState(randomTurn())
  const [showSelectGame, setShowSelectGame] = useState(true)
  const [question, setQuestion] = useState(null)

  async function handleChoiceGame(choiceGame: string) {
    const question = await fetchQuestion(choiceGame)
    setQuestion(question)
    setShowSelectGame(false)
  }

  async function fetchQuestion(choiceGame: string) {
    console.log(gameParams)
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
    <main className="relative min-h-screen sm:flex sm:items-center sm:justify-center">
      <div className="absolute top-[15px] right-[15px]">
        <DarkModePickerPopover />
        <Link to="/" className={buttonVariants()}>
          Go Back
        </Link>
      </div>
      <div className="relative flex min-h-full flex-col justify-center">
        <div>
          <p>{turnPlayer.value} </p>
          {showSelectGame ?
            <SelectGame handleChoiceGame={handleChoiceGame} />
            :
            <InterfaceQuestion question={question}
                               handleNextTurn={handleNextTurn}
            />
          }
        </div>
      </div>
    </main>

  )
}
