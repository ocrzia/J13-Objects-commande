// ==============================
// 🌱 Sélection des éléments
// ==============================
const addBt = document.querySelector('.add');

// ==============================
// 🧠 Variables globales
// ==============================
const commandes = [];

// ==============================
// 🎊 Fonctionnalités
// ==============================
class Commande {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  totalPrice() {
    return this.price * this.quantity;
  }

  toString() {
    return `${this.quantity}x ${this.name} - Total ${(this.totalPrice()).toFixed(2)}€`;
  }
}

function reset() {
  document.querySelector('#name').value = "";
  document.querySelector('#price').value = "";
  document.querySelector('#quantity').value = "";
  document.querySelector('#name').focus();
}

function getTotalGlobal() {
  const total = commandes.reduce((acc, commande) => acc + commande.totalPrice(), 0);
  return total.toFixed(2);
}

function refreshCommandes() {
  const list = document.querySelector('.commande-list');
  list.innerHTML = ''; // 🔄 On vide tout

  commandes.forEach((commande, index) => {
    const div = document.createElement('div');
    div.classList.add('commande-card');
    div.textContent = commande.toString();

    // 🔥 Bouton de suppression
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.dataset.index = index;
    div.append(deleteBtn);
    list.append(div);
  });

  // 🔄 Mise à jour du total global
  document.querySelector('.total-global span').textContent = `${getTotalGlobal()}€`;
}

function deleteCommande(index) {
  commandes.splice(index, 1); // Supprime l’élément à cet index
  refreshCommandes(); // 🔁 Réaffichage complet
}

function addCommande(name, price, quantity) {
  if (!name || isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
    alert("Merci de remplir tous les champs correctement !");
    return;
  }

  const nouvelleCommande = new Commande(name, price, quantity);
  commandes.push(nouvelleCommande);
  refreshCommandes();
}

// ==============================
// 🧲 Événements
// ==============================
addBt.addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const price = parseFloat(document.querySelector('#price').value);
  const quantity = parseInt(document.querySelector('#quantity').value);

  addCommande(name, price, quantity);
  reset();
});

document.querySelector('.commande-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const index = parseInt(e.target.dataset.index);
    deleteCommande(index);
  }
});