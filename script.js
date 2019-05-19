var firebaseConfig = {
    apiKey: "AIzaSyCDYT2BuhNdydqwW0Qcxzaw9JVMgoX6qHc",
    authDomain: "motorista-2b269.firebaseapp.com",
    databaseURL: "https://motorista-2b269.firebaseio.com",
    projectId: "motorista-2b269",
    storageBucket: "motorista-2b269.appspot.com",
    messagingSenderId: "37710912222",
    appId: "1:37710912222:web:ce71413945776c8f"
};

firebase.initializeApp(firebaseConfig);
var items = document.getElementById('items');
var auth = firebase.auth();
const database = firebase.database().ref();
const refPed = database.child('pedidos');

let info = document.getElementById('info');
let user = document.getElementById('user');
	
function exibir(){
	info.innerHTML = "";
	info.innerHTML = "<tr><th>Nome</th><th>Cor da moto</th><th>Placa</th><th>CNH</th><th>Opções</th></tr>";

	refPed.on("child_added", data =>{
		dados = data.val();
		id = data.key;
		console.log("dados"+data);
		info.innerHTML += "<tr>"+
		"<th>"+dados
		"<th>"+dados.cor+"</th>"+
		"<th>"+dados.placa+"</th>"+
		"<th>"+"<img src="+dados.cnh_image+" style='width:20%'>"+"</th>"+
		"<th>"+"<button id="+id+" onclick='aceitar(this.id)'>Aceitar</button>"+
				"<button id="+id+" onclick='recusar(this.id)'>Recusar</button>"+"</th>"+
		"</tr>";
	});
}

	function aceitar(i){
		var refId = refPed.child(i);
		refId.on("value", data => {
				dados = data.val();
				console.log(dados);
			firebase.database().ref('motoristas/'+i).set({
				nome: dados.nome,
				cor: dados.cor,
				placa: dados.placa,
				cnh_image: dados.cnh_image
			}).then(function(){
				$.ajax({
					method: "POST",
					url: "./email/aceito.php",
					data: {
						email: dados.email,
						nome: dados.nome
					}
				}).done(function( msg ) {
					alert( "Data Saved: " + msg );
				});
				alert("Motorista aceito");
				refId.remove();
				exibir();
			});
		});
	}

	function recusar(i){
		var refId = refPed.child(i);
		refId.on("value", data => {
			dados = data.val();
			auth.signInWithEmailAndPassword(dados.email, dados.senha).then(function(){
				var user = firebase.auth().currentUser;
				user.delete().then(function(){
				console.log("usuario deletado");
				$.ajax({
					method: "POST",
					url: "./email/recusado.php",
					data: {
						email: dados.email,
						nome: dados.nome
					}
				}).done(function( msg ) {
					alert( "Data Saved: " + msg );
				});
				refId.remove()
				exibir();
			}).catch(console.log("não deletou"));
			}).catch(console.log("não conectou"));
		});
	}