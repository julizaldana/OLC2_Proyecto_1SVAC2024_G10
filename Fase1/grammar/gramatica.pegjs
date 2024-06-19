/*{
  class CST {
    constructor() {
      this.text = [];
    }

    addNode(node) {
      this.text.push(node)
    }

    getOutput(){
      return this.text.join()
    }
  }
}
*/

Start
  = gs:GlobalSection _ ds:DataSection? _ ts:TextSection ds2:DataSection? db:BssSection? { return "Análisis Correcto"; } 
  
  // gs:GlobalSection _ ts:TextSection _ ds:DataSection? { return "Análisis Correcto"; }

GlobalSection
  = ".global"i _ ID _
	/ Comment _ ".global"i _ ID _
DataSection //Seccion .data
  = Section? _ Data? _ dec:Declarations*
  
TextSection //Seccion .text
  = Section? _ Text? _ Strt ":" _ ins:Instructions*
  

BssSection //La sección .bss se utiliza para declarar variables globales y estáticas que se inicializan a cero antes de la ejecución del programa.
  = Section? _ Bss? _ dec:Declarations*

Comment
  = SingleLineComment
  / MultiLineComment

SingleLineComment
  = _ "//"i [^\n]*

MultiLineComment
  = _ "/*"i (!"*/" .)* "*/"
	 
Section
   = _ ".section"

Text
  = _ ".text"
  
Data
  = _ ".data"
  
Bss
  = _".bss"
  
Strt
 = _ "_start" 

Instructions
  = ins:Load _
  / ins:Store _
  / ins:Arithmetic _
  / ins:Logic _
  / ins:Rotation _
  / ins:Jumps _
  / ins:Move _
  / ins:Comment _
  / ins:Callsys _
  / ins:Etiquetas _

Load //cargar datos
  = "LDR"i _ reg1:register COMA _ CIZQ reg2:Value CDER
  / "LDR"i _ reg1:register COMA _ '=' _ ID 
  / "LDRB"i _ reg1:register COMA _ CIZQ reg2:register CDER
  / "LDP"i _ reg1:register COMA _ reg2:register COMA _ CIZQ reg3:register CDER

Store //almacenar datos
  = "STR"i _ reg1:register COMA _ CIZQ reg2:Value CDER
  / "STRB"i _ reg1:register COMA _ CIZQ reg2:register CDER
  / "STP"i _ reg1: register COMA _ reg2:register COMA _ CIZQ reg3:register CDER

Arithmetic //operaciones aritmeticas
  = "ADD"i _ reg1:Value COMA _ reg2:Value COMA _ reg3:Value { //suma
  /*  let Cst = new CST();
    Cst.addNode(`Arithmetic -> ADD;`)
    Cst.addNode(`Arithmetic -> ${reg1}1;`)
    Cst.addNode(`Arithmetic -> COMA1;`)
    Cst.addNode(`Arithmetic -> ${reg2}2;`)
    Cst.addNode(`Arithmetic -> COMA2;`)
    Cst.addNode(`Arithmetic -> ${reg3}3;`)
    return Cst*/
  }
  / "SUB"i _ reg1:Value COMA _ reg2:Value COMA _ reg3:Value //resta
  / "MUL"i _ reg1:Value COMA _ reg2:register COMA _ reg3:Value //multiplicacion
  / "UDIV"i _ reg1:Value COMA _ reg2:register COMA _ reg3:Value //division sin signo
  / "SDIV"i _ reg1:Value COMA _ reg2:register COMA _ reg3:Value //division con signo


Value //valor registro o integer
 = reg3:register 
 / '#' _ integer
 / reg3:pilaregister
 / _ integer



Logic //operaciones logicas
  = "AND"i _ reg1:register COMA _ reg2:register COMA _ reg3:register // and bit a bit
  / "ORR"i _ reg1:register COMA _ reg2:register COMA _ reg3:register //or bit a bit
  / "EOR"i _ reg1:register COMA _ reg2:register COMA _ reg3:register //xor bit
  / "MVN"i _ reg1:register COMA _ reg2:register //not bit
  / "CMP"i _ reg1:register COMA _ reg2:Value //counter comparison



Rotation //Rotaciones y desplazamientos
  = "LSL"i _ reg1:register COMA _ reg2:register COMA _ "#" _ integer //desplazamiento logico a la izq.
  / "LSR"i _ reg1:register COMA _ reg2:register COMA _ "#" _ integer //desplazamiento logico a la der.
  / "ASR"i _ reg1:register COMA _ reg2:register COMA _ "#" _ integer //desplazamiento arit. a la der.
  / "ROR"i _ reg1:register COMA _ reg2:register COMA _ "#" _ integer //rotacion de bits a la der.

Jumps  //Saltos
  = "BEQ"i _ ID    // salta si es igual (Z=1)
  / "BNE"i _ ID    // salta si no es igual (Z=0)
  / "BGT"i _ ID    // salta si es mayor (flags Z=0 y N=V)
  / "BLT"i _ ID    // salta si es menor
  / "BL"i _ ID     // salta a una subrutina y guarda la dir.
  / "B"i _ ID      // salta a una etiqueta
  / "RET"i _ ID    // retorna de una subrutina
  / "RET"i


Move //cargar registros
 = "MOV"i _ reg1:register COMA _ reg2:register
 / "MOV"i _ reg1:register COMA _ "#" _ integer //valores inmediatos enteros
 / "MOV"i _ reg1:register COMA _ integer 
 / "MOV"i _ reg1:register COMA _ "#" _ "'" _ ID _ "'" 	//valoresa ascii
 / "MOV"i _ "#" _ integer //llamada al sistema para salir del programa


Callsys //llamada al sistema
 = "SVC"i _ Value


Declarations //declaracion de etiqueta
  = id:ID ":" _ typev _ (integer / string) _?

Etiquetas
 = id:ID ":" _ ins:Instructions+

register
= ( "x" [0-9]+ / "w" [0-9]+ / "X" [0-9]+ /  "W" [0-9]+)

pilaregister
	= reg: "SP" _

COMA = "," _

CIZQ = "[" _

CDER = "]" _

integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

ID
  = id:([a-zA-Z_$][a-zA-Z0-9_$]*) _ { 
    return id; 
  }
  
numeral "numeral"
	= _ "#"

string "string"
  = "\"" chars:[^\"]* "\"" _ { return chars.join(""); }

_ "whitespace"
  = [ \t\n\r]*
 
 //tipos
 typev 
  = _ ".word"
  / _ ".half"
  / _ ".byte"
  / _ ".asciz"
  / _ ".ascii"
  / _ ".skip"
  / _ ".float"
  / _ ".space"
