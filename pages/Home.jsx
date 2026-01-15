import React, { useState } from 'react';
import { FileText, DollarSign, Calendar, CreditCard, CheckCircle } from 'lucide-react';

const HomePage = () => {
  const [movements] = useState([
    { 
      id: 1, 
      type: 'Pago', 
      description: 'Pago de prima mensual', 
      amount: -85000, 
      date: '2026-01-10', 
      status: 'Completado',
      reference: 'REF-2026-001'
    },
    { 
      id: 2, 
      type: 'Reembolso', 
      description: 'Consulta médica general', 
      amount: 45000, 
      date: '2026-01-08', 
      status: 'Aprobado',
      reference: 'REIMB-2026-045'
    },
    { 
      id: 3, 
      type: 'Cargo', 
      description: 'Ajuste de prima por edad', 
      amount: -5000, 
      date: '2026-01-05', 
      status: 'Completado',
      reference: 'ADJ-2026-012'
    },
    { 
      id: 4, 
      type: 'Pago', 
      description: 'Pago de prima mensual', 
      amount: -80000, 
      date: '2025-12-10', 
      status: 'Completado',
      reference: 'REF-2025-342'
    },
    { 
      id: 5, 
      type: 'Reembolso', 
      description: 'Medicamentos recetados', 
      amount: 32000, 
      date: '2025-12-15', 
      status: 'Aprobado',
      reference: 'REIMB-2025-298'
    },
    { 
      id: 6, 
      type: 'Reembolso', 
      description: 'Exámenes de laboratorio', 
      amount: 28000, 
      date: '2025-12-01', 
      status: 'Procesado',
      reference: 'REIMB-2025-267'
    },
    { 
      id: 7, 
      type: 'Pago', 
      description: 'Pago de prima mensual', 
      amount: -80000, 
      date: '2025-11-10', 
      status: 'Completado',
      reference: 'REF-2025-289'
    }
  ]);

  const [pendingPayment] = useState({
    amount: 85000,
    dueDate: '2026-02-10',
    concept: 'Prima mensual - Febrero 2026',
    policyNumber: 'POL-2024-001234',
    daysRemaining: 15
  });

  const [statistics] = useState({
    activePolicies: 2,
    totalReimbursements: 77000,
    daysUntilPayment: 15
  });

  const getTypeColor = (type) => {
    switch (type) {
      case 'Pago':
        return 'bg-red-100 text-red-800';
      case 'Reembolso':
        return 'bg-green-100 text-green-800';
      case 'Cargo':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completado':
        return 'bg-green-100 text-green-800';
      case 'Aprobado':
        return 'bg-blue-100 text-blue-800';
      case 'Procesado':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pendiente':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Encabezado de bienvenida */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Bienvenido, Juan Pérez
        </h1>
        <p className="text-gray-600">
          Aquí está el resumen de tus pólizas de salud SURA
        </p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <FileText size={32} />
            <span className="text-3xl font-bold">{statistics.activePolicies}</span>
          </div>
          <h3 className="text-lg font-semibold">Pólizas Activas</h3>
          <p className="text-blue-100 text-sm mt-1">Todo al día</p>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <DollarSign size={32} />
            <span className="text-3xl font-bold">
              ${(statistics.totalReimbursements / 1000).toFixed(0)}K
            </span>
          </div>
          <h3 className="text-lg font-semibold">Reembolsos 2026</h3>
          <p className="text-green-100 text-sm mt-1">En total este año</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 text-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <Calendar size={32} />
            <span className="text-3xl font-bold">{statistics.daysUntilPayment}</span>
          </div>
          <h3 className="text-lg font-semibold">Días para pago</h3>
          <p className="text-yellow-100 text-sm mt-1">Próximo vencimiento</p>
        </div>
      </div>

      {/* Alerta de pago pendiente */}
      {pendingPayment && (
        <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg shadow-md p-6 mb-8 hover:shadow-lg transition-shadow">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-yellow-600 p-2 rounded-full">
                  <CreditCard size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Pago pendiente
                </h3>
              </div>
              <p className="text-gray-700 font-medium mb-1">
                {pendingPayment.concept}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                Póliza: {pendingPayment.policyNumber}
              </p>
              <p className="text-gray-600 text-sm">
                Vence el {pendingPayment.dueDate}
              </p>
              {pendingPayment.daysRemaining <= 7 && (
                <div className="mt-2 flex items-center gap-2 text-orange-700">
                  <CheckCircle size={16} />
                  <span className="text-sm font-semibold">
                    ¡Quedan solo {pendingPayment.daysRemaining} días!
                  </span>
                </div>
              )}
            </div>
            <div className="text-left md:text-right">
              <p className="text-gray-600 text-sm mb-1">Monto a pagar</p>
              <p className="text-3xl font-bold text-yellow-700 mb-3">
                ${pendingPayment.amount.toLocaleString('es-CO')}
              </p>
              <button className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2 font-semibold shadow-md hover:shadow-lg">
                <CreditCard size={20} />
                <span>Pagar ahora</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Historial de movimientos */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Historial de movimientos
          </h2>
          <p className="text-gray-600 text-sm">
            Todos tus pagos, reembolsos y cargos en un solo lugar
          </p>
        </div>

        {/* Vista de tabla para pantallas grandes */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Fecha
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Tipo
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Descripción
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Referencia
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                  Monto
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {movements.map(movement => (
                <tr 
                  key={movement.id} 
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {movement.date}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getTypeColor(movement.type)}`}>
                      {movement.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {movement.description}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 font-mono">
                    {movement.reference}
                  </td>
                  <td className={`px-4 py-3 text-sm text-right font-semibold ${
                    movement.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {movement.amount > 0 ? '+' : ''}
                    ${Math.abs(movement.amount).toLocaleString('es-CO')}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(movement.status)}`}>
                      {movement.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vista de tarjetas para móviles */}
        <div className="md:hidden space-y-4">
          {movements.map(movement => (
            <div 
              key={movement.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getTypeColor(movement.type)}`}>
                    {movement.type}
                  </span>
                  <p className="text-sm text-gray-800 font-medium mt-2">
                    {movement.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {movement.date}
                  </p>
                </div>
                <p className={`text-lg font-bold ${
                  movement.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {movement.amount > 0 ? '+' : ''}
                  ${Math.abs(movement.amount).toLocaleString('es-CO')}
                </p>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500 font-mono">
                  {movement.reference}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(movement.status)}`}>
                  {movement.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen de totales */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Total Pagos</p>
              <p className="text-2xl font-bold text-red-600">
                -${movements
                  .filter(m => m.amount < 0)
                  .reduce((sum, m) => sum + Math.abs(m.amount), 0)
                  .toLocaleString('es-CO')}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Total Reembolsos</p>
              <p className="text-2xl font-bold text-green-600">
                +${movements
                  .filter(m => m.amount > 0)
                  .reduce((sum, m) => sum + m.amount, 0)
                  .toLocaleString('es-CO')}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Balance Neto</p>
              <p className="text-2xl font-bold text-blue-600">
                ${movements
                  .reduce((sum, m) => sum + m.amount, 0)
                  .toLocaleString('es-CO')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;