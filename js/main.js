var data= (localStorage.getItem('todolist')) ? JSON.parse(localStorage.getItem('todolist')):{

    todo:[],
    complete:[]

};

var removesvg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 7 5 L 17 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z"/>';
var acceptsvg='<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1" width="64px" height="64px"><g id="surface1"><path style=" " d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 22.28125 11.28125 L 15 18.5625 L 10.71875 14.28125 L 9.28125 15.71875 L 14.28125 20.71875 L 15 21.40625 L 15.71875 20.71875 L 23.71875 12.71875 Z "/></g></svg>'

renderTodoList();
document.getElementById('add').addEventListener('click',function(){
    var value=document.getElementById('item').value;

    if(value){
        
        addItemToDo(value);
        document.getElementById('item').value='';
        data.todo.push(value);
        dataObjectUpdated();
    }
});
function renderTodoList(){
    if(!data.todo.length && !data.complete.length)return;
    for(var i=0;i<data.todo.length;i++){
        var value=data.todo[i];
        addItemToDo(value);

    }
    for(var j=0;j<data.complete.length;j++){
        var value=data.complete[j];
        addItemToDo(value,true);
    }
}

function dataObjectUpdated(){
    localStorage.setItem('todolist',JSON.stringify(data));
}


function removeItem(){
 
   var item=this.parentNode;
   var parent =item.parentNode;
   var id=parent.id;
   var value=item.innerText;
   if(id=='todo'){
    data.todo.splice(data.todo.indexOf(value),1);
    }else{
        data.complete.splice(data.todo.indexOf(value),1);
    }
   dataObjectUpdated();
   parent.removeChild(item);

}

function completeItem(){
    var item=this.parentNode;
    var parent =item.parentNode;
    var id=parent.id;
   var value=item.innerText;
if(id=='todo'){
data.todo.splice(data.todo.indexOf(value),1);
data.complete.push(value);
}else{
    data.complete.splice(data.todo.indexOf(value),1);
data.todo.push(value);
}


dataObjectUpdated();
   var target=(id==='todo')?document.getElementById('complete'):document.getElementById('todo');
   parent.removeChild(item);
   target.insertBefore(item,target.childNodes[0]);


}


 function addItemToDo(text,complete){
  var list=(complete)?document.getElementById('complete'):document.getElementById('todo');
    
  var item=document.createElement('li');
  item.innerText=text;

  list.appendChild(item);
  
  var remove=document.createElement('button');
  remove.style.width="50px";
  remove.style.height="50px";
  remove.style.border="0px";
  remove.style.cssFloat="right";
  remove.style.cursor="pointer";
  remove.style.outline="none";
  remove.style.background="none";
  remove.classList.add('remove1');
  remove.innerHTML=removesvg;
  
 ///add click evet for remoing item
 remove.addEventListener('click',removeItem);

  var accept=document.createElement('button');
  accept.style.width="50px";
  accept.style.height="50px";
  accept.style.cssFloat="right";
  accept.style.background="none";
  accept.style.border="0px";
  accept.style.outline="none";
  accept.style.cursor="pointer";
  accept.classList.add('accept1');
  accept.innerHTML=acceptsvg;


  ///add click event
  accept.addEventListener('click',completeItem);


  item.appendChild(remove);
  item.appendChild(accept);

  list.insertBefore(item,list.childNodes[0]);
  
 }