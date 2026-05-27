import { useEffect, useState } from "react";
import { getAllPatients } from "../services/adminService";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPatients()
      .then(res => setPatients(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading patients...</p>;

  return (
    <div>
      <h2>Patients List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {patients.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.username}</td>
              <td>{p.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
