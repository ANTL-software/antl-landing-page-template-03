import { HashRouter, Route, Routes, useSearchParams } from "react-router-dom";
import { useRouteScroll } from "./hooks";
import { CommerceNotFoundPage, CommercePage, PaymentCancelledPage, PaymentSuccessPage } from "./views/layouts/commercePage/CommercePage";

function RoutedApp() {
  useRouteScroll();

  const [searchParams] = useSearchParams();
  return <Routes><Route path="/" element={<CommercePage />} /><Route path="/paiement/succes" element={<PaymentSuccessPage sessionId={searchParams.get("session_id")} />} /><Route path="/paiement/annule" element={<PaymentCancelledPage />} /><Route path="*" element={<CommerceNotFoundPage />} /></Routes>;
}

export default function App() {
  return <HashRouter><RoutedApp /></HashRouter>;
}
