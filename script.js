const Modal = {
  open() {
    const modalOverlay = document.querySelector('.modal-overlay');
    modalOverlay.classList.add('active');
  },
  close() {
    const modalOverlay = document.querySelector('.modal-overlay');
    modalOverlay.classList.remove('active');
  }
}

const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -500.25,
    date: '23/01/2021',
  },
  {
    id: 2,
    description: 'Website',
    amount: 5000,
    date: '23/01/2021',
  },
  {
    id: 3,
    description: 'Internet',
    amount: -200,
    date: '23/01/2021',
  },
  {
    id: 4,
    description: 'Salvo',
    amount: 1000,
    date: '23/01/2021',
  },
]

const Transaction = {
  all: transactions,

  add(transaction) {
    Transaction.all.push(transaction);
    App.reload();
  },

  incomes() {
    let income = 0;
    Transaction.all.forEach(transaction => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    })
    return income;
  },

  expenses() {
    let expense = 0;
    Transaction.all.forEach(transaction => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    })
    return expense;
  },

  total() {

    return Transaction.incomes() + Transaction.expenses();
  }
}


const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);
    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const CssClass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CssClass}">${amount}</td>
            <td>${transaction.date}</td>
            <td><a href="#"><img src="./assets/minus.svg" alt="Remover Transação"></a></td>
    `

    return html;
  },

  updateBalance() {
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes());
    document.querySelector('#expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses());
    document.querySelector('#totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total());
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
  }
}

const Utils = {
  formatCurrency(value) {
    //const signal = Number(value) < 0 ? "-" : "";
    //value = value * 100;
    //Math.round(value);

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    return value;
  }
}

const App = {
  init() {
    Transaction.all.forEach(transaction => {
      DOM.addTransaction(transaction);
    });

    DOM.updateBalance();
  },

  reload() {
    Transaction.clearTransactions();
    App.init();
  }
}

App.init();
