const apiUrl ="https://bp-marvel-api.herokuapp.com/";

const apiPost = "https://bp-marvel-api.herokuapp.com/marvel-characters?idAuthor=1"

const paramsRequest = {
    idAuthor: 1
}

function showForm() {
    document.getElementById('formElement').style.display = 'block';
}

async function makePost(){
    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;
    var imagen = document.getElementById("imagen").value;
    var getList = await axios.get(apiUrl + "marvel-characters", { params: { ...paramsRequest } });
    var long = getList.data.length + 1;
    const todo = {
        title: nombre,
        body: descripcion,
        image: imagen,
        category: "main",
        idAuthor: long,
        createdAt:new Date(),
        updatedAt:new Date()
    };
    try {
      const response = await axios.post(apiPost, todo);
      const newTodoItem = response.data;
  
      console.log(`Added a new Todo!`, newTodoItem);
  
      return newTodoItem;
    } catch (errors) {
      console.error(errors);
    }
};

// ...

async function deleteTodoItem(clicked_id){
    try {
      const response = await axios.delete(`${apiUrl}marvel-characters/${clicked_id}?idAuthor=1`);
      console.log(`Deleted Todo ID: `, clicked_id);
  
      return response.data;
    } catch (errors) {
      console.error(errors);
    }
    refresh();
};

async function getMarvel(){
    return await axios.get(apiUrl + "marvel-characters", { params: { ...paramsRequest } });
}

const setTodoList = async() =>{

    const res = await axios.get(apiUrl + "marvel-characters", { params: { ...paramsRequest } });
    var element_container2 = document.querySelector(".container-full");
    element_container2.innerHTML = '';
    console.log(res.data);
    res.data.forEach(element => {
        const elemento_id = element._id;
        // const elemento_title = element.title;
        // const element2 = json.data[index+1];
        element_container2.innerHTML += `<div class="row g-0 pb-5" >
        <div class="col-md-4">
          <img src="${element.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-6 text-bg-dark">
          <div class="card-body text-bg-dark pt-5">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.body}.</p>
              <p class="card-text"></p>
          </div>
        </div>
        <div class="col-md-2 text-bg-dark">
          <div class="d-grid gap-2 col-6 mx-auto pt-5">
              <button class="btn btn-primary" type="button" data-id="${elemento_id}" id="${elemento_id}" onclick="deleteTodoItem(this.id)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
              </button>
              <button class="btn btn-primary" type="button" data-id="${elemento_id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                    </svg>
              </button>
            </div>
        </div>
      </div>`;
    });

}

window.addEventListener('DOMContentLoaded',function(event){
    setTodoList()
});

window.addEventListener('submit',async event => {
    event.preventDefault();
    makePost();
    
})

