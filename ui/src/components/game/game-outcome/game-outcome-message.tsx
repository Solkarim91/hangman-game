import { motion } from "framer-motion";
import { OutcomeMessageType } from "../types";
import { FC } from "react";

type GameOutcomeMessageProps = {
  outcomeMessage: OutcomeMessageType;
};

export const GameOutcomeMessage: FC<GameOutcomeMessageProps> = ({
  outcomeMessage,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-3xl font-bold text-center font-main"
    >
      {outcomeMessage}
    </motion.div>
  );
};
