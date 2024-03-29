// eslint-disable-next-line import/order
import type { MetaFunction } from "@remix-run/node"
// import { Form, Link } from "@remix-run/react"
// import { useTranslation } from "react-i18next"
// import { AuthenticityTokenInput } from "remix-utils/csrf/react"

import { Link } from "@remix-run/react"
import { useState } from "react"

import DarkModePicker from "~/components/common/dark-mode-picker/dark-mode-picker"
import FormPlayers from "~/components/common/form/players"
import {  buttonVariants } from "~/components/common/ui/button"
import { Toggle } from "~/components/common/ui/toggle"


// import { useOptionalUser } from "~/utils"

export const meta: MetaFunction = () => [{ title: "Glanum stack" }]

export default function Index() {
  // const user = useOptionalUser()

  // const { t } = useTranslation()
  // const navigate = useNavigate()


  //Début logique FormPlayers
  const [players, setPlayers] = useState([{id: 1,value: "",isMale: true}])
  const [numberQuestion, setNumberQuestion] = useState(-1)

  const addPlayer = () => {
    const newItem = {
      id: players.length ? players[players.length - 1].id + 1 : 1,
      value: "",
      isMale: true
    }
    setPlayers(prevArr => [...prevArr, newItem])
  }

  const removePlayer = (indexToRemove: number) => {
    setPlayers(prevArr =>
      prevArr.filter((item, index) => index !== indexToRemove)
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target
    setPlayers(prevArr => {
      const newArr = [...prevArr]
      newArr[index].value = value
      return newArr
    })
  }

  const handleToggleChange = (index: number) => {
    setPlayers(prevArr => {
      const newArr = [...prevArr]
      newArr[index] = { ...newArr[index], isMale: !newArr[index].isMale }
      return newArr
    })
  }
  //Fin logique FormPlayers
  const handleToggleQuestionChange = () => {
    numberQuestion === -1 ?
      setNumberQuestion(0)
      :
      setNumberQuestion(-1)
  }

  return (
    <main className="relative min-h-screen sm:flex sm:items-center sm:justify-center">
      <div className="absolute top-[15px] right-[15px]">
        <DarkModePicker />
      </div>
      <div className="relative flex min-h-full flex-col justify-center">
        {/*<h1>Number of questions</h1>*/}
        {/*<Toggle*/}
        {/*  onClick={() => handleToggleQuestionChange()}*/}
        {/*  className="bg-blue-500 data-[state=on]:bg-pink-500 data-[state=on]:text-accent-foreground"*/}
        {/*>*/}
        {/*  {numberQuestion === -1 ? <span>♾</span> : <span></span>}*/}
        {/*</Toggle>*/}
        <FormPlayers
          players={players}
          addPlayer={addPlayer}
          removePlayer={removePlayer}
          handleChange={handleChange}
          handleToggleChange={handleToggleChange}
        />
        <div className="mt-5 self-center">
          <Link
            to={{
              pathname: "/game",
              search: `?players=${encodeURIComponent(JSON.stringify(players))}&gameParams=${encodeURIComponent(JSON.stringify({ numberOfQuestion: numberQuestion }))}`
            }}
            className={buttonVariants()}
          >
            Commencer la partie
          </Link>
        </div>
      </div>
    </main>
  )
}
