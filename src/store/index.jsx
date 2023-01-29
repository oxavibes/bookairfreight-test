import { useImmerReducer } from "use-immer";
import { createContext, useContext } from "react";

import { randomNumber, getEstimatedDelivery } from "@/helpers";

const StoreContext = createContext();

export function useStore() {
  return useContext(StoreContext);
}

const initialState = {
  hasQuote: false,
  formState: {
    from: "",
    to: "",
    quotePrice: 0,
    channel: "ocean",
  },
  estimatedDays: "",
  estimatedDelivery: "",
};

function storeReducer(draft, action) {
  switch (action.type) {
    case "setField": {
      draft[action.field] = action.value;
      break;
    }
    case "setFormState": {
      return {
        ...draft,
        ["formState"]: {
          ...action.value,
        },
      };
    }
    case "calculateShipping": {
      let startRange;
      let endRange;

      if (draft.formState.channel === "air") {
        startRange = randomNumber(3, 7);
        endRange = startRange + randomNumber(2, 4);
      } else {
        startRange = randomNumber(25, 30);
        endRange = startRange + randomNumber(5, 10);
      }

      draft.estimatedDays = `${startRange} - ${endRange} days`;
      draft.estimatedDelivery = getEstimatedDelivery(startRange, endRange);

      break;
    }

    default:
      break;
  }
}

function useStoreSource() {
  const [state, dispatch] = useImmerReducer(storeReducer, initialState);

  return { state, dispatch };
}

export function StoreProvider({ children }) {
  return <StoreContext.Provider value={useStoreSource()}>{children}</StoreContext.Provider>;
}
