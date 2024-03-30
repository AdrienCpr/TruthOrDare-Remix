import React from "react";
import {AnimatePresence, motion} from "framer-motion"

interface ConfigLevelItemProps {
    title: string
    children?: React.ReactNode;
    selected: boolean
    text: string
}

export default function ConfigLevelItem({children, title, text,selected}: ConfigLevelItemProps) {
    const [hovered, setHovered] = React.useState(false);
    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-96 h-28 border border-border/[0.2] group/canvas-card max-w-sm w-full p-4 relative rounded"
      >
        <AnimatePresence>
          {(hovered || selected) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full w-full absolute inset-0"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="relative z-10 text-4xl text-start">
            {title}
        </div>
        <div className="relative z-10 text-sm text-gray-200 text-start">
          {text}
        </div>
      </div>
    )
}