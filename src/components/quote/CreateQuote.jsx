import { useStore } from "@/store";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object()
  .shape({
    from: yup
      .string()
      .required("Please enter the origin country.")
      .matches(/^[aA-zZ]+$/, "Please enter a country."),
    to: yup
      .string()
      .required("Please enter the destination country.")
      .matches(/^[aA-zZ]+$/, "Please enter a country."),
    quotePrice: yup
      .string()
      .required("Please enter a quote price")
      .matches(/^[0-9]*$/, "Please enter a valid amount."),
    channel: yup.string().required(),
  })
  .required();

export default function CreateQuote({ children }) {
  const { state, dispatch } = useStore();

  const opts = {
    mode: "onBlur",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
    resolver: yupResolver(schema),
    criteriaMode: "firstError",
    defaultValues: {
      from: "",
      to: "",
      quotePrice: 0,
      channel: "ocean",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(opts);

  const onSubmit = (value) => {
    dispatch({ type: "setFormState", value });
    dispatch({ type: "calculateShipping" });
    dispatch({ type: "setField", field: "hasQuote", value: true });
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label className="form-label" htmlFor="orig-country">
          Starting country
        </label>

        <input
          type="text"
          name="from"
          id="orig-country"
          className={errors.from ? "form-input-invalid" : "form-input"}
          aria-label="Origin country field"
          {...register("from")}
        />

        {errors.from && <span className="form-input-error">{errors.from.message} </span>}
      </div>

      <div className="form-control">
        <label className="form-label" htmlFor="dest-country">
          Destination country
        </label>

        <input
          type="text"
          name="to"
          id="dest-country"
          className={errors.to ? "form-input-invalid" : "form-input"}
          aria-label="Destination country field"
          {...register("to")}
        />

        {errors.to && <span className="form-input-error">{errors.to.message} </span>}
      </div>

      <div className="form-control">
        <label className="form-label" htmlFor="quote-price">
          Quote price
        </label>

        <input
          type="text"
          id="quote-price"
          name="quotePrice"
          className={errors.quotePrice ? "form-input-invalid" : "form-input"}
          {...register("quotePrice")}
        />

        {errors.quotePrice && <span className="form-input-error">{errors.quotePrice.message} </span>}
      </div>

      <div className="form-control">
        <label className="form-label" htmlFor="shipping-channel">
          Shipping channel
        </label>

        <select className="form-select" id="shipping-channel" name="channel" {...register("channel")}>
          <option value="ocean">Ocean</option>
          <option value="air">Air</option>
        </select>

        {errors.channel && <span className="form-input-error">{errors.channel.message} </span>}
      </div>

      <div className="form-control">
        <button className="form-button">Create quote</button>
      </div>
    </form>
  );
}
