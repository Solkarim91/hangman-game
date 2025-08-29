import { AnimatePresence, motion } from "framer-motion";
import { USER_FEEDBACK_MESSAGES } from "../constants";
import { UserSelectionFeedbackType } from "../types";
import { FC } from "react";

type UserFeedbackProps = {
  userSelectionFeedback: UserSelectionFeedbackType;
};

export const UserFeedback: FC<UserFeedbackProps> = ({
  userSelectionFeedback,
}) => {
    return (
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
            className="justify-items-center mt-3 sm:mt-0 lg:mt-2"
          >
            <p className="font-main font-bold text-3xl">{userSelectionFeedback}</p>
          </motion.div>
        )}
      </AnimatePresence>
    );
};
