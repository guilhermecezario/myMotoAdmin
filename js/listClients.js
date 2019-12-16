const routClient = database.child("usuarios");
var listClient = document.querySelector('#list');
var elementTotal = document.querySelector('#total');
var total = 0;

routClient.once("value", (data) => {
  data.forEach(element => {
    let client = element.val();

    total++;

    elementTotal.textContent = total;

    let clientTr = document.createElement('tr');
    clientTr.classList.add('item-table');

    let clientTd = document.createElement('td');
    clientTd.classList.add('nome');
    clientTd.textContent = client.name;

    clientTr.appendChild(clientTd);
    listClient.appendChild(clientTr);
  });
});