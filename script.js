
const grid=document.getElementById('grid')


let emoji=['🐷', '🐶', '🐸', '🐮', '🐭', '🐱', ]

let matrizSize;
let itemSize;

//DEVUELVE EMOJI SUELTO

const randomItems =() => {


    let emojiRandom=emoji[Math.floor(Math.random()*emoji.length)]

    return emojiRandom
    //console.log(emojiRandom)
}


//INTERCAMBIA ANIMALITOS

let selectedElement = null;
let clickedElement = null;

const clickItem = (e) => {

    if (selectedElement == null) {
    // Si no hay elemento seleccionado, almaceno el target del evento como elemento seleccionado.
        selectedElement = e.target;

    } else if (selectedElement != null) {

    // Si ya tengo un elemento seleccionado
    // Guardo el elemento clickeado
        clickedElement = e.target;

       
        if(isAdjacentItem(selectedElement, clickedElement)){

            switchCell(selectedElement,clickedElement)
            
            selectedElement = null;
            clickedElement = null;

        } else {
            const aux=clickedElement;
            clickedElement=null;
            selectedElement=aux;
            //console.log('NO');
        }

        
    }
};

// ###### Función que genera la grilla
const generateGrid =(matrizSize, itemSize)=> {

    for(let row=0; row<matrizSize; row++){

        for(let column=0; column<matrizSize; column++){
            
            const celda = document.createElement('div');

            celda.style.width = `${itemSize}px`;
            celda.style.height = `${itemSize}px`;

            celda.style.position = 'absolute';
            celda.style.left = `${column*itemSize}px`;
            celda.style.top = `${row*itemSize}px`;
            //celda.style.border = '1px solid #000';
            celda.classList.add('cell')

            //para ver coordenadas
            //celda.innerText=`${row} ${column}`

            celda.style.textAlign= 'center'
            celda.style.verticalAlign='center'
            celda.style.fontSize='30px';

           celda.innerText=randomItems()

            celda.setAttribute('data-x', row);
            celda.setAttribute('data-y', column);

            celda.addEventListener("click", clickItem);

            grid.appendChild(celda);
    }
}
}

//GENERA EL TAMAÑO DE LA GRILLA
//######### ELEGIR DIFICULTAD DE JUEGO ········

const selectLevel = () => {
    swal({
        title: 'Nuevo Juego',
        buttons: {
            facil: {
                text: 'Fácil',
                value: 'facil',
                className: 'btn-play',
            },
            medio: {
                text: 'Medio',
                value: 'medio',
                className: 'btn-play',
            },
            dificil: {
                text: 'Difícil',
                value: 'dificil',
                className: 'btn-play',
            },
        },
    }).then((value) => {
    switch(value) {

        case 'facil':
            matrizSize=9
            itemSize=56
            generateGrid(matrizSize, itemSize);
            searchMatches();
            break;
            
        case 'medio':
            matrizSize=8
            itemSize=63
            generateGrid(matrizSize, itemSize);
            searchMatches();
            break;
            
        case 'dificil':
            matrizSize=7
            itemSize=72
            generateGrid(matrizSize, itemSize);
            searchMatches();
            break;

        default:
            swal({icon:'error'});
            selectLevel();
        }
            
    });
            
};
//######### MENSAJE DE INICIO ········

    Swal.fire({
        title: '¡Bienvenida!',
        html: '<p class="modal">En MatcheADAs tu objetivo es juntar tres o más ítems del mismo tipo,ya sea en fila o columna. Para eso, selecciona un ítem y a continuación un ítem adyacente para intercambiarlos de lugar.<br>Si se forma un grupo, esos ítems se eliminarán y ganarás puntos.¡Sigue armando grupos de 3 o más antes de que se acabe el tiempo!</p><br><span class="modal">CONTROLES</span><p class="modal">Click izquierdo: selección</p><p class="modal">Enter o Espacio: selección</p><p class="modal">Flechas o WASD: movimiento e intercambio</p>',
        confirmButtonText: 'JUGAR',
        padding:'1rem',
        backdrop:true,
        customClass: {
            confirmButton: 'btn-play'
        },
        showConfirmButton: true,
        confirmButtonColor: '#f87372',
        confirmButtonAriaLabel: 'Iniciar el juego',

    }).then(() => {
        selectLevel();
    });




    // // ######### TIMER
    // //está en window por ahora. Cuando tengamos el sweet alert tenemos que cambiar y poner un evento de click en el boton de empezar.  Lo mismo con el if en duration <= 0, que debe saltar la ventana y no reiniciar
    // let duration = 30;
    // let timer = document.getElementById("timer");
    // window.setInterval(function(){
    //   timer.innerHTML = duration;
    //   duration--; //aqui es solo para descir que debe decrementar. si ponemos ++ seria un contador de tiempo.
    //   duration = duration < 10 ? "0" + duration : duration; // eso es solo estético, para que quede con dos algarismo cuando los numeros sean menores que 10.
    //   if (duration <= 0){
    //     window.location.reload();
    //   }
    // },1000); // esos 1000 son equivalentes a un segundo, ellos es que dicen que a cada segundo debe cambiar lo que vemos en pantalla.

    let selectedItem = null;

    const isAdjacentItem = (a, b) => {

        const aX= Number(a.dataset.x);
        const aY= Number(a.dataset.y);
        const bX= Number(b.dataset.x);
        const bY= Number(b.dataset.y);


        if(aX === bX){

           return (aY === bY - 1) || (aY === bY + 1);

        } else if (aY === bY){

            return (aX === bX -1) || (aX === bX +1);

        }
        
        return false;

    }

const switchCell = (a,b) =>{

     //Almaceno en variable auxiliar el elemento clickeado
    const auxTop= b.style.top;
    const auxLeft=b.style.left;
    
    // Seteo como animalito del elemento clickeado el del elemento seleccionado la primera vez
    b.style.top=a.style.top;
    b.style.left=a.style.left;
   
    // // Seteo como el animalito del elemento seleccionado la primera vez como el del elemento clickeado la segunda vez
    a.style.top=auxTop;
    a.style.left=auxLeft;

    //Actualizo coordenadas
    let aux1DataX=a.getAttribute('data-x');
    let aux1DataY=a.getAttribute('data-y');
    let aux2DataX=b.getAttribute('data-x');
    let aux2DataY=b.getAttribute('data-y');

    a.setAttribute('data-x', aux2DataX)
    b.setAttribute('data-x', aux1DataX)
    a.setAttribute('data-y', aux2DataY)
    b.setAttribute('data-y', aux1DataY)
    
    searchMatches()


}

const searchVerticalMatch = () => {
  let isBlock = false;
  let ejeY = 0;
  let ejeX = 0;
  let column;
  let initialEjeY = 0;
  let finalEjeY = 0;


  // console.log('*** ejeX *** ', ejeX)
  // console.log('*** matrizSize *** ', matrizSize)
  // console.log('*** isBlock *** ', isBlock)
  // console.log('*** ejeY < matrizSize *** ', ejeY < matrizSize)
  while (ejeY < matrizSize && !isBlock) {
    column = document.querySelectorAll(`[data-y='${ejeY}']`)
    // console.log('*** column *** ', column)
    initialCell = column[ejeX];
    ejeX = 0;
    while (ejeX < matrizSize - 3 && !isBlock) {
      // console.log('*** column[ejeX] *** ', column[ejeX].innerText)
      // console.log('*** column[ejeX + 1] *** ', column[ejeX + 1].innerText)
      // console.log('*** column[ejeX + 2] *** ', column[ejeX + 2].innerText)
      console.log('*** column[ejeX].innerText === column[ejeX + 1].innerText === column[ejeX + 2].innerText *** ', column[ejeX].innerText === column[ejeX + 1].innerText === column[ejeX + 2].innerText)
      console.log('*** column[ejeX].innerText *** ', column[ejeX].innerText)
      isBlock = (column[ejeX].innerText === column[ejeX + 1].innerText) && (column[ejeX].innerText === column[ejeX + 2].innerText)
      if (isBlock) {
        column[ejeX].classList.add('remove')
        column[ejeX + 1].classList.add('remove')
        column[ejeX + 2].classList.add('remove')
        initialEjeX = ejeX;
        ejeX = ejeX + 2;
      } else {
        ejeX++;
      }
    }
    if (isBlock) {
      while (ejeX < matrizSize && column[ejeX].innerText === column[initialEjeX].innerText) {
        column[ejeX].classList.add('remove')
        ejeX++;
      }
      finalEjeX = ejeX
    };
    // console.log('*** ejeY *** ', ejeY)
    // console.log('*** isBlock *** ', isBlock)
    ejeY++;
  }

  console.log('*** isBlock *** ', isBlock)
  // console.log('*** columna *** ', ejeX)
  // console.log('*** columnaInicial *** ', initialEjeY)
  // console.log('*** columnaFinal *** ', finalEjeY)
  return isBlock;

}

// const searchVerticalMatch = () => {

//     for(let i = 0; i < matrizSize; i++) {
//       const column = document.querySelectorAll(`[data-y='${i}']`)
//       let previous; 
//       let found=0;
//       let times=3 
//       let itemsFound; 

//       //column[i].classList.add('remove')
        
//         for(let j = 0; j < column.length; j++) {
            
//             // column[j].classList.add('remove')
            

//             if(column[j].innerText === previous) {
//                 console.log("+++previus++++",previous)
//                 found++
//                 itemsFound = itemsFound + column[j].innerText;
//                 console.log(itemsFound)
//                 column[j].classList.add('remove')
                
//             } else {
//                 found=1
//                 itemsFound = column[j].innerText;
//                 column[j].classList.remove('remove')
//             }
            
            

//             if(found>=times){
                    
//                 //return true;
//                 console.log(true)
                    
                    
//             } else {
                
//                 console.log(false)
//             }
                
//             previous=column[j].innerText
            


//     }
        
//  }

// }

const searchHorizontalMatch = () => {

    for(let i = 0; i < matrizSize; i++) {
  
            const row = document.querySelectorAll(`[data-x='${i}']`)
            let previous; 
            let found=0;
            let times=3 
            let itemsFound; 

      
        for(let j = 0; j < row.length; j++) {
          
        
            if(row[j].innerText === previous) {

                found++
                itemsFound = itemsFound + row[j].innerText;
                console.log(itemsFound)
                
            } else {
                found=1
                itemsFound = row[j].innerText;
            }
            
           if(found>=times){
                        
            
                    console.log(true)
                    
                    
            } else {

                    console.log(false)
                }
            
            previous=row[j].innerText

            

    }

 }

}


  const searchMatches = () => {

    searchVerticalMatch();
    searchHorizontalMatch()

    setTimeout(() => {
                remover()
            }, 4000)

}



const remover = () => {

let aRemover= document.getElementsByClassName('remove')

    for (let item of aRemover){

        item.innerText=null;

    }

}







//  const test = ( ) => {
//     for (let y=0; y<9; y++){


//         for(let x=0; x<9; x++){
    
//             const elem= document.querySelector(`[data-x='${x}'][data-y='${y}']`);
    
//             console.log(elem)
    
    
//         }
    
    
//     }
//  }
  