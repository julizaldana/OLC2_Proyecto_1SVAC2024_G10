
program
  = instructions

comment
  = _ ("//" [^\n]* / ";" [^\n]*)
  
instructions
	= (comment / instruction)*
    
instruction
	// aritmeticos 
	= _ op:"add "i rd:reg comma rs1:reg comma rs2:reg  //suma
 	/ _ op:"sub "i rd:reg comma rs1:reg comma rs2:reg  //resta
    / _ op:"mul "i rd:reg comma rs1:reg comma rs2:reg  //multiplicacion
    / _ op:"udiv "i rd:reg comma rs1:reg comma rs2:reg  //division sin signo
    / _ op:"sdiv "i rd:reg comma rs1:reg comma rs2:reg  //division con signo


	// logicos
	/ _ op:"and "i rd:reg comma rs1:reg comma rs2:reg 
	/ _ op:"orr "i rd:reg comma rs1:reg comma rs2:reg 
	/ _ op:"eor "i rd:reg comma rs1:reg comma rs2:reg
	/ _ op:"mvn "i rd:reg comma rs1:reg
	/ _ op:"cmp "i rd:reg comma rs1:reg
    
    // desplazamiento
	/ _ op:"lsl "i rd:reg comma rs1:reg comma numeral imm:imm //desplazamiento a la izq
	/ _ op:"lsr "i rd:reg comma rs1:reg comma numeral imm:imm  //desplazamiento a la der
	/ _ op:"asr "i rd:reg comma rs1:reg comma numeral imm:imm //desplazamiento arit. a la der
	/ _ op:"ror "i rd:reg comma rs1:reg comma numeral imm:imm  //rotacion de bits a la der.
    
    // load/cargar
	/ _ op:"ldr "i rd:reg comma imm:imm 
   	/ _ op:"ldrb "i rd:reg comma imm:imm
    / _ op:"ldp "i rd:reg comma imm:imm 
    
    // store/almacenar
	/ _ op:"str "i rd:reg comma imm:imm 
   	/ _ op:"strb "i rd:reg comma imm:imm
    / _ op:"stp "i rd:reg comma imm:imm     
    
    
    //saltos
	/ _ op:"b "i etiqueta
    	/ _ op:"bl "i etiqueta  //acepta asignacion de numeros directos
        / _ op: "ret "i etiqueta //acepta asignacion a etiquetas
    	/ _ op:"beq "i etiqueta 
    	/ _ op:"bne "i etiqueta 
    	/ _ op:"bgt "i etiqueta
    	/ _ op:"blt "i etiqueta   
    
    
	// pseudo
	/ _ op:"mov "i rd:reg comma rs:reg 
    	/ _ op:"mov "i rd:reg comma numeral imm:imm  //acepta asignacion de numeros directos
        / _ op: "mov "i rd:reg comma etiqueta //acepta asignacion a etiquetas
    	/ _ op:"nop"i _ 
    	/ end
     
reg "register"
  = _ ("zero"i / "x" [0-9]+ / "r" [0-9]+)
        
imm "integer"
	= _ i:[0-9]+

comma "comma"
	= _ "," 

numeral "numeral"
	= _ "#"

end "newline"
	= _ "\n"
    
etiqueta "etiqueta"
	= _ [a-zA-Z][a-zA-Z]*

_ "ignored"
	= [ \t]*
    
