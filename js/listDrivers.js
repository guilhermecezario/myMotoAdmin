const routClient = database.child("motoristas");
var listClient = document.querySelector('#list');
var elementTotal = document.querySelector('#total');
var total = 0;

routClient.once("child_added", (data)=>{
  let client = data.val();
  total++;

  elementTotal.textContent = total;

  let clientTr = montarTr(client);

  listClient.appendChild(clientTr);
});

function montarTr(client){
  var clientTr = document.createElement('tr');
  clientTr.classList.add('item-table');
  if(client.avaliacao != 0){
    client.avaliacao = (client.avaliacao/client.corridas).toFixed(2);
  }
  clientTr.appendChild(montarTd(client.nome, "nome"));
  clientTr.appendChild(montarTd(client.corridas, "corridas"));
  clientTr.appendChild(montarTd(client.avaliacao, "avaliacao"));
  clientTr.appendChild(montarTd(client.cor, "cor"));
  clientTr.appendChild(montarTd(client.placa, "placa"));

  return clientTr;
}

function montarTd(dado, classe){
  var td = document.createElement('td');
  td.classList.add(classe);
  td.textContent = dado;

  return td;
}