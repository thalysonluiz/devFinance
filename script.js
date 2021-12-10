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
    amount: -50025,
    date: '23/01/2021',
  },
  {
    id: 2,
    description: 'Website',
    amount: 500000,
    date: '23/01/2021',
  },
  {
    id: 3,
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021',
  },
  {
    id: 4,
    description: 'Salvo',
    amount: 100000,
    date: '23/01/2021',
  },
]

const Transaction = {
  all: transactions,

  add(transaction) {
    Transaction.all.push(transaction);
    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);
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
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g, "")

    value = Number(value) / 100

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    return signal + value;
  },

  formatAmount(value) {
    value = value * 100;
    //value = Number(value.replace(/\,?\.?/g, "")) * 100;
    return Math.round(value);
  },

  formatDate(date) {
    const splitedDate = date.split("-");
    return `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`;
  }
}

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues();
    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date
    }
  },

  validateFields() {
    const { description, amount, date } = Form.getValues();

    if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {
      throw new Error("Pro favor, preencha todos os campos!");
    }
  },

  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },

  submit(event) {
    event.preventDefault();

    try {
      Form.validateFields();
      const transaction = Form.formatValues();
      //console.log(transaction);
      Transaction.add(transaction);

      Form.clearFields();
      Modal.close();

    } catch (error) {
      alert(error.message);
    }

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
    DOM.clearTransactions();
    App.init();
  }
}

App.init();
