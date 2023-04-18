import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from "miragejs"
import { App } from './App';

createServer({

  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "title 1",
          type: "deposit",
          category: "cat test 1",
          amount: 6000,
          createdAt: new Date('2021-12-01 09:00:00')
        },
        {
          id: 2,
          title: "title 2",
          type: "withdraw",
          category: "cat test 2",
          amount: 550,
          createdAt: new Date('2022-02-01 09:00:00')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transaction', () => {
      return this.schema.all('transaction');
    });

    this.post('/transaction', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    });
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);