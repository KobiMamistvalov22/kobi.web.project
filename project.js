let uName = "";
let toDos = [];
let uPass = "";

$(()=>{
	$('#loginBtn1').click(()=>{
		$('#alert').modal();
		const toggle=()=>{
			$('#loginCard').toggle(500);
			$('#registCard').toggle(500);
		};
		$('#regBtn1').click(()=>{
			toggle();
		});
		$('#loginBtn3').click(()=>{
			toggle();
		});
	});

	const uName = localStorage.getItem("loginUser");
	const uPass = localStorage.getItem("loginUserPass");

	if (uName && uPass) {
		document.getElementById('user').value = uName;
		document.getElementById('pass').value = uPass;
		check();
	}

	$('.close').click(()=>{
		$('#alert').modal('hide');
	});
});
function store() {
	const uName = userName.value;
	const pass = password.value;

	if(uName.includes('@') && pass.length > 0){
		const userDetails = JSON.parse(localStorage.getItem(uName));
		if(userDetails){
			alert("This email exists");
			return;
		}
		
		
		const user = {
			pass: pass,
			toDos: []
		};

		localStorage[uName] = JSON.stringify(user);
		userName.value = "";
		password.value = "";
		alert('success!');
	
		
	}else {
		alert("Your email or password is wrong");
	}
};
function check() {
    const usrName = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;
	const userDetails = JSON.parse(localStorage.getItem(usrName));
	
    // check if stored data from register-form is equal to data from login form
    if(userDetails && userDetails.pass === pass) {
		uName = usrName;
		toDos = userDetails.toDos;
		uPass = pass;
		

		localStorage["loginUser"] = uName;
		localStorage["loginUserPass"] = uPass;

		$('#alert').modal('hide');
		$("#section1").hide();
		$("#logi").hide();
		$("#logo").removeAttr('hidden', false);
		$('#section2').attr('hidden', false);		
		updateNoteDisplay();
    }else if(userDetails && userDetails.uPass === pass){
		uName = usrName;
		toDos = userDetails.toDos;
		uPass = pass;
		

		localStorage["loginUser"] = uName;
		localStorage["loginUserPass"] = uPass;

		$('#alert').modal('hide');
		$("#section1").hide();
		$("#logi").hide();
		$("#logo").removeAttr('hidden', false);
		$('#section2').attr('hidden', false);		
		updateNoteDisplay();
	}else {
        alert('not')
	}
	
	$('#addNote').click(()=>{
		$('#addNoteForm').removeAttr('hidden');
	});

	$('#delNote').click(()=>{
		$('#textNote').val("");
		$('#titleNote').val("");
		$("#addNoteForm").attr("hidden",'hidden');
		updateNoteDisplay();
	});

	$('#saveNote').click(()=>{
		toDos.push({
			titleNote: $('#titleNote').val(),
			textNote: $('#textNote').val()
		});
		const userDetails = {
			pass: uPass,
			toDos: toDos
		};

		localStorage[uName] = JSON.stringify(userDetails);
		$('#textNote').val("");
		$('#titleNote').val("");
		
		$("#addNoteForm").attr("hidden",'hidden');
		updateNoteDisplay();
	});
};
function updateNoteDisplay(){ 
	$('#displayNote').removeAttr('hidden');

	const userDetails =  JSON.parse(localStorage.getItem(uName));

	if(userDetails) {
		const notes = userDetails.toDos;
		$('#displayNote').empty();
		for(const [index, value] of notes.entries()){
			$("#displayNote").append(createNote(value.titleNote, value.textNote, index));
		}
	}
}

function createNote(title, content, index) {
	//div
	const note = newElem('div');
	//h5 title
	const ttl = newElem('h5');
	ttl.className = "mosheTtl";
	ttl.setAttribute("index", index);
	ttl.textContent = title;
	//p content
	const cont = newElem('p');
	cont.setAttribute("index", index);
	cont.setAttribute('hidden',true);
	cont.textContent = content;
	cont.className = "omerCont";
	ttl.addEventListener('click', () =>{
		cont.hidden = !cont.hidden;
	})
	//button del
	//button edit
	const delBtn = newElem('button');
	delBtn.className = "btn btn-danger";
	delBtn.setAttribute("index", index);
	delBtn.textContent="Del";
	delBtn.addEventListener('click', (event) => {
		const index = event.target.getAttribute("index");
		//const delit = JSON.parse(localStorage[uName]);
		toDos.splice(index, 1);
		localStorage[uName] = JSON.stringify({
			uPass: uPass,
			toDos: toDos
		});
		
		updateNoteDisplay()
	});
	
	const editBtn = newElem('button');
	editBtn.className = "btn btn-primary";
	editBtn.setAttribute("index", index);
	editBtn.textContent="Edit";
	
	editBtn.addEventListener('click', (event) => {
		const index = event.target.getAttribute("index");
		
		//show edit form with note data
		//updateNoteDisplay();
		showEditForm(note, index);
	});
	
	
	note.appendChild(ttl);
	note.appendChild(cont);
	note.appendChild(delBtn);
	note.appendChild(editBtn);
	
	return note;
}

function newElem(name) {
	return document.createElement(name);
}

function showEditForm(note, index){
	//show form (modal)
	//set input & text area value's to parameters 
	//set event lisener to save Btn
	const newEditForm = $('#editForm');
	newEditForm.attr("index", index);
	newEditForm.attr('hidden', false);
	newEditForm.find("#cancel").attr('index', index);
	newEditForm.find("#editDone").attr('index', index);
	//newEditForm.appendTo(note);
	
	$("#cancel").click((event) => {
		const index = event.target.getAttribute("index");
		$('#newTitleNote[index=' + index + ']').val("");
		$('#newTextNote[index=' + index + ']').val("");
		$('#editForm[index=' + index + ']').attr('hidden', true);
	});
	
	$("#editDone").click((event) => {
		const index = event.target.getAttribute("index");
		//const done = JSON.parse(localStorage[uName]);
		const task = {
			titleNote: $('#newTitleNote').val(),
			textNote: $('#newTextNote').val()
		};
		toDos.splice(index, 1, task);
		localStorage[uName] = JSON.stringify({
			uPass: uPass,
			toDos: toDos
		});
		$('#editForm[index=' + index + ']').attr('hidden', true);
		updateNoteDisplay();
	});
	
}

function logout(){
	localStorage.removeItem("loginUser");
	localStorage.removeItem("loginUserPass");
	location.reload();
}










