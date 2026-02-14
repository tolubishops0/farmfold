import React from "react";
import { Box } from "@mui/material";
import NavBar from "../../Components/LandingPage/NavBar/NavBar.jsx";
import FAQs from "./FreqAskQs";
import Footer from "../../Components/LandingPage/Footer/Footer";

const Faqs = () => {
  return (
    <>
      <Box>
        <NavBar />
        <FAQs />
        <Footer />
      </Box>
    </>
  );
};

export default Faqs;

const FAbQs = [
  {
    question: "What is Ajeoba?",
    answer:
      "Ajeoba is an agriculture value-chain digital infrastructure provider. We are creating an ecosystem for agro-allied businesses and value-creating activities leveraging digital, as an alternative to the current, inefficient physical infrastructure.",
  },
  {
    question: "How does Ajeoba work?",
    answer:
      "Serving as the integrator cum operator at the center of the ecosystem, Ajeoba’s digital marketplace platform primarily creates an interface between sellers (farmers, producers, and aggregators) and buyers (consumers, aggregators, industrials, and exporters) of agricultural products and related transweractions leveraging information technology to eliminate transweraction friction and enhance supply chain efficiency.",
  },
  {
    question: "Who can use Ajeoba?",
    answer:
      "Corporate Buyers, Farming Cooperatives/Associations, Aggregators, Input suppliers, and Quality Assurance companies",
  },
  {
    question:
      "What types of agricultural products can be bought and sold on Ajeoba?",
    answer:
      "Ajeoba deals in a variety of products including but not limited to grains, horticulture, tubers, Seeds, Industrial Crops, etc Please contact us to suggest something we might be missing out on.",
  },
  {
    question: "Are there any fees associated with using Ajeoba?",
    answer:
      "Yes, there are commissions associated with transweractions on Ajeoba.The commission varies per product and can be seen during the product upload and purchase process.",
  },
  {
    question: "What products do you offer on your platform?",
    answer:
      "We provide a wide range of inputs, including but not limited to seeds, fertilizers, pesticides,and agricultural equipment",
  },
  {
    question: "How can I place an order?",
    answer:
      "Simply download our app, browse through the available products, and add them to your cart. Proceed to checkout and follow the steps to complete your order",
  },
  {
    question: "Is it safe to make payments on your app?",
    answer:
      "Yes, we prioritize the security of your transactions. Our app uses secure payment gateways to ensure the safety of your financial information.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods, including credit/debit cards, net banking, and mobile wallets. You can choose the option that suits you best during checkout.",
  },
  {
    question: "Can I track my order?",
    answer:
      "  Yes, you can track your order in real-time through the app. We provide regular updates on the status of your delivery.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "  Yes, you can track your order in real-time through the app. We provide regular updates on the status of your delivery.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "  You can reach our customer support team through the 'Contact Us' section in the app.",
  },
  {
    question:
      "Are the products on your platform authentic and of high quality?",
    answer:
      "We source our products from reputable suppliers to ensure authenticity and quality. If you ever receive a product that does not meet your expectations, please contact our customer support for assistance.",
  },
  {
    question: "Do you provide bulk purchasing options for businesses?",
    answer:
      "Yes, we offer bulk purchasing options for businesses. Please contact our corporate sales team through the app or website for customized solutions.",
  },
];
