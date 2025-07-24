import { AnimatePresence, motion } from "framer-motion";
import { USER_FEEDBACK_MESSAGES } from "../constants";
import { UserSelectionFeedbackType } from "../types";
import { FC } from "react";

type UserFeedbackProps = {
  isGameStarted: boolean;
  userSelectionFeedback: UserSelectionFeedbackType;
};

export const UserFeedback: FC<UserFeedbackProps> = ({
  isGameStarted,
  userSelectionFeedback,
}) => {
  return !isGameStarted ? (
    <div>
      <p className="font-main text-2xl">
        {"Choose a letter below to get started!"}
      </p>
    </div>
  ) : (
    <AnimatePresence mode="wait">
      {userSelectionFeedback && (
        <motion.div
          key={userSelectionFeedback}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            x:
              userSelectionFeedback === USER_FEEDBACK_MESSAGES.lastChance
                ? [0, -4, 4, -3, 3, -2, 2, 0]
                : 0,
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-4xl font-bold font-main justify-items-center mt-10"
        >
          <p className="font-main text-4xl">{userSelectionFeedback}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
