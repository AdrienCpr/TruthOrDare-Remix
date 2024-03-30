// eslint-disable-next-line import/order
import type { MetaFunction } from "@remix-run/node"
// import { Form, Link } from "@remix-run/react"
// import { useTranslation } from "react-i18next"
// import { AuthenticityTokenInput } from "remix-utils/csrf/react"

import { Link } from "@remix-run/react"
import { useState } from "react"
import FormPlayers from "~/components/common/form/players"
import { buttonVariants } from "~/components/common/ui/button"
import { ToggleGroup, ToggleGroupItem } from "~/components/common/ui/toggle-group"
import ConfigLevelItem from "~/components/config-level-item/config-level-item"
import { CanvasRevealEffect } from "~/components/common/ui/canvas-reveal-effect"
import { EvervaultCard } from "~/components/common/ui/evervault-card"
import { cn } from "~/utils/cn"
import { Card, CardContent, CardFooter } from "~/components/common/ui/card"
import { BackgroundGradientAnimation } from "~/components/common/ui/background-gradient-animation"

// import { useOptionalUser } from "~/utils"

export const meta: MetaFunction = () => [{ title: "Glanum stack" }]

export default function Index() {
  // const user = useOptionalUser()

  // const { t } = useTranslation()
  // const navigate = useNavigate()


  //Début logique FormPlayers
  const [players, setPlayers] = useState([{ id: 1, value: "", isMale: true }])
  const [numberQuestion, setNumberQuestion] = useState(-1)
  const [typeQuestion, setTypeQuestion] = useState("")

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

  return (
    <BackgroundGradientAnimation>
    <main className="relative min-h-screen sm:flex sm:items-center sm:justify-center z-10">
      <div className="relative flex min-h-full justify-center gap-6">
        <div>
          <ToggleGroup type="single" onValueChange={setTypeQuestion}  defaultValue={typeQuestion} className="flex flex-col gap-2">
            <ToggleGroupItem value="random" className="p-0 w-full h-auto data-[state=on]:ring ring-ring bg-emerald-700/50 data-[state=on]:bg-emerald-700/50 data-[state=on]:text-foreground">
              <ConfigLevelItem title="Aléatoire 🎲🎲🎲" text="ça peut vite partir en sucette..." selected={typeQuestion === "random"}>
                <CanvasRevealEffect
                  animationSpeed={3}
                  containerClassName="bg-emerald-700"
                  showGradient={false}
                />
              </ConfigLevelItem>
            </ToggleGroupItem>
            <ToggleGroupItem value="PG" className="p-0 w-full h-auto data-[state=on]:ring ring-ring bg-sky-600/50  data-[state=on]:bg-sky-600/50 data-[state=on]:text-foreground">
              <ConfigLevelItem title="Maternelle 👦👧👶" text="Pour les bouts de choux" selected={typeQuestion === "PG"}>
                <CanvasRevealEffect
                  animationSpeed={3}
                  containerClassName="bg-sky-600"
                  colors={[[125, 211, 252]]}
                  showGradient={false}
                />
              </ConfigLevelItem>
            </ToggleGroupItem>
            <ToggleGroupItem value="PG13" className="p-0 w-full h-auto data-[state=on]:ring ring-ring bg-red-900/50 data-[state=on]:bg-red-900/50 data-[state=on]:text-foreground">
              <ConfigLevelItem title="Entre potes 🎉🎉🎉" text="A plusieurs c'est plus fun, non? 😏" selected={typeQuestion === "PG13"}>
                <CanvasRevealEffect
                  animationSpeed={3}
                  containerClassName="bg-red-900"
                  colors={[[255,46,46]]}
                  showGradient={false}
                />
              </ConfigLevelItem>
            </ToggleGroupItem>
            <ToggleGroupItem value="R" className="p-0 w-full h-auto data-[state=on]:ring ring-ring bg-gray-900/50 data-[state=on]:bg-gray-900/50 data-[state=on]:text-foreground">
            <div
              className="w-96 h-28 group/canvas-card mx-auto relative"
            >
              <EvervaultCard text=" WTF ?!" />
            </div>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <Card className="pb-20 relative bg-card/10 border-none">
          <CardContent>
            <FormPlayers
              players={players}
              addPlayer={addPlayer}
              removePlayer={removePlayer}
              handleChange={handleChange}
              handleToggleChange={handleToggleChange}
            />
          </CardContent>
          <CardFooter className="absolute bottom-0 w-full">
            <Link
              to={{
                pathname: "/game",
                search: `?players=${encodeURIComponent(JSON.stringify(players))}&gameParams=${encodeURIComponent(JSON.stringify({ numberQuestion: numberQuestion, typeQuestion: typeQuestion === "random" ? "": typeQuestion }))}`
              }}
              className={cn(buttonVariants(), "bg-gradient h-auto w-full text-2xl text-white")}
            >
              Jouer 🚀
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
    </BackgroundGradientAnimation>
  )
}
