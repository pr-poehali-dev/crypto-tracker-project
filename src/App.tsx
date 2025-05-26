import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "@/pages/Index";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
        <Toaster position="top-right" theme="dark" richColors />
      </div>
    </Router>
  );
}

export default App;
