import React, { useContext, useEffect, useState } from "react";
import { TransactionsContext } from "../../TransactionsContext";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";

import { Container } from "../Summary/styles";
interface Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  createdAt: string;
  type: string;
}

export function Summary(){
  const transactions = useContext(TransactionsContext);

  // const [income, setIncome] = useState(0);
  // const [outcomer, setOutcome] = useState(0);
  // const [result, setResult] = useState(0);

  // useEffect(() => {

  //   transactions.map(transaction => {

  //   });
  // }, [])

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{}</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>- R$50.00</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Entradas</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>R$ 950.00</strong>
      </div>
    </Container>
  )
}