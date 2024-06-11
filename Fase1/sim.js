let Arm64Editor, consoleResult = "";

$(document).ready(function () {
    Arm64Editor = editor('julia__editor', 'text/x-rustsrc');
    consoleResult = editor('console__result', '', false, true, false);
});


function check() {
    let output = "";
    output = document.getElementById("output").value;
    document.getElementById("editor").innerHTML = "";
    try {
        document.getElementById("editor").innerHTML = JSON.stringify(PEG.parse(output));  //Lo devuelve como si fuese un JSON. 
     } catch (err) {
        document.getElementById("editor").innerHTML = err;
    }
}

const analysis = async () => {
    const text = document.getElementById("output").value;
    console.log(text);
    try {
        let resultado = PEG.parse(text);
        console.log(resultado);
    } catch (error) {
        console.log(error.message);
    }
}