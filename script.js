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
const database = firebase.database().ref();
const ref = database.child('motoristas');

let info = document.getElementById('info');
let user = document.getElementById('user');
	
	ref.on("child_added", data =>{
		dados = data.val();
		id = data.key;

		info.innerHTML += "<tr>"+
		"<th>"+dados.nome+"</th>"+
		"<th>"+dados.cor+"</th>"+
		"<th>"+dados.placa+"</th>"+
		"<th>"+"<img src="+dados.cnh_image+" style='width:20%'>"+"</th>"+
		"<th>"+"<button onclick='aceitar()'>Aceitar</button>"+
				"<button onclick='recusar()'>Recusar</button>"+"</th>"

		"</tr>";
	});

	function aceitar(){

	}

	function recusar(){

	}