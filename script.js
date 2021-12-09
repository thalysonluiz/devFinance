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

const Transaction = {
  incomes() {

  },
  expenses() {

  },
  total() {

  }
}

const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -500,
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
]

const DOM = {
  addTransaction(transaction, index) {
    const tr = document.querySelector('tr');
    tr.innerHTML = DOM.innerHTMLTransaction()
  },
  innerHTMLTransaction() {
    const html = `
            <td class="description">Salário</td>
            <td class="income">R$ 5.000,00</td>
            <td>23/01/2021</td>
            <td><a href="#"><img src="./assets/minus.svg" alt="Remover Transação"></a></td>
    `

    return html;
  }
}