var items = document.getElementById('items');
var auth = firebase.auth();

const refPed = database.child('pendentes');
var data = new Date;
let list = document.getElementById('list');
let user = document.getElementById('user');

function exibir() {
	list.innerHTML = "";

	refPed.on("child_added", data => {
		dados = data.val();
		id = data.key;
		console.log("dados" + data);
		list.innerHTML += "<tr>" +
			"<th class='th-body'>" + dados.nome + "</th>" +
			"<th class='th-body mt-h4'>" + dados.cor + "</th>" +
			"<th class='th-body'>" + dados.placa + "</th>" +
			"<th><img src=" + dados.cnh_image + " class='img-table'></th>" +
			"<th><button class='default-button iconContent-tableMotoDanger' id=" + id + " onclick='recusar(this.id)'><i class='fas fa-times'></i></button>" +
			"<button class='default-button iconContent-tableMotoSuccess' id=" + id + " onclick='aceitar(this.id)'><i class='fas fa-check'></i></button>" + "</th>" +
			"</tr>";
	});
}

function aceitar(i) {
	var refId = refPed.child(i);
	refId.on("value", data => {
		dados = data.val();
		firebase.database().ref('motoristas/' + i).set({
			nome: dados.nome,
			cor: dados.cor,
			placa: dados.placa,
			perfil: "",
			cnh_image: dados.cnh_image,
			corridas: 0,
			avaliacao: 0
		}).then(function () {
			alert("Motorista aceito");
			refId.remove();
			exibir();
		});
	});
}

function recusar(i) {
	var refId = refPed.child(i);
	refId.on("value", data => {
		dados = data.val();
		auth.signInWithEmailAndPassword(dados.email, dados.senha).then(function () {
			var user = firebase.auth().currentUser;
			console.log(user);
			user.delete().then(function () {
				console.log("usuario deletado");
				$.ajax({
					method: "POST",
					url: "email/recusado.php",
					data: {
						email: dados.email,
						nome: dados.nome
					}
				}).done(function (msg) {
					alert("Data Saved: " + msg);
				});
				refId.remove()
				exibir();
			}).catch(console.log("não deletou"));
		});
	});
}