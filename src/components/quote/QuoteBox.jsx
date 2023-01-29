import planeSvg from "@/assets/plane.svg";
import shipSvg from "@/assets/ship.svg";

export default function QuoteBox({ state }) {
  const svgSrc = state.formState.channel === "air" ? planeSvg : shipSvg;

  const intlOptions = { style: "currency", currency: "USD" };

  const formattedPrice = new Intl.NumberFormat("en-CA", intlOptions).format(state.formState.quotePrice);

  return (
    <div className="quote-box">
      <div className="quote-box-aside">
        <div className="quote-box-aside-top">
          <img className="quote-box-icon" src={svgSrc} />
          <p>Traditional {state.formState.channel} freight</p>
        </div>

        <div className="quote-box-aside-body">
          <h4>{state.estimatedDays}</h4>

          <p>Estimated delivery</p>
          <p>{state.estimatedDelivery}</p>
        </div>
      </div>

      <div className="quote-box-info">
        <h4 className="quote-box-from-to">
          {state.formState.from} - {state.formState.to}
        </h4>

        <p className="quote-box-price">{formattedPrice}</p>
      </div>
    </div>
  );
}
