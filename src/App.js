import { useState } from "react";
import BlueprintPage from "./Pages/BlueprintPage";
import ContractPage from "./Pages/ContractPage";
import DashboardPage from "./Pages/DashboardPage";

function App() {
  //  states 
  const [page, setPage] = useState("blueprint");
  const [selectedBlueprint, setSelectedBlueprint] = useState(null);
  const [contracts, setContracts] = useState([]);

  //  save contract and move to dashboard
  const saveContract = (contract) => {
    setContracts((prev) => [...prev, contract]);
    setPage("dashboard");
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Contract Management Platform</h1>
        <div className="badge">Frontend • Mock Data • React</div>
      </div>

      <div className="nav">
        <button className="btn primary" onClick={() => setPage("blueprint")}>
          Blueprints
        </button>

        <button className="btn" onClick={() => setPage("dashboard")}>
          View Contracts
        </button>

        <button className="btn danger" onClick={() => setContracts([])}>
          Clear Contracts
        </button>
      </div>

      <div className="card">
        {page === "blueprint" && (
          <BlueprintPage
            onCreateContract={(bp) => {
              setSelectedBlueprint(bp);
              setPage("contract");
            }}
          />
        )}

        {page === "contract" && (
          <ContractPage
            selectedBlueprint={selectedBlueprint}
            onSaveContract={saveContract}
          />
        )}

        {page === "dashboard" && <DashboardPage contracts={contracts} />}
      </div>
    </div>
  );
}

export default App;
