import { Route, Routes } from 'react-router-dom';
import "./App.css";
import Candlestick from "./pages/CandleStick";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import { ProtectedRoute } from "./pages/auth/ProtectedRoute";
import Testing from "./pages/Testing";
import Backtest from "./pages/backtest/Backtest";
import Signals from "./pages/Signals";
import OptionChain from "./pages/OptionChain";
import "./indicatorLogger";
import OiBacktestChart from "./pages/OiBacktestChart";

import LandingShell from './components/landing/LandingShell';

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<LandingShell />} />
        <Route path="/pricing" element={<LandingShell pricingOnly />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/testing" element={<Testing />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/chart" element={<Candlestick />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/backtest" element={<Backtest />} />
          <Route path="/signals" element={<Signals />} />
          <Route path="/optionchain" element={<OptionChain />} />
          <Route path="/oi-backtest" element={<OiBacktestChart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
