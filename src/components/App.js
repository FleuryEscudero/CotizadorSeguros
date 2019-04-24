//Dependencias
import React, {Component} from 'react';
//Metodos
import { obtenerDiferenciaAnio,calcularMarca,obtenerPlan } from '../helper';
//Componentes
import Header from './Header';
import Formulario from './Formulario';
import Resumen from './Resumen';
import Resultado from './Resultado';




class App extends Component {


  state = {
    resultado:'',
    datos : {}
  }


  cotizarSeguro = (datos)=>{
   const {marca, year, plan} = datos;

   //Agregar una base de 2000,
   let  resultado =2000;
   
   //Obtener la diferencia de años y por cada año restar el 3%
   const diferencia = obtenerDiferenciaAnio(year);
   resultado -= ((diferencia * 3) * resultado/100);
 
      
   //Americano 15% Asiatico 5% y europeo 30% de incremento al valor actual
   resultado = calcularMarca(marca) * resultado;
   
   //plan basico incrementa el 20% cobertura completa 50%
   let incremento =  obtenerPlan(plan);
   resultado = parseFloat( incremento * resultado).toFixed(2);
  
    //objeto del resumen
    const datosAuto = {
      marca: marca,
      plan : plan,
      year: year
    }


   //resultado
   this.setState({
     datos : datosAuto,
     resultado: resultado,
   })

  
  }
  render (){

    return (
      <div className="contenedor">
        <Header
          titulo ='Cotizador de Seguro de Auto'/>
          <div className="contenedor-formulario">
            <Formulario
            cotizarSeguro={this.cotizarSeguro}
            />
            <Resumen
            
            datos = {this.state.datos}
            />
             <Resultado
            resultado = {this.state.resultado}
             
             />
          </div>
      </div>
    );
  }
}

export default App;
