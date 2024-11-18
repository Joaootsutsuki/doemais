import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../config/urlConfig";

function MinhaAgenda() {
  const [agenda, setAgenda] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const user = JSON.parse(Cookies.get("user") || "{}");

  const fetchMinhaAgenda = async (page, limit = 8) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${config.apiUrl}/minha-agenda`, {
        params: { uid: user.uid, page, limit },
        headers: {
          role: user.role,
        },
      });

      setAgenda(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Erro ao buscar sua agenda:", error.response?.data?.message || error.message);
      setError("Erro ao carregar sua agenda.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMinhaAgenda(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="instituicoes-container">
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {agenda.length > 0 ? (
            agenda.map((horario, index) => {
              return (
                <div key={index} className="instituicoes-box">
                  <div className="box">
                    <h1>Detalhes do Agendamento</h1>
                    <p>
                      <strong>Local:</strong> {horario.local_doacao}
                    </p>
                    <p>
                      <strong>Data:</strong> {horario.data_doacao}
                    </p>
                    <p>
                      <strong>Horário:</strong> {horario.horario_doacao}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Sua agenda está vazia.</p>
          )}
        </>
      )}

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Próxima
        </button>
      </div>
    </div>
  );
}

export default MinhaAgenda;
