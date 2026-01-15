import React, { useState } from 'react';
import { 
  Bell, 
  DollarSign, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Info,
  X,
  Filter,
  MoreVertical,
  Trash2,
  Eye
} from 'lucide-react';

const NotificationCard = ({ notification, onMarkAsRead, onDelete }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="text-yellow-600" size={24} />;
      case 'alert':
        return <AlertCircle className="text-red-600" size={24} />;
      case 'success':
        return <CheckCircle className="text-green-600" size={24} />;
      case 'info':
        return <Info className="text-blue-600" size={24} />;
      default:
        return <Bell className="text-blue-600" size={24} />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'payment':
        return 'border-yellow-600';
      case 'alert':
        return 'border-red-600';
      case 'success':
        return 'border-green-600';
      case 'info':
        return 'border-blue-600';
      default:
        return 'border-blue-600';
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case 'payment':
        return 'bg-yellow-50';
      case 'alert':
        return 'bg-red-50';
      case 'success':
        return 'bg-green-50';
      case 'info':
        return 'bg-blue-50';
      default:
        return 'bg-blue-50';
    }
  };

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${getBorderColor(notification.type)} hover:shadow-lg transition-shadow ${!notification.read ? 'bg-blue-50/30' : ''}`}>
      <div className="flex items-start gap-3">
        {/* Icono */}
        <div className={`${getBackgroundColor(notification.type)} p-3 rounded-full flex-shrink-0`}>
          {getIcon(notification.type)}
        </div>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className={`font-semibold text-gray-800 ${!notification.read ? 'font-bold' : ''}`}>
              {notification.title}
            </h4>
            <div className="flex items-center gap-2 flex-shrink-0">
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            {notification.message}
          </p>

          {/* Información adicional si existe */}
          {notification.extraInfo && (
            <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Detalles:</p>
              <p className="text-sm text-gray-700">{notification.extraInfo}</p>
            </div>
          )}

          {/* Acción si existe */}
          {notification.action && (
            <button className={`text-sm font-semibold ${
              notification.type === 'payment' ? 'text-yellow-700 hover:text-yellow-800' :
              notification.type === 'alert' ? 'text-red-700 hover:text-red-800' :
              notification.type === 'success' ? 'text-green-700 hover:text-green-800' :
              'text-blue-700 hover:text-blue-800'
            } transition-colors`}>
              {notification.action} →
            </button>
          )}

          {/* Pie de tarjeta */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock size={14} />
              <span>{notification.date}</span>
              <span>•</span>
              <span>{notification.time}</span>
            </div>
            
            {notification.category && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {notification.category}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Menú desplegable */}
      {showMenu && (
        <div className="mt-3 pt-3 border-t border-gray-200 flex gap-2">
          {!notification.read && (
            <button
              onClick={() => {
                onMarkAsRead(notification.id);
                setShowMenu(false);
              }}
              className="flex-1 flex items-center justify-center gap-2 text-sm text-blue-600 hover:bg-blue-50 py-2 rounded-lg transition-colors"
            >
              <Eye size={16} />
              <span>Marcar como leída</span>
            </button>
          )}
          <button
            onClick={() => {
              onDelete(notification.id);
              setShowMenu(false);
            }}
            className="flex-1 flex items-center justify-center gap-2 text-sm text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
            <span>Eliminar</span>
          </button>
        </div>
      )}
    </div>
  );
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'payment',
      title: 'Recordatorio de pago',
      message: 'Tu prima mensual de $85,000 vence el 10 de febrero de 2026. Realiza el pago a tiempo para mantener tu cobertura activa.',
      date: '2026-01-13',
      time: '09:30 AM',
      read: false,
      category: 'Pagos',
      action: 'Ir a pagar',
      extraInfo: 'Póliza: POL-2024-001234 - Salud Integral'
    },
    {
      id: 2,
      type: 'success',
      title: 'Reembolso aprobado',
      message: 'Tu solicitud de reembolso por $45,000 correspondiente a consulta médica general ha sido aprobada y será depositada en 3 días hábiles.',
      date: '2026-01-10',
      time: '02:15 PM',
      read: false,
      category: 'Reembolsos',
      action: 'Ver detalles',
      extraInfo: 'Número de solicitud: REIMB-2026-045'
    },
    {
      id: 3,
      type: 'alert',
      title: 'Actualización de cobertura',
      message: 'Se han actualizado los términos y condiciones de tu póliza de salud. Es importante que revises los cambios en la sección de Pólizas para conocer tu nueva cobertura.',
      date: '2026-01-08',
      time: '11:00 AM',
      read: false,
      category: 'Importante',
      action: 'Ver cambios',
      extraInfo: 'Vigencia desde: 01 de febrero de 2026'
    },
    {
      id: 4,
      type: 'success',
      title: 'Pago recibido correctamente',
      message: 'Hemos recibido tu pago de $85,000 correspondiente a la prima de enero 2026. Tu póliza continúa activa.',
      date: '2026-01-10',
      time: '03:45 PM',
      read: true,
      category: 'Pagos',
      extraInfo: 'Recibo: REC-2026-001234'
    },
    {
      id: 5,
      type: 'info',
      title: 'Nueva red de clínicas disponible',
      message: 'Ahora puedes acceder a 15 nuevas clínicas en tu ciudad con tu póliza SURA. Consulta el directorio médico actualizado.',
      date: '2026-01-05',
      time: '10:00 AM',
      read: true,
      category: 'Información',
      action: 'Ver directorio'
    },
    {
      id: 6,
      type: 'info',
      title: 'Recordatorio de chequeo anual',
      message: 'Tu póliza incluye un chequeo médico anual sin costo. Agenda tu cita antes del 28 de febrero para aprovechar este beneficio.',
      date: '2026-01-03',
      time: '08:00 AM',
      read: true,
      category: 'Beneficios'
    },
    {
      id: 7,
      type: 'payment',
      title: 'Confirmación de débito automático',
      message: 'Se ha configurado exitosamente el débito automático para el pago de tus primas. El próximo cargo será el 10 de febrero.',
      date: '2026-01-02',
      time: '04:30 PM',
      read: true,
      category: 'Pagos',
      extraInfo: 'Cuenta terminada en: ****4567'
    },
    {
      id: 8,
      type: 'success',
      title: 'Solicitud de reembolso en proceso',
      message: 'Tu solicitud de reembolso por medicamentos está siendo procesada. Te notificaremos cuando sea aprobada.',
      date: '2025-12-28',
      time: '01:20 PM',
      read: true,
      category: 'Reembolsos',
      extraInfo: 'Número de solicitud: REIMB-2025-312'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleClearRead = () => {
    setNotifications(notifications.filter(n => !n.read));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return n.type === filter;
  });

  const filterOptions = [
    { value: 'all', label: 'Todas', count: notifications.length },
    { value: 'unread', label: 'No leídas', count: unreadCount },
    { value: 'payment', label: 'Pagos', count: notifications.filter(n => n.type === 'payment').length },
    { value: 'success', label: 'Aprobadas', count: notifications.filter(n => n.type === 'success').length },
    { value: 'alert', label: 'Alertas', count: notifications.filter(n => n.type === 'alert').length },
    { value: 'info', label: 'Información', count: notifications.filter(n => n.type === 'info').length }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Encabezado */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-800">Notificaciones</h1>
            {unreadCount > 0 && (
              <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                {unreadCount} nueva{unreadCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
        <p className="text-gray-600">
          Mantente informado sobre tus pólizas, pagos y reembolsos
        </p>
      </div>

      {/* Barra de acciones */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium"
          >
            <Filter size={18} />
            <span>Filtros</span>
          </button>

          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
              >
                Marcar todas como leídas
              </button>
            )}
            {notifications.some(n => n.read) && (
              <button
                onClick={handleClearRead}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
              >
                Limpiar leídas
              </button>
            )}
          </div>
        </div>

        {/* Panel de filtros */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {filterOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                  <span className="ml-1 text-xs opacity-75">({option.count})</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lista de notificaciones */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-4">
          {filteredNotifications.map(notification => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Bell size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No hay notificaciones
          </h3>
          <p className="text-gray-500">
            {filter === 'unread' 
              ? 'No tienes notificaciones sin leer'
              : 'Todas tus notificaciones están aquí cuando las recibas'}
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;