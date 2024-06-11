let errores = []
let tokens = []
let cuerpoAst = "";
let cuerpoTable = [];


async function loadFile(file) {
    let text = await file.text();
    document.getElementById('output').value = text;
}



//-----------------------------#MANEJO DE PESTAÑAS
let pestañas = [];
        let contadorPestañas = 1;
        let indice = 0;

        if (pestañas.length == 0) {
            pestañas.push(document.getElementById('output').value);
        }

        function addPestaña() {
            if (pestañas.length >= 1) {
                pestañas.push(document.getElementById('output').value);
                indice = pestañas.length - 1;
                document.getElementById('output').value = "";
                renderTabs();
            }
        }

        function delPestaña() {
            if (pestañas.length > 1) {
                pestañas.splice(indice, 1);
                if (indice > 0) {
                    indice--;
                }
                renderTabs();
                document.getElementById("output").value = pestañas[indice];
            }
        }

        function renderTabs() {
            const divPestañas = document.getElementById('div-pestañas');
            divPestañas.innerHTML = '';
            pestañas.forEach((_, i) => {
                const button = document.createElement('button');
                button.className = 'pes';
                if (i === indice) {
                    button.classList.add('selected');
                }
                button.textContent = i + 1;
                button.onclick = () => selectAndGoToTab(button, i);
                divPestañas.appendChild(button);
            });
        }

        function selectAndGoToTab(button, index) {
            // Quita la clase 'selected' de todos los botones
            const buttons = document.querySelectorAll('.pes');
            buttons.forEach(btn => btn.classList.remove('selected'));

            // Añade la clase 'selected' al botón clicado
            button.classList.add('selected');

            // Cambia a la pestaña deseada
            irPestaña(index);
        }

        function irPestaña(index) {
            // Guardar cambios de la pestaña actual antes de cambiar
            pestañas[indice] = document.getElementById("output").value;
            indice = index;
            // Cambiar a la pestaña deseada
            document.getElementById("output").value = pestañas[index];
        }

        function loadPestaña() {
            pestañas[indice] = document.getElementById("output").value;
        }

        function guardarArchivo() {
            const contenido = document.getElementById('output').value;
            console.log(contenido);
            const nombre = 'archivo.txt';
            guardarArchivos(contenido, nombre);
        }

        function guardarArchivos(contenido, nombre) {
            const a = document.createElement("a");
            const archivo = new Blob([contenido], { type: 'text/plain' });
            const url = URL.createObjectURL(archivo);
            a.href = url;
            a.download = nombre;
            a.click();
            URL.revokeObjectURL(url);
        }

        const download = (name, content) => {
          let blob = new Blob([content], {type: 'text/plain;charset=utf-8'})
          let link = document.getElementById('download');
          link.href = URL.createObjectURL(blob);
          link.setAttribute("download", name)
          link.click()
      }




//-----------------------------#MANEJO DE REPORTES
function actualizar(){
  const codigo = document.getElementById('output').value // Obtener el código del textarea
  fetch("http://localhost:5000/interpreter", {
    method: "POST",
    body: JSON.stringify({ code: codigo }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
  .then((data) => {
    const consola = document.getElementById("editor");
    consola.value = data.console; // Mostrar la respuesta en el textarea
    console.log(data.console);
    //this.showAst(data.ast)
    //cuerpoAst = data.ast;
    cuerpoTable = data.tabla_simbolos;
    //symTable = data.Tsimbol;
    //console.log(data.Tsimbol)
    //console.log(data.errores)
    //tokens = data.VToken;
    errores = data.errores
    console.log(errores)
    console.log(cuerpoTable)
    //localStorage.setItem("errores",JSON.stringify(data.errores));
    
  })
  .catch((error) => console.error(error));
}

//-----------------------------#MANEJO DE ARCHIVOS

function ErrorReporte(){
  this.ocultar("consola","ERRORES");
  let cuerpo = "";
  console.log(errores)
  if(errores != "ninguno"){
    console.log(errores.length)
  for(var i = 0; i < errores.length; i++){
    let cadena = errores[i].toString();
    let columnas = cadena.split(","); 
    cuerpo += `

    <tr>
      <td>${i}</td>
      <td>${columnas[0]}</td>
      <td>${columnas[1]}</td>
      <td>${columnas[2]}</td>
      <td>${columnas[3]}</td>
    </tr>
`;
  }
  $('#studentsTable tbody').html(cuerpo)
  }
  
}


function TablaReporte(){
  this.ocultar("consola","TablaS");
  console.log(cuerpoTable)
  let cuerpo = "";
  if(cuerpoTable != "ninguno"){
    console.log(cuerpoTable.length)
  for(var i = 0; i < cuerpoTable.length; i++){
    let cadena = cuerpoTable[i].toString();
    let columnas = cadena.split(","); 
    let tipo=""
    if (columnas[2] == 0){
      tipo = "number"
    }else if(columnas[2] == 1){
      tipo = "float"
    }else if(columnas[2] == 2){
      tipo = "string"
    }else if(columnas[2] == 3){
      tipo = "boolean"
    }else if(columnas[2] == 4){
      tipo = "array"
    }else if(columnas[2] == 5){
      tipo = "struct"
    }else if(columnas[2] == 6){
      tipo = "null"
    }else if(columnas[2] == 7){
      tipo = "char"
    }else if(columnas[2] == 8){
      tipo = "matrix"
    }
    cuerpo += `

    <tr>
      <td>${columnas[0]}</td>
      <td>${columnas[1]}</td>
      <td>${tipo}</td>
      <td>${columnas[3]}</td>
      <td>${columnas[4]}</td>
      <td>${columnas[5]}</td>
    </tr>
`;
  }
    $('#SymbolTable tbody').html(cuerpo)
  }
}

function hideErrores(){
  this.ocultar("ERRORES", "consola")
}

function hideTable(){
  this.ocultar("TablaS", "consola")
}

function ocultar(sec1, sec2){
  const secConsola = document.getElementById(sec1);
  secConsola.hidden = true;
  const secErrores = document.getElementById(sec2);
  secErrores.hidden = false;
}