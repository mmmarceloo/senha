let areas ={
    a: null,
    b: null,
    c: null
};

document.querySelectorAll('.item').forEach(item=>{   //evento que configura o arrastar e soltar
    item.addEventListener('dragstart', dragStart);   // pega
    item.addEventListener('dragend',dragEnd);        //solta
});

document.querySelectorAll('.area').forEach(area =>{  //configura as areas de drop
    area.addEventListener('dragover', dragOver);  // quando passa por cima
    area.addEventListener('dragleave', dragLeave); // quando sai da area
    area.addEventListener('drop', drop);           //quando solta
})

//para conseguir dropar na area inicial
document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

function dragStart(e){
    e.currentTarget.classList.add('dragging');  //pegar
}

function dragEnd(e){
    e.currentTarget.classList.remove('dragging'); // soltar
}


function dragOver(e){     //quando esta em cima
    if(e.currentTarget.querySelector('.item')=== null){
    e.preventDefault();    // padrao é nao deixar droppar, agora liberou
    e.currentTarget.classList.add('hover'); // quando entrar na area adiciona essa classe
    }
}
function dragLeave(e){    // quando sai da area
    e.currentTarget.classList.remove('hover');
}
function drop(e){               // quando solta
       e.currentTarget.classList.remove('hover');
       
      
       if(e.currentTarget.querySelector('.item')=== null){  // se estiver vazio
          let dragItem= document.querySelector('.item.dragging');
            e.currentTarget.appendChild(dragItem);       // pega o item e insere appendChild
            updateAreas();
       }
}

function dragOverNeutral(e){
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e){
    e.currentTarget.classList.remove('hover');
}

function dropNeutral(e){
    e.currentTarget.classList.remove('hover');
    let dragItem= document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem); 
    updateAreas();
}

function updateAreas(){
    document.querySelectorAll('.area').forEach(area =>{
        let name = area.getAttribute('data-name');

        if (area.querySelector('.item') !== null){
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
    });
    if(areas.a ==='2' && areas.b === '3' && areas.c === '1'){
        document.querySelector('.areas').classList.add('correct');
        document.querySelector('h1').innerHTML = 'Acertou!!!';
    } else {
        document.querySelector('.areas').classList.remove('correct');
        document.querySelector('h1').innerHTML = 'Descubra a senha, arrastando os blocos nas caixas abaixo!';
    }

}