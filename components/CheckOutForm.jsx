import { useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useData from "../hooks/useData";
import useAuth from "../hooks/useAuth";
import CardSection from "./CardSection";
import { toast } from "react-toastify";

const CheckOutForm = ({ total }) => {
  const [formErrors, setFormErrors] = useState({
    address: { error: "", isError: false },
    city: { error: "", isError: false },
    state: { error: "", isError: false },
  });
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
  });
  const stripe = useStripe();
  const elements = useElements();
  const axiosPrivate = useAxiosPrivate();
  const { currentUser } = useAuth();
  const { cart, setCart } = useData();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitOrder = async () => {
    const { address, city, state } = formData;
    let errors = false;

    // Validate address
    if (!address || address.trim() === "") {
      errors = true;
      setFormErrors((prev) => ({
        ...prev,
        address: { error: "Address is required", isError: true },
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        address: { error: "", isError: false },
      }));
    }

    // Validate city
    if (!city || city.trim() === "") {
      errors = true;
      setFormErrors((prev) => ({
        ...prev,
        city: { error: "City is required", isError: true },
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        city: { error: "", isError: false },
      }));
    }

    // Validate State
    if (!state || state.trim() === "") {
      errors = true;
      setFormErrors((prev) => ({
        ...prev,
        state: { error: "State is required", isError: true },
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        state: { error: "", isError: false },
      }));
    }

    if (errors) return;

    try {
      const cardElement = elements.getElement(CardElement);
      const stripeToken = await stripe.createToken(cardElement);

      const stripeCharge = await axiosPrivate.post("/api/stripe/charge", {
        user: currentUser,
        amount: total,
      });

      if (stripeCharge.status === 200) {
        const orderResponse = await axiosPrivate.post("/api/order", {
          restaurantId: cart[0].restaurantId,
          date: new Date(),
          total: total,
          dishes: cart,
          chargeToken: stripeToken,
        });

        setCart([]);
        return toast.success(orderResponse.data.message);
      } else {
        return toast.error("Unable to process payment");
      }
    } catch (error) {
      setError("Error Ocurred");
      console.log(error);
    }
  };

  return (
    <div className="paper">
      <h5>Your information:</h5>
      <hr />
      <FormGroup style={{ display: "flex" }}>
        <div style={{ flex: "0.90", marginRight: "0" }}>
          <Label>Address</Label>
          <Input name="address" onChange={(e) => handleChange(e)} />
          {formErrors.address.isError && (
            <span className="error">{formErrors.address.error}</span>
          )}
        </div>
      </FormGroup>
      <FormGroup style={{ display: "flex" }}>
        <div style={{ flex: "0.65", marginRight: "0" }}>
          <Label>City</Label>
          <Input name="city" onChange={(e) => handleChange(e)} />
          {formErrors.city.isError && (
            <span className="error">{formErrors.city.error}</span>
          )}
        </div>
        <div style={{ flex: "0.25", marginRight: 0 }}>
          <Label>State</Label>
          <Input name="state" onChange={(e) => handleChange(e)} />
          {formErrors.state.isError && (
            <span className="error">{formErrors.state.error}</span>
          )}
        </div>
      </FormGroup>

      <CardSection
        data={formData}
        stripeError={error}
        submitOrder={submitOrder}
      />
      <style jsx global>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            height: auto;
            width: 50%;
            padding: 10px;
            background: #fff;
            border-radius: 6px;
            margin: 20px 0;
          }

          .form-half {
            flex: 0.5;
          }

          .Checkout {
            margin: 0 auto;
            width: 70%;
            box-sizing: border-box;
            padding: 0 5px;
          }

          .error {
            color: var(--color-error);
          }

          label {
            color: #6b7c93;
            font-weight: 300;
            letter-spacing: 0.025em;
          }

          form {
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 3px solid #e6ebf1;
          }

          input,
          .StripeElement {
            display: block;
            background-color: #f8f9fa !important;
            margin: 10px 0 20px 0;
            max-width: 500px;
            padding: 10px 14px;
            font-size: 1em;
            font-family: "Source Code Pro", monospace;
            box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
              rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
            border: 0;
            outline: 0;
            border-radius: 4px;
            background: white;
          }

          input:focus,
          .StripeElement--focus {
            box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
              rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
            -webkit-transition: all 150ms ease;
            transition: all 150ms ease;
          }

          .StripeElement.IdealBankElement,
          .StripeElement.PaymentRequestButton {
            padding: 0;
          }
        `}
      </style>
    </div>
  );
};

export default CheckOutForm;
