import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../config/urlConfig";

function StatusInstituicoes() {
  const [instituicoes, setInstituicoes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const user = JSON.parse(Cookies.get("user") || "{}");

  const fetchInstituicoesPendentes = async (page, limit = 8) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${config.apiUrl}/instituicoes/pendentes`, {
        params: { page, limit },
        headers: {
          role: user.role,
        },
      });

      setInstituicoes(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Erro ao buscar instituições pendentes:", error.response?.data?.message || error.message);
      setError("Erro ao carregar instituições pendentes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstituicoesPendentes(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const rejeitarInstituicao = async (id) => {
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.put(
        `${config.apiUrl}/instituicoes/reject`,
        { id },
        {
          headers: {
            role: user.role,
          },
        }
      );

      console.log("Instituição rejeitada com sucesso:", response.data.message);
      setSuccess("Instituição rejeitada com sucesso.");
      await fetchInstituicoesPendentes(currentPage);
    } catch (error) {
      console.error("Erro ao rejeitar instituição:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Erro ao rejeitar instituição.");
    }
  };

  const aprovarInstituicao = async (id) => {
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.put(
        `${config.apiUrl}/instituicoes/approved`,
        { id },
        {
          headers: {
            role: user.role,
          },
        }
      );

      console.log("Instituição aprovada com sucesso:", response.data.message);
      setSuccess("Instituição aprovada com sucesso.");
      await fetchInstituicoesPendentes(currentPage);
    } catch (error) {
      console.error("Erro ao aprovar instituição:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Erro ao aprovar instituição.");
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
          {instituicoes.length > 0 ? (
            instituicoes.map((instituicao, index) => {
              const date = new Date(instituicao.created_at);
              const formattedDate = date.toLocaleDateString("pt-BR");

              return (
                <div key={index} className="instituicoes-box">
                  <div className="box">
                    <h1>{instituicao.nome}</h1>
                    <p>
                      <strong>Tipo:</strong> {instituicao.tipo}
                    </p>
                    <p>
                      <strong>CNPJ:</strong> {instituicao.cnpj}
                    </p>
                    <p>
                      <strong>Telefone:</strong> {instituicao.telefone}
                    </p>
                    <p>
                      <strong>Responsável:</strong> {instituicao.responsavel}
                    </p>
                    <p>
                      <strong>Status:</strong> {instituicao.status}
                    </p>
                    <p>
                      <strong>Data Solicitação:</strong> {formattedDate}
                    </p>
                    <div className="buttons">
                      <button
                        className="approve-btn"
                        onClick={() => aprovarInstituicao(instituicao.id_instituicao)}
                      >
                        Aprovar
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => rejeitarInstituicao(instituicao.id_instituicao)}
                      >
                        Rejeitar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Nenhuma instituição pendente encontrada.</p>
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

export default StatusInstituicoes;
