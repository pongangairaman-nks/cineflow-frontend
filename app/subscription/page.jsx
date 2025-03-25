"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY);
const plans = [
  {
    name: "Basic",
    price: 99,
    description: "Good Quality - 720p Resolution",
    nunmerOfDevices: "1 Device"
  },
  {
    name: "Standard",
    price: 199,
    description: "Better Quality - 1080p Resolution",
    nunmerOfDevices: "2 Device"
  },
  {
    name: "Premium",
    price: 499,
    description: "Best Quality - 4K + HDR",
    nunmerOfDevices: "4 Devices"
  }
];

const cardStyle = {
  width: "300px",
  height: "300px",
  background:
    "linear-gradient(149deg, #6C1E41 6.96%, #251743 40.17%, #120c1f 73.39%)",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  textAlign: "center",
  padding: "20px",
  border: "1px solid grey",
  transition:
    "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease-in-out"
};

const buttonStyle = {
  marginTop: "15px",
  padding: "10px 15px",
  border: "none",
  background: "#e50914",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "background 0.3s ease-in-out"
};

const SubscriptionCard = ({ plan, handleCheckout }) => {
  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h3 style={{ margin: "15px 0", fontSize: "1.8rem", color: "white" }}>
        {plan.name}
      </h3>
      <p style={{ color: "#d1d1d1", fontSize: "1rem", margin: "5px 0" }}>
        {plan.price}
      </p>
      <p style={{ color: "#d1d1d1", fontSize: "1rem", margin: "5px 0" }}>
        {plan.description}
      </p>
      <p style={{ color: "#d1d1d1", fontSize: "1rem", margin: "5px 0" }}>
        {plan.nunmerOfDevices}
      </p>
      <button
        style={buttonStyle}
        onClick={() => handleCheckout(plan.name, plan.price)}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#b20710")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#e50914")}
      >
        Subscribe
      </button>
    </div>
  );
};

const SubscriptionCards = () => {
  const handleCheckout = async (name, price) => {
    const res = await fetch("/api/checkout-session", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        price: price,
        origin: window.location.origin
      })
    });

    const { id } = await res.json();

    const stripe = await stripePromise;

    stripe?.redirectToCheckout({
      sessionId: id
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        color: "white",
        padding: "20px"
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
        Choose Your Plan
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          maxWidth: "1000px"
        }}
      >
        {plans.map((plan, index) => (
          <SubscriptionCard
            key={index}
            plan={plan}
            handleCheckout={handleCheckout}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionCards;
