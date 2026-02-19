import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { BingoGame } from "./components/BingoGame";
import { CustomerSupport } from "./components/CustomerSupport";
import { TermsPage } from "./components/TermsPage";
import { PrivacyPage } from "./components/PrivacyPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: BingoGame,
  },
  {
    path: "/customer-support",
    Component: CustomerSupport,
  },
  {
    path: "/terms-of-service",
    Component: TermsPage,
  },
  {
    path: "/privacy-policy",
    Component: PrivacyPage,
  },
]);
