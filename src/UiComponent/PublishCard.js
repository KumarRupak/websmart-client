import React from 'react'

export const PublishCard = () => {

    let addText = document.getElementById("addText");
    let note = localStorage.getItem("note");
    let notes
 const save=()=>{
       
      if (note === null) {
          notes = [];
      }
      else {
          notes = JSON.parse(note);
      }
  
      notes.push(addText.value);
      localStorage.setItem("note", JSON.stringify(notes));
      addText.value = "";
      showNotes();

 }
    
    
  


function showNotes() {
    let note = localStorage.getItem("note");
    let notes
    if (note === null) {
        notes = [];
    }
    else {
        notes = JSON.parse(note);
    }

    let html = "";
    notes.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id=${index} onclick="del(this.id);" class="btn btn-primary">delete</button>
        </div>
        </div>
                `;
    });

    let noteCard = document.getElementById("notes");
    if (notes.length != 0) {
        noteCard.innerHTML = html;
    }
}

function del(index) {
    let note = localStorage.getItem("note");
    let notes
    if (note == null) {
        notes = [];
    }
    else {
        notes = JSON.parse(note);
    }
    notes.splice(index, 1);
    localStorage.setItem("note", JSON.stringify(notes));
    showNotes();
}



    return (
        <div>
             <div class="container my-4">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Type Your Note</h5>
                <div class="mb-3">

                    <textarea class="form-control" id="addText" rows="3"></textarea>
                </div>
                <button onClick={save} class="btn btn-primary">Save</button>
            </div>
        </div>
        <h2>My Notes</h2>
        <hr/>
    </div> 
    <div class=" row container-fluid " id="notes"></div>
        </div>
    )
}
