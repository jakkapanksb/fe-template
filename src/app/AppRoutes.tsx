import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();
  return <div>{t("hello")}</div>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<div>About</div>} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
