import { useImmerReducer } from "use-immer";

import QuoteBox from "@/components/quote/QuoteBox";
import CreateQuote from "@/components/quote/CreateQuote";

import { randomNumber, getEstimatedDelivery } from "@/helpers";

const initialState = {
  hasQuote: false,
  formState: null,
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

      if (draft.channel === "air") {
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

function App() {
  const [state, dispatch] = useImmerReducer(storeReducer, initialState);

  return (
    <div className="container">
      <CreateQuote dispatch={dispatch} />
      {state.hasQuote && <QuoteBox state={state} />}
    </div>
  );
}

export default App;
