import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";
import { TransactionsContext } from "../../TransactionsContext";

export function TransactionsTable() {
  const { transactions } = useContext(TransactionsContext);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ id, title, type, category, amount, createdAt }) => {
            return (
              <tr key={id}>
                <td>{title}</td>
                <td
                  className={type}>
                  {
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(amount)
                  }
                </td>
                <td>{category}</td>
                <td>
                  {
                    new Intl.DateTimeFormat('pt-BR').format(new Date(createdAt))
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}