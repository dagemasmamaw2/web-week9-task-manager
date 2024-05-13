// Initialize Firebase with your config
firebase.initializeApp({
    apiKey: "AIzaSyCHjWSREXmdjI5--_zBIVyDuYeFEXtD2-U",
    authDomain: "task2-f0512.firebaseapp.com",
    projectId: "task2-f0512",
    storageBucket: "task2-f0512.appspot.com",
    messagingSenderId: "911046056453",
    appId: "1:911046056453:web:262401e77970ff18f9da6c"
  });
  
  const db = firebase.firestore();
  
const inputBox = document.getElementById("input-box");
const listContainer =document.getElementById("list-container");

function addTask(){
    if(inputBox.value===''){
        alert("You must write something!");
    }else{
        const task = inputBox.value.trim();
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
        
    }
    inputBox.value="";
}
// Function to render tasks
 function renderTasks(doc){
    let li = document.createElement("li");
    li.innerHTML=doc.data().task;
    listContainer.appendChild(li); 
    let span = document.createElement("span");
    span.setAttribute("onclick", `deleteTask('${doc.id}')`);
    span.innerHTML="\u00d7";  
    li.appendChild(span); 
} 




listContainer.addEventListener("click",function(e){
if(e.target.tagName==="LI"){
    e.target.classList.toggle("checked");
}
else if(e.target.tagName==="SPAN"){
    e.target.parentElement.remove();
}
},false);

// Real-time listener for tasks
db.collection("tasks")
  .orderBy("timestamp", "desc")
  .onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
      if (change.type === "added") {        
        renderTasks(change.doc);
      }
    });
  });


// Function to delete a task
function deleteTask(id) {
    db.collection("tasks").doc(id).delete(); 
  }