
let errorTable, symbolTable, Arm64Editor, consoleResult, dotStringCst = "";
let errores2 = [];
/* let Arm64Editor, consoleResult = "";

$(document).ready(function () {
    Arm64Editor = editor('julia__editor', 'text/x-rustsrc');
    consoleResult = editor('console__result', '', false, true, false);
});
*/

//FUNCION PARA PARSEAR LA ENTRADA 
function check() {
    let output = "";
    output = document.getElementById("output").value;
    document.getElementById("editor").innerHTML = "";

    /*
        try {
           // document.getElementById("editor").innerHTML = JSON.stringify(PEG.parse(output));  //Lo devuelve como si fuese un JSON.
        document.getElementById("editor").innerHTML = PEG.parse(output); 
         } catch (err) {
        document.getElementById("editor").innerHTML = "Análisis Erróneo"
            document.getElementById("editor").innerHTML += "\n"+err;
        }
    
        */

}


//-----------------------------#verificacion de error


function isLexicalError(e) {
    const validIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
    const validInteger = /^[0-9]+$/;
    const validRegister = /^[a-zA-Z][0-9]+$/;
    const validCharacter = /^[a-zA-Z0-9_$,\[\]#"]$/;
    if (e.found) {
        if (!validIdentifier.test(e.found) &&
            !validInteger.test(e.found) &&
            !validRegister.test(e.found) &&
            !validCharacter.test(e.found)) {
            return true; // Error léxico
        }
    }
    return false; // Error sintáctico
}




const analysis = async () => {
    let text = "";
    text = document.getElementById("output").value;
    errores2 = []; // Limpiar los errores2 previos

    try {
        let resultado = PEG.parse(text);
        // Asigna el resultado al elemento donde deseas mostrar el resultado
        document.getElementById("editor").value = resultado.toString(); // Asegúrate de que "consoleResult" es el ID correcto del elemento de salida
        console.log("editor:", resultado);
    } catch (e) {
        if (e instanceof PEG.SyntaxError) {
            if (isLexicalError(e)) {
                tipoError = 'Error Léxico';
                // Asigna el mensaje de error léxico al elemento de salida
                document.getElementById("editor").value = 'Error Léxico: ' + e.message;
                console.log('Error Léxico:', e.message);
            } else {
                tipoError = 'Error Sintáctico';
                // Asigna el mensaje de error sintáctico al elemento de salida
                document.getElementById("editor").value = 'Error Sintáctico: ' + e.message;
                console.log('Error Sintáctico:', e.message);
            } errores2.push({
                descripcion: e.message,
                linea: e.location.start.line,
                columna: e.location.start.column,
                tipo: tipoError
            });
        } else {
            console.error('Error desconocido:', e);
        }
    }

    // Llenar la tabla de errores2
    ErrorReporte();
}





const btnAnalysis = document.getElementById('btnConsola');


btnAnalysis.addEventListener('click', () => analysis());










/* 
const analysis = async () => {
    const text = document.getElementById("output").value;
    console.log(text);
    try {
        let resultado = PEG.parse(text);
        console.log(resultado);
    } catch (error) {
        console.log(error.message);
    }
}*/
