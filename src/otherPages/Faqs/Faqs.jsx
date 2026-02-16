import React, { useState } from "react";
import { Box, Typography, Tab, Tabs } from "@mui/material";
import faq_header from "../../Assets/Images/faqsframe_fxcfur.svg";
import cancel from "../../Assets/Images/cancel_zulufn.svg";
import plus from "../../Assets/Images/plus_kgvx4z.svg";
import CustomPagination from "../../Components/CustomPagination/CustomPagination";
import { faqs } from "./Faqs";

const FAQItem = ({ item, index, openIndex, setOpenIndex }) => {
  const open = index === openIndex;

  const openAccord = () => {
    setOpenIndex(open ? -1 : index);
  };

  return (
    <Box onClick={openAccord} sx={faqs.container1(open)}>
      {open ? (
        <Typography sx={faqs.container2}>
          <Typography sx={faqs.container3}>
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </Typography>
          <Typography>
            <Typography sx={faqs.container4}>{item.question}</Typography>
            <Typography sx={faqs.container5}>{item.answer}</Typography>
          </Typography>
        </Typography>
      ) : (
        <Typography sx={faqs.container6}>
          <Typography sx={faqs.container7}>
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </Typography>
          <Typography sx={faqs.container8}>{item.question}</Typography>
        </Typography>
      )}

      <Box sx={faqs.container9}>
        <img src={open ? cancel : plus} alt="button" style={faqs.container10} />
      </Box>
    </Box>
  );
};

export default function CustomizedAccordions() {
  const [query, setQuery] = useState({
    limit: 5,
    skip: 0,
  });
  const [openIndex, setOpenIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState("All");
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setQuery({ limit: 5, skip: 0 });
  };

  const startIndex = query.skip;
  const endIndex = query.skip + query.limit;
  const currentPersona = faqss.find((item) => item.persona === activeTab);
  const displayedFAQs = currentPersona
    ? currentPersona.questions.slice(startIndex, endIndex)
    : [];

  return (
    <Box>
      <img src={faq_header} alt="faq header" style={{ width: "100%" }} />

      <Box value={activeTab}>
        <Box sx={faqs.container13}>
          <Tabs
            sx={faqs.container14}
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto">
            {faqss.map((item, index) => (
              <Tab
                sx={faqs.container15}
                key={index}
                label={item.persona}
                value={item.persona}
              />
            ))}
          </Tabs>
        </Box>

        <Box sx={faqs.container11}>
          {displayedFAQs?.map((item, index) => (
            <FAQItem
              key={startIndex + index}
              item={item}
              index={startIndex + index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              value={activeTab}
            />
          ))}
        </Box>
      </Box>

      <Box sx={faqs.container12}>
        <CustomPagination
          totalCount={currentPersona.questions.length}
          query={query}
          setQuery={setQuery}
          customLimit={5}
        />
      </Box>
    </Box>
  );
}

const faqss = [
  {
    persona: "All",
    questions: [
      {
        question: "What is Farmfold?",
        answer:
          "Farmfold is an agricultural value-chain digital platform built to connect agro-allied businesses and value creators through efficient, technology-driven infrastructure that replaces outdated physical systems.",
      },
      {
        question: "Do you offer bulk purchasing for businesses?",
        answer:
          "Yes. Farmfold supports bulk purchasing for businesses and organizations. You can reach out through the platform to discuss custom sourcing and volume-based arrangements.",
      },
      {
        question: "Are products on Farmfold verified and reliable?",
        answer:
          "All products listed on Farmfold are sourced from trusted sellers and partners. If any product does not meet expected standards, our support team is available to assist.",
      },
      {
        question: "How can I reach customer support?",
        answer:
          "You can contact Farmfold’s support team through the Contact Us section available on the platform.",
      },
    ],
  },
  {
    persona: "Farming Association",
    questions: [
      {
        question: "How does Farmfold support farming associations?",
        answer:
          "Farmfold helps farming associations access markets, connect with buyers, and manage transactions more efficiently through a centralized digital platform.",
      },
      {
        question: "Can associations sell produce collectively on Farmfold?",
        answer:
          "Yes. Farming associations can list and manage produce collectively, making it easier to reach larger buyers and improve pricing outcomes.",
      },
    ],
  },
  {
    persona: "Input Supplier",
    questions: [
      {
        question: "How do input suppliers list products on Farmfold?",
        answer:
          "Input suppliers can onboard through the platform and list approved agricultural inputs such as seeds, fertilizers, and equipment for farmers and businesses.",
      },
      {
        question: "Does Farmfold verify listed suppliers?",
        answer:
          "Yes. Farmfold reviews suppliers to maintain quality, reliability, and trust across the marketplace.",
      },
    ],
  },
  {
    persona: "Aggregator",
    questions: [
      {
        question: "Is payment processing secure on Farmfold?",
        answer:
          "Yes. Farmfold uses secure payment systems to ensure transactions are protected and reliable for all users.",
      },
      {
        question: "Can aggregators manage multiple sellers on the platform?",
        answer:
          "Yes. Aggregators can manage multiple suppliers and coordinate sales efficiently through Farmfold’s tools.",
      },
    ],
  },
  {
    persona: "Corporate Buyer",
    questions: [
      {
        question: "Can corporate buyers source large volumes on Farmfold?",
        answer:
          "Corporate buyers can source bulk quantities directly from verified sellers and farming groups using Farmfold’s marketplace.",
      },
      {
        question: "Does Farmfold support recurring supply arrangements?",
        answer:
          "Yes. Farmfold enables structured sourcing and repeat supply arrangements based on buyer needs.",
      },
    ],
  },
  {
    persona: "Quality Assurance",
    questions: [
      {
        question: "How does Farmfold ensure product quality?",
        answer:
          "Farmfold works with verified sellers and applies quality standards to ensure products meet expected requirements.",
      },
      {
        question: "Can quality checks be integrated into transactions?",
        answer:
          "Yes. Farmfold supports quality review processes as part of its supply chain workflow.",
      },
    ],
  },
  {
    persona: "Logistics",
    questions: [
      {
        question: "Does Farmfold support logistics coordination?",
        answer:
          "Farmfold enables coordination between sellers, buyers, and logistics partners to improve delivery efficiency.",
      },
      {
        question: "Are transactions protected during delivery?",
        answer:
          "Yes. Secure payment and transaction handling ensure protection across the delivery lifecycle.",
      },
    ],
  },
];
