function PolicyCard({ policy }) {
  const { date, amount, status } = policy;

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h3 className="font-bold">Fecha: {date}</h3>
      <p>Monto: ${amount.toLocaleString()}</p>
      <p>
        Estado:{" "}
        <span
          className={
            status === "Pagado"
              ? "text-green-600 font-semibold"
              : "text-yellow-600 font-semibold"
          }
        >
          {status}
        </span>
      </p>
      {status === "Pendiente" && (
        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Pagar
        </button>
      )}
    </div>
  );
}

export default PolicyCard;
