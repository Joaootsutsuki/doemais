import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../config/urlConfig";

function StatusSolicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = JSON.parse(Cookies.get("user") || "{}");

  const fetchSolicitacoes = async (page, limit = 8) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${config.apiUrl}/listar-solicitacoes`, {
        params: { uid: user.uid, page, limit },
        headers: {
          role: user.role,
        },
      });

      setSolicitacoes(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Erro ao buscar suas solicitações:", error.response?.data?.message || error.message);
      setError("Erro ao carregar suas solicitações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolicitacoes(currentPage);
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
          {solicitacoes.length > 0 ? (
            solicitacoes.map((solicitacao, index) => {
              return (
                <div key={index} className="instituicoes-box">
                  <div className="box solicitacoes">
                    <h2>Detalhes da Solicitação </h2>
                    <hr />
                    <h3>
                      {new Date(solicitacao.data_solicitacao).toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </h3>
                    <hr />
                    <p>
                      <strong>Nome Responsável:</strong> {solicitacao.nome_responsavel}
                    </p>
                    <p>
                      <strong>Tipo Sanguíneo:</strong> {solicitacao.tipo_sanguineo + solicitacao.fator_rh}
                    </p>
                    <p>
                      <strong>Quantidade:</strong> {solicitacao.quantidade_bolsas}
                    </p>
                    <p>
                      <strong>Id da Solicitação:</strong> {solicitacao.id_solicitacao}
                    </p>
                    <p>
                      <strong>Status:</strong> {solicitacao.status}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Você não tem nenhuma solicitação.</p>
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

export default StatusSolicitacoes;
