// src/pages/ContractPage.jsx
import { useState } from "react";

function ContractPage({ selectedBlueprint, onSaveContract }) {
  const [values, setValues] = useState({});
  const [status, setStatus] = useState("Created");

  if (!selectedBlueprint) return <p>No blueprint selected.</p>;

  // lifecycle mapping
  const nextStatus = {
    Created: "Approved",
    Approved: "Sent",
    Sent: "Signed",
    Signed: "Locked",
  };

  const setFieldValue = (label, value) => {
    setValues((prev) => ({ ...prev, [label]: value }));
  };

  const moveNext = () => {
    if (status === "Locked" || status === "Revoked") return;
    setStatus(nextStatus[status] || status);
  };

  const revoke = () => {
    if (status === "Locked") return; // After being locked it cannot be revoked.
    setStatus("Revoked");
  };

  const isFinal = status === "Locked" || status === "Revoked";
  const canEdit = !isFinal;
  const canSave = status === "Signed" || status === "Locked";

  const renderInput = (type, label) => {
    if (type === "Text") {
      return (
        <input
          type="text"
          placeholder={label}
          value={values[label] || ""}
          disabled={!canEdit}
          onChange={(e) => setFieldValue(label, e.target.value)}
        />
      );
    }

    if (type === "Date") {
      return (
        <input
          type="date"
          value={values[label] || ""}
          disabled={!canEdit}
          onChange={(e) => setFieldValue(label, e.target.value)}
        />
      );
    }

    if (type === "Checkbox") {
      return (
        <input
          type="checkbox"
          checked={values[label] || false}
          disabled={!canEdit}
          onChange={(e) => setFieldValue(label, e.target.checked)}
        />
      );
    }

    // Signature 
    if (type === "Signature") {
      return (
        <input
          type="text"
          placeholder="Type your name as signature"
          value={values[label] || ""}
          disabled={!canEdit}
          onChange={(e) => setFieldValue(label, e.target.value)}
        />
      );
    }

    return null;
  };

  const handleSaveContract = () => {
    if (!onSaveContract) return;

    const contract = {
      id: Date.now(),
      name: `${selectedBlueprint.name} Contract`,
      blueprintName: selectedBlueprint.name,
      status: status,
      date: new Date().toLocaleDateString(),
      values: values, 
    };

    onSaveContract(contract);
  };

  return (
    <div style={{ marginTop: 16 }}>
      <h2>Create Contract</h2>

      <p>
        <b>Blueprint:</b> {selectedBlueprint.name}
      </p>

      <p>
        <b>Status:</b> {status}
      </p>

      <button onClick={moveNext} disabled={isFinal}>
        Next Status
      </button>{" "}
      <button onClick={revoke} disabled={isFinal}>
        Revoke
      </button>

      <hr />

      <h3>Fill Fields:</h3>

      {selectedBlueprint.fields.map((type, i) => {
        const label = `Field ${i + 1} (${type})`;
        return (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ marginBottom: 6 }}>
              <b>{label}</b>
            </div>
            {renderInput(type, label)}
          </div>
        );
      })}

      <hr />

      <h3>Preview Values:</h3>
      <pre>{JSON.stringify(values, null, 2)}</pre>

      <hr />

      <button onClick={handleSaveContract} disabled={!canSave}>
        Save Contract
      </button>

      <p style={{ marginTop: 12 }}>
        <i>
          Note: Fields become non-editable when the contract status is Locked or Revoked.
        </i>
      </p>
    </div>
  );
}

export default ContractPage;
