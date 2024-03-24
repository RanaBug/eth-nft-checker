import { useState } from "react";

const useStagedTransaction = <Stage,>(initialStage: Stage) => {
  const [stage, setStage] = useState(initialStage);

  const run = async <R,>(
    stageStates: [loading: Stage, error: Stage, success: Stage],
    action: () => Promise<R>
  ) => {
    const [loadingStage, errorStage, successStage] = stageStates;

    setStage(loadingStage);

    try {
      const tx = await action();
      setStage(successStage);
      return tx;
    } catch (err) {
      setStage(errorStage);
      throw err;
    }
  };

  return { stage, setStage, run };
};

export default useStagedTransaction;
