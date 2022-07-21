console.log('Conexion establecida')

/*Manejo de 30 segundos al cambio de un pokemon*/
setTimeout('document.location.reload()',30000)

document.addEventListener('DOMContentLoaded', () =>{
  const aleatorio = getRandomInt(1, 649)
  datosApi(aleatorio)
})

/*Manejo de numeros aleatorios para obtener pokemones aleatorios*/
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}


/*Obtencion de los datos de la API haciendo uso del numero aleatorio para obtener diferente pokemon*/
const datosApi = async (id) => {
  /*Manejo de errores con un try catch*/
  try{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const datos = await res.json()

    console.log(datos);
/*Objeto creado para datos del pokemon obtenidos de la API*/
     const pokemon = {
      img: datos.sprites.other.dream_world.front_default,
      nombre: datos.name,
      hp: datos.stats[0].base_stat,
      attack: datos.stats[1].base_stat,
      defense: datos.stats[2].base_stat
    }
/*Ejecucion de la funcion para mostrar los datos en la pagina*/
    colocarCard(pokemon)

  }catch (error){
    console.log(error);
  }

}

/* Creacion de funcion para colocar los datos 
en la CARD en la estructura HTML como imagen, nombre, etc. del pokemon*/
const colocarCard = (pokemon) => {
  console.log(pokemon)

  const menu = document.querySelector('.menu')
  const template = document.querySelector('#template-card').content
  const clone = template.cloneNode(true)
  const segment = document.createDocumentFragment()

  clone.querySelector('.tarjeta-imagen').setAttribute('src', pokemon.img) 
  clone.querySelector('.card-title').innerHTML = `${pokemon.nombre}`
  clone.querySelectorAll('.card-text')[0].textContent = pokemon.hp + ' Hp'
  clone.querySelectorAll('.card-text')[1].textContent = pokemon.attack + ' Attack' 
  clone.querySelectorAll('.card-text')[2].textContent = pokemon.defense + ' Defense' 

/*Posicinamos toda la tarjeta en el nodo creado en la etiqueta HTML con clase menu*/
  segment.appendChild(clone)
  menu.appendChild(segment)


}
