import React, { useState } from 'react';
import { 
  CheckCircle, 
  ChevronRight, 
  ChevronDown,
  Shield,
  Calendar,
  DollarSign,
  FileText,
  Phone,
  MapPin,
  Clock,
  AlertCircle,
  Download,
  Share2,
  X
} from 'lucide-react';

const PolicyCard = ({ policy, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Activa':
        return 'bg-green-100 text-green-800';
      case 'Por vencer':
        return 'bg-yellow-100 text-yellow-800';
      case 'Vencida':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
      {/* Encabezado de la póliza */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <Shield size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{policy.name}</h3>
              <p className="text-gray-600 text-sm">Póliza #{policy.number}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(policy.status)}`}>
            {policy.status}
          </span>
        </div>

        {/* Información principal */}
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <DollarSign size={18} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Cobertura</p>
              <p className="font-semibold text-gray-800">
                ${policy.coverage.toLocaleString('es-CO')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Prima mensual</p>
              <p className="font-semibold text-gray-800">
                ${policy.premium.toLocaleString('es-CO')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Próximo pago</p>
              <p className="font-semibold text-gray-800">{policy.nextPayment}</p>
            </div>
          </div>
        </div>

        {/* Vigencia */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Vigencia:</span>
            <span className="font-semibold text-gray-800">
              {policy.startDate} - {policy.endDate}
            </span>
          </div>
        </div>
      </div>

      {/* Coberturas incluidas */}
      <div className="p-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between mb-4 text-left"
        >
          <h4 className="font-semibold text-gray-700 flex items-center gap-2">
            <CheckCircle size={18} className="text-green-600" />
            Coberturas incluidas ({policy.benefits.length})
          </h4>
          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>

        {isExpanded ? (
          <div className="space-y-2 mb-4">
            {policy.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2 mb-4">
            {policy.benefits.slice(0, 3).map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
            {policy.benefits.length > 3 && (
              <p className="text-sm text-blue-600 font-medium ml-6">
                +{policy.benefits.length - 3} coberturas más
              </p>
            )}
          </div>
        )}

        {/* Exclusiones */}
        {policy.exclusions && policy.exclusions.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
              <AlertCircle size={18} className="text-orange-600" />
              Exclusiones importantes
            </h4>
            <div className="space-y-1">
              {policy.exclusions.map((exclusion, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                  <X size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>{exclusion}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="grid md:grid-cols-2 gap-3">
          <button 
            onClick={() => onViewDetails(policy)}
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold"
          >
            <FileText size={18} />
            <span>Ver detalles completos</span>
          </button>
          <button className="bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-semibold">
            <Download size={18} />
            <span>Descargar póliza</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const PolicyDetailModal = ({ policy, onClose }) => {
  if (!policy) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{policy.name}</h2>
            <p className="text-gray-600">Póliza #{policy.number}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Información general */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText size={20} className="text-blue-600" />
              Información general
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Número de póliza</p>
                  <p className="font-semibold text-gray-800">{policy.number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estado</p>
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                    {policy.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Vigencia desde</p>
                  <p className="font-semibold text-gray-800">{policy.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Vigencia hasta</p>
                  <p className="font-semibold text-gray-800">{policy.endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cobertura máxima</p>
                  <p className="font-semibold text-gray-800">
                    ${policy.coverage.toLocaleString('es-CO')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Prima mensual</p>
                  <p className="font-semibold text-gray-800">
                    ${policy.premium.toLocaleString('es-CO')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Beneficiarios */}
          {policy.beneficiaries && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Shield size={20} className="text-blue-600" />
                Beneficiarios
              </h3>
              <div className="space-y-2">
                {policy.beneficiaries.map((beneficiary, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{beneficiary.name}</p>
                        <p className="text-sm text-gray-600">{beneficiary.relation}</p>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">
                        {beneficiary.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coberturas detalladas */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle size={20} className="text-blue-600" />
              Coberturas detalladas
            </h3>
            <div className="space-y-2">
              {policy.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exclusiones */}
          {policy.exclusions && policy.exclusions.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertCircle size={20} className="text-orange-600" />
                Exclusiones
              </h3>
              <div className="space-y-2">
                {policy.exclusions.map((exclusion, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-orange-50 p-4 rounded-lg">
                    <X size={18} className="text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{exclusion}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Red de atención */}
          {policy.network && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-blue-600" />
                Red de atención
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 mb-3">{policy.network.description}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Clínicas disponibles</p>
                    <p className="font-semibold text-gray-800">{policy.network.clinics}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Farmacias</p>
                    <p className="font-semibold text-gray-800">{policy.network.pharmacies}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contacto de emergencia */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Phone size={20} className="text-blue-600" />
              Contacto de emergencia
            </h3>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="font-semibold text-gray-800 mb-2">Línea de atención 24/7</p>
              <p className="text-2xl font-bold text-blue-600 mb-1">01 8000 123 456</p>
              <p className="text-sm text-gray-600">
                Disponible todos los días del año para emergencias médicas
              </p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold">
              <Download size={18} />
              <span>Descargar PDF</span>
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-semibold">
              <Share2 size={18} />
              <span>Compartir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PoliciesPage = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [policies] = useState([
    {
      id: 1,
      name: 'Póliza Salud Integral',
      number: 'POL-2024-001234',
      status: 'Activa',
      coverage: 50000000,
      premium: 85000,
      nextPayment: '10 Feb 2026',
      startDate: '15 Ene 2024',
      endDate: '15 Ene 2025',
      benefits: [
        'Hospitalización hasta $50.000.000 por evento',
        'Consultas médicas generales ilimitadas',
        'Consultas especializadas sin límite',
        'Medicamentos con 80% de descuento',
        'Cirugías ambulatorias y de hospitalización',
        'Exámenes de laboratorio e imagenología',
        'Urgencias 24/7 en toda Colombia',
        'Terapias físicas y rehabilitación',
        'Atención domiciliaria post-hospitalización',
        'Chequeo médico preventivo anual'
      ],
      exclusions: [
        'Enfermedades preexistentes no declaradas',
        'Cirugías estéticas o cosméticas',
        'Tratamientos experimentales'
      ],
      beneficiaries: [
        { name: 'María Pérez González', relation: 'Cónyuge', percentage: 50 },
        { name: 'Carlos Pérez González', relation: 'Hijo', percentage: 50 }
      ],
      network: {
        description: 'Acceso a la red más amplia de clínicas y hospitales en Colombia',
        clinics: '250+ instituciones',
        pharmacies: '500+ farmacias'
      }
    },
    {
      id: 2,
      name: 'Póliza Dental Familiar',
      number: 'POL-2024-001235',
      status: 'Activa',
      coverage: 10000000,
      premium: 45000,
      nextPayment: '10 Feb 2026',
      startDate: '15 Ene 2024',
      endDate: '15 Ene 2025',
      benefits: [
        'Limpieza dental profesional 2 veces al año',
        'Ortodoncia con cobertura del 50%',
        'Urgencias dentales 24/7',
        'Tratamientos de conducto',
        'Extracciones dentales',
        'Empastes y resinas',
        'Radiografías dentales',
        'Prótesis dentales con cobertura del 40%'
      ],
      exclusions: [
        'Tratamientos de blanqueamiento',
        'Implantes dentales cosméticos'
      ],
      beneficiaries: [
        { name: 'Juan Pérez (Titular)', relation: 'Titular', percentage: 40 },
        { name: 'María Pérez González', relation: 'Cónyuge', percentage: 30 },
        { name: 'Carlos Pérez González', relation: 'Hijo', percentage: 30 }
      ],
      network: {
        description: 'Red especializada de odontólogos certificados',
        clinics: '80+ clínicas dentales',
        pharmacies: 'N/A'
      }
    }
  ]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mis Pólizas</h1>
        <p className="text-gray-600">
          Gestiona y consulta toda la información de tus pólizas SURA
        </p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <Shield size={32} className="text-blue-600" />
            <span className="text-3xl font-bold text-gray-800">
              {policies.filter(p => p.status === 'Activa').length}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Pólizas Activas</h3>
          <p className="text-sm text-gray-500">Cobertura vigente</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign size={32} className="text-green-600" />
            <span className="text-3xl font-bold text-gray-800">
              ${(policies.reduce((sum, p) => sum + p.coverage, 0) / 1000000).toFixed(0)}M
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Cobertura Total</h3>
          <p className="text-sm text-gray-500">Suma asegurada</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar size={32} className="text-orange-600" />
            <span className="text-3xl font-bold text-gray-800">
              ${policies.reduce((sum, p) => sum + p.premium, 0).toLocaleString('es-CO')}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Prima Mensual Total</h3>
          <p className="text-sm text-gray-500">Todas las pólizas</p>
        </div>
      </div>

      {/* Lista de pólizas */}
      <div className="grid md:grid-cols-2 gap-6">
        {policies.map(policy => (
          <PolicyCard
            key={policy.id}
            policy={policy}
            onViewDetails={setSelectedPolicy}
          />
        ))}
      </div>

      {/* Modal de detalles */}
      {selectedPolicy && (
        <PolicyDetailModal
          policy={selectedPolicy}
          onClose={() => setSelectedPolicy(null)}
        />
      )}
    </div>
  );
};

export default PoliciesPage;