import { StoreProvider, useStore } from "@/store";

import QuoteBox from "@/components/quote/QuoteBox";
import CreateQuote from "@/components/quote/CreateQuote";

function App() {
  return (
    <StoreProvider>
      <div className="container">
        <CreateQuote />
        <QuoteBox />
      </div>
    </StoreProvider>
  );
}

export default App;
