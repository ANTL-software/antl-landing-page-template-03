import { HashRouter, Route, Routes } from "react-router-dom";
import { useRouteScroll } from "./hooks";
import { CommerceNotFoundPage, CommercePage } from "./views/layouts/commercePage/CommercePage";

function RoutedApp() {
  useRouteScroll();

  return <Routes><Route path="/" element={<CommercePage />} /><Route path="*" element={<CommerceNotFoundPage />} /></Routes>;
}

export default function App() {
  return <HashRouter><RoutedApp /></HashRouter>;
}
