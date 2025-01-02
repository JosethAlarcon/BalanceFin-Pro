import React from "react";

interface DashboardProps {
  userData: { id: number; nombre: string };
}

const Dashboard: React.FC<DashboardProps> = ({ userData }) => {
  return (
    <div>
      <h1>Bienvenido, {userData.nombre}</h1>
      <p>ID de usuario: {userData.id}</p>
    </div>
  );
};

export default Dashboard;
