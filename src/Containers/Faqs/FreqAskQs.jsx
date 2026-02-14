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
        question: `Question for All`,
        answer:
          "Ajeoba is an agriculture value-chain digital infrastructure provider. We are creating an ecosystem for agro-allied businesses and value-creating activities leveraging digital, as an alternative to the current, inefficient physical infrastructure.",
      },
      {
        question: "Do you provide bulk purchasing options for businesses?",
        answer:
          "Yes, we offer bulk purchasing options for businesses. Please contact our corporate sales team through the app or website for customized solutions.",
      },
      {
        question:
          "Are the products on your platform authentic and of high quality?",
        answer:
          "We source our products from reputable suppliers to ensure authenticity and quality. If you ever receive a product that does not meet your expectations, please contact our customer support for assistance.",
      },
      {
        question: "Question 2 for Farming Association",
        answer: "Answer 2 for Farming Association",
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
    ],
  },
  {
    persona: "Farming Association",
    questions: [
      {
        question: `Question for Farming Association`,
        answer:
          "We source our products from reputable suppliers to ensure authenticity and quality. If you ever receive a product that does not meet your expectations, please contact our customer support for assistance.",
      },
      {
        question: "Question 2 for Farming Association",
        answer: "Answer 2 for Farming Association",
      },
    ],
  },
  {
    persona: "Input Supplier",
    questions: [
      {
        question: "How do I contact customer support?",
        answer:
          "  You can reach our customer support team through the 'Contact Us' section in the app.",
      },
      {
        question: "Question 2 for Input Supplier",
        answer: "Answer 2 for Input Supplier",
      },
    ],
  },
  {
    persona: "Aggregator",
    questions: [
      {
        question: "Is it safe to make payments on your app?",
        answer:
          "Yes, we prioritize the security of your transactions. Our app uses secure payment gateways to ensure the safety of your financial information.",
      },
      {
        question: "Question 2 for Input Supplier",
        answer: "Answer 2 for Input Supplier",
      },
    ],
  },
  {
    persona: "Corporate Buyer",
    questions: [
      {
        question: "Question 1 for Corporate Buyer",
        answer: "Answer 1 for Input Supplier",
      },
      {
        question: "Question 2 for Input Supplier",
        answer: "Answer 2 for Input Supplier",
      },
    ],
  },
  {
    persona: "Quality Assurance",
    questions: [
      {
        question: "Question 1 for Quality Assurance",
        answer: "Answer 1 for Input Supplier",
      },
      {
        question: "Question 2 for Input Supplier",
        answer: "Answer 2 for Input Supplier",
      },
    ],
  },
  {
    persona: "Logistics",
    questions: [
      {
        question: "Is it safe to make payments on your app?",
        answer:
          "Yes, we prioritize the security of your transactions. Our app uses secure payment gateways to ensure the safety of your financial information.",
      },
      {
        question: "Question 2 for Input Supplier",
        answer: "Answer 2 for Input Supplier",
      },
    ],
  },
];
