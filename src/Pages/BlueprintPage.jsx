import { useState } from "react";

function BlueprintPage({ onCreateContract }) {
  //  states
  const [blueprintName, setBlueprintName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [fields, setFields] = useState([]);
  const [blueprints, setBlueprints] = useState([]);

  //  add field to current blueprint draft
  const addField = () => {
    if (fieldType === "") return;
    setFields([...fields, fieldType]);
    setFieldType("");
  };

  //  save blueprint to list
  const saveBlueprint = () => {
    if (blueprintName.trim() === "") return;
    if (fields.length === 0) return;

    const newBlueprint = {
      id: Date.now(),
      name: blueprintName,
      fields: fields,
    };

    setBlueprints([...blueprints, newBlueprint]);

    // reset form
    setBlueprintName("");
    setFields([]);
    setFieldType("");
  };

  return (
    <div style={{ marginTop: 16 }}>
      <h2>Create Blueprint</h2>

      {/* Blueprint Name */}
      <input
        type="text"
        placeholder="Enter Blueprint Name"
        value={blueprintName}
        onChange={(e) => setBlueprintName(e.target.value)}
      />
      {/* live preview */}
      <p>Blueprint Name: {blueprintName}</p>

      <br />

      {/* Field Type */}
      <select value={fieldType} onChange={(e) => setFieldType(e.target.value)}>
        <option value="">Select Field Type</option>
        <option value="Text">Text</option>
        <option value="Date">Date</option>
        <option value="Checkbox">Checkbox</option>
        <option value="Signature">Signature</option>
      </select>
      {/* live preview */}
      <p>Selected Field Type: {fieldType}</p>

      <br />

      {/* Buttons */}
      <button onClick={addField}>Add Field</button>
      {" "}
      <button onClick={saveBlueprint}>Save Blueprint</button>

      {/* Current fields */}
      <h3>Fields (Current Draft):</h3>
      {fields.length === 0 ? (
        <p>No fields added yet.</p>
      ) : (
        <ul>
          {fields.map((field, index) => (
            <li key={index}>{field}</li>
          ))}
        </ul>
      )}

      <hr />

      {/* Saved Blueprints */}
      <h3>Saved Blueprints:</h3>
      {blueprints.length === 0 ? (
        <p>No saved blueprints yet.</p>
      ) : (
        <ul>
          {blueprints.map((bp) => (
            <li key={bp.id}>
              {bp.name} — {bp.fields.length} fields{" "}
              <button
                onClick={() => {
                  if (onCreateContract) onCreateContract(bp);
                }}
              >
                Create Contract
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BlueprintPage;
