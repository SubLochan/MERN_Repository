// Difficulty: very easy


function showTask() {
 const input = document.getElementById("taskInput");
 const output = document.getElementById("output");


 // ── TEACHING-BUG #2 (logic) ──
 output.innerHTML= input.value;

}


function makeBold() {
 const output = document.getElementById("output");
 output.style.fontWeight = "bold";
 output.style.color = "red";
}


function tryHTML() {
 const output = document.getElementById("output");
 output.innerHTML = "<b>" + output.innerText + "</b>";
}

function fun1(){
    let s = "Error";
    output.style.color = "violet";
    output.innerHTML = s;
}


function clearTask() {
 const output = document.getElementById("output");
 output.textContent = "";
}
