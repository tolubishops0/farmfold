import React from "react";
import FarmingAssociation from "./FarminAssociations.jsx";
import Banner from "./Banner.jsx";
import Title from "./Title.jsx";
import QualityAss from "./QualityAss.jsx";
import Logisticscomp from "./Logisticscomp.jsx";
import InputSupplier from "./InputSupplier.jsx";
import CorpBuyer from "./CorpBuyer.jsx";
import ExtensionWorkers from "./ExtensionWorkers.jsx";

function WhoNeedsSoftware() {
  return (
    <>
      <Banner />
      <Title />
      <FarmingAssociation />
      <QualityAss />
      <Logisticscomp />
      <InputSupplier />
      <CorpBuyer />
      <ExtensionWorkers />
    </>
  );
}

export default WhoNeedsSoftware;
