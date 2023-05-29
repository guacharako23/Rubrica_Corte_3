import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {firebase} from './firebase'
import React from 'react'

function App() {
    //hooks
    const [Lista,setLista]=React.useState([])
    const [nombre,setNombre]=React.useState('')
    const [apellido,setApellido]=React.useState('')
    const [modoedicion,setmodoedicion]=React.useState(false)
    //Leer datos
    React.useEffect(()=>{
      const obtenerDatos=async()=>{
        try{
          const db=firebase.firestore()
          const data=await db.collection('usuarios').get()
          //console.log(data.docs);
          const arrayData=data.docs.map(doc=>({id:doc.id,...doc.data()}))
          setLista(arrayData)
        } catch (error){
          console.error(error);
        }

      }
      obtenerDatos()
    },[])

    //guardar
    const guardarDatos=async(e)=>{
      e.preventDefault()
      if(!nombre){
        alert("Ingrese el Nombre")
        return
      }
      if(!apellido){
        alert("Ingrese el Apellido")
        return
      }
      //registrar en firebase
      try {
        const db=firebase.firestore()
        const nuevoUsuario={nombre,apellido}
        const dato=await db.collection('usuarios').add(nuevoUsuario)
        setLista([
          ...Lista,
          {...nuevoUsuario,id:dato.id}
        ])

      }
      catch (error){
        console.error(error);
      }
    }

    //Eliminar

    const eliminarDato=async(id)=>{
      try {
        const db=firebase.firestore()
        await db.collection('usuarios').doc(id).delete()
        const listaFiltrada=Lista.filter(elemento=>elemento.id!==id)
        setLista(listaFiltrada)
      }
      catch (error){
        console.error(error);
      }
      
    }

    //editar
    const editar=(elemento)=>{
      setmodoedicion(true)//activamos el modo edicion
    }





  return (
    <div className='container'>
      <h2 className='text-center text-primary'>Registro de Usuarios</h2>
      <form onSubmit={guardarDatos}>
      <input type="text"
      placeholder='Ingrese el Nombre'
      className='form-control mb-2'
      onChange={(e)=>{setNombre(e.target.value.trim())}}
      
      />  
      <input type="text"
      placeholder='Ingrese el Apellido'
      className='form-control mb-2'
      onChange={(e)=>{setApellido(e.target.value.trim())}}
      />  
      <div className='d-grid gap-2'>
     
       

      </div>
      
      </form> 
      <h2 className='text-center text-primary'>Listado de Ususarios Registrados</h2>
      <ul className='list-group'>
        {
          Lista.map(
            (elemento)=>(
              <li className='list-group-item bg-info' key={elemento.id}>{elemento.nombre} {elemento.apellido} 
              <button 
              onClick={()=>eliminarDato(elemento.id)}
              className='btn btn-danger float-end me-2'>Eliminar</button>
              <button 
              onClick={()=>editar(elemento.id)}
              className='btn btn-warning float-end me-2'>Editar</button>
              </li>
            )

          )
        }

      </ul>


   
    </div>
  )
}

export default App