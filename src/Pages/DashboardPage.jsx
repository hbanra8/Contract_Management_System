function DashboardPage({ contracts }) {
    return (
      <div style={{ marginTop: 16 }}>
        <h2>Contracts Dashboard</h2>
  
        {contracts.length === 0 ? (
          <p>No contracts available.</p>
        ) : (
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Contract Name</th>
                <th>Blueprint Name</th>
                <th>Status</th>
                <th>Created Date</th>
              </tr>
            </thead>
  
            <tbody>
              {contracts.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.blueprintName}</td>
                  <td>{c.status}</td>
                  <td>{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
  
  export default DashboardPage;
  