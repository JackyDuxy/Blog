// elements
const button = document.getElementById("submit");
const history_button = document.getElementById('showhistory');
const history_delete = document.getElementById('deletehistory');

let counter = document.getElementById("counter");
let num = 0

let task = document.getElementById("descripition");
let task_img = document.getElementById("task_img");
let display = document.getElementById("display");

let task_input = "";
let task_img_input = "";

//lists to append to local storage
let text_list = []
let img_list = []

// index number
let fct = 0

//enter -> empty line for display
const br = document.createElement('br');
console.log("inside script.js")
console.log(prev_containers)

// grabbign the lists from local storage
localStorage.getItem("ImageList")
localStorage.getItem("TextList")


// if there is stuff on local storage -> we load them and set them into our variables
if(localStorage.getItem("TextList") != null){
    text_list = localStorage.getItem("TextList").split(",");
    img_list =localStorage.getItem("ImageList").split(",");
    fct = localStorage.getItem("TextList").split(",").length - 1;
}




// when the submit button is pressed  -> run button pressed function
button.addEventListener("click", button_pressed);

//when history button presse show history
history_button.addEventListener("click", show_history);


// function delete_his(){
//     text_list = [];
//     img_list = [];
// }

//edit function -> create two text box which allows users to edit the current divs text and images
function edit_pressed(){
    // //parentnode of the parente node of the edit button we pressed (aka div container that stores our text and image)
    // console.log("parent of paretn of edit button")
    // console.log(this.parentNode.parentNode)
    // //this.parentNode parent of the edit button we pressed (aka div the contains the three buttons)
    // console.log("parent of edit button")
    // console.log(this.parentNode)
    // //this == edit button that was pressed
    // console.log("edit button we pressed")
    // console.log(this)
    //we are grabbing the container that stores all user input
    let divs = this.parentNode.parentNode

    //grabbed the orignal text and image from the div we are editing
    let old_txt  = divs.childNodes[0]
    let old_img = divs.childNodes[1]

    //create two input elements for user to input their updated items
    let edit_text = document.createElement("input");
    let edit_url = document.createElement("input");

    // setting up place holders and ids for the created elements
    edit_text.placeholder = "The task you want to change";
    edit_url.placeholder = "The url you want to change";
    edit_text.className = "edit_text";
    edit_url.className = "edit_url";

    //create a div container to hold our two input elements
    const edit_con = document.createElement('div')
    edit_con.className = ("inside")

    //the new submit button
    let submit_button = document.createElement('button')
    submit_button.innerText = "Submit"



    //update our display to show the update input element and new submit button
    divs.appendChild(br);
    divs.appendChild(br);
    divs.appendChild(edit_con);

    //the add the input elements inside our edit con container
    edit_con.appendChild(edit_text);
    edit_con.appendChild(edit_url);
    edit_con.appendChild(br);
    edit_con.appendChild(submit_button);

    //update our text and images
    function submit_button_pressed(){

        old_img.src = edit_url.value;
        divs.appendChild(br)
        old_txt.innerText = edit_text.value;
        divs.appendChild(br)
        divs.removeChild(edit_con)


        // add it so that it updates our database -> needs to trigger a app.route

    }
    //when ever our users click on the update button we need to update our display 
    submit_button.addEventListener("click", submit_button_pressed);
}

function delete_pressed(){

    var divs = this.parentNode.parentNode;
    //grab the unorderlist
    var parentDiv = divs;
    // console.log(parentDiv)
    let checkers = parentDiv.childNodes[0].textContent;
    parentDiv.remove();

    console.log("BEFORE DELETE")
    console.log(text_list)
    console.log(img_list)

    let index_remove = text_list.indexOf(checkers);

    console.log(index_remove)
    delete text_list[index_remove];
    delete img_list[index_remove];

    // local lists    
    console.log("After DELETE1");
    text_list = text_list.join(' ').trim('').split(' ');
    img_list = img_list.join(' ').trim('').split(' ');

    console.log(text_list);
    console.log(img_list);
    
    console.log("After DELETE2");

    localStorage.setItem("TextList",text_list);
    localStorage.setItem("ImageList",img_list);
    console.log(localStorage.getItem(text_list));
    console.log(localStorage.getItem(img_list));
}

function finish_pressed() {
    const finish = document.getElementById("FinishButton")
    num += 1;
    counter.innerText = "Finished: " + num;

    var divs = this.parentNode.parentNode;
    let parentNode = this.parentNode;
    let parentDiv = divs;
  
    let button = document.getElementById("FinishButton");
    parentNode.removeChild(finish);
  
    let checkers = parentDiv.childNodes[0].textContent;
    let index_remove = text_list.indexOf(checkers);
    console.log("Finish checker: ", index_remove);
    console.log("After finish delete text_list:", text_list);
    console.log("After finish delete img_list:", img_list);
  
    text_list.splice(index_remove, 1); // Remove element from text_list
    localStorage.setItem("TextList", text_list); // Save updated text_list to local storage
    localStorage.setItem("ImageList", img_list);
  }

//functions
//Finish Button - Real
function button_pressed(){

    //grabbing user input values after they click submit and store them 
    task_input = task.value;
    task_img_input = task_img.value;

    // creating elements for our divs display
    //unordered list tag which will store our task val
    let ul = document.createElement("ul");

    //image tag which will store user inputed image 
    let image = document.createElement('img');

    //setting the image to user input
    image.src = task_img_input;

    // create an div card inside
    let divs = document.createElement('div');

    //setting container id for our div
    divs.id = "container";

    //button div
    let button_divs = document.createElement('div');

    //create finish, backspace, and edit button for  our button div
    const finish = document.createElement('button');
    const backspace = document.createElement('button');
    const edit = document.createElement('button');

    //setting the text and ids for each of our buttons
    finish.innerText = "Finished";
    finish.id = "FinishButton";
    backspace.innerText = "Delete";
    edit.innerText = "Edit";
    edit.className = "EditButton";


    localStorage.setItem("TextList",text_list);
    localStorage.setItem("ImageList",img_list);

    //add the eventlistner of the buttons
    finish.addEventListener("click", finish_pressed);

    backspace.addEventListener("click", delete_pressed);

    
    edit.addEventListener("click", edit_pressed);



    ul.textContent = task_input;

    display.appendChild(divs);
    divs.appendChild(ul);
    divs.appendChild(image);
    divs.appendChild(br);
    divs.appendChild(br);
    divs.appendChild(button_divs)
    button_divs.appendChild(finish);
    button_divs.appendChild(edit);
    button_divs.appendChild(backspace);

    // add image to children
    task.value = "";
    task_img.value = "";

    // we need to connect to main.py and call app route /submit
    // post method with the information (task, img, usernmae, new_id)

    var data_sent_to_approute_submit = {"task": task_input, "img": task_img_input, "username": username, "id": 90 }

  
    //fetch to submit in post
    fetch('/submit',{
        method: 'POST',
        headers:{
            'Content-Type': 'container information'
        },
        body: JSON.stringify(data_sent_to_approute_submit)
    })
    .then(response => response.json())
    .then(data=> {
        console.log(data) // handle the responses of the data
    })
    .catch(error=>{
        console.error("error:",error)
    });

}

function show_history(){
    
    //    |
    //    |
    //    |
    //    |
    //    |
    //   \ /
    //    v

    //******  homework display all the things from prev_containers

    // prev_container is a variable that stores the containers in our database which is linked to the user that logged in 
    // we want to display all the previouse containers that user have insert into our html once they logged in succesfully
    // to do this we need to change the current for loop below to take in the information from prev_container instead of using text_list and img_list



    while(display.childNodes[1] != null){
        display.childNodes[1].remove();
        console.log(display.childNodes[1]);
        if(display.length == 1){
            break
        }
    }
    
    //instructions:

    //if there is nothing in the array prev_containers do nothing
    if(prev_containers.length > 1){
        //transcript for loop that under else
        for (let ct = 1; ct <= prev_containers.length-1; ct = ct+1){
            let changeline = document.createElement("br");
            console.log(ct)
            // task for understanding: log the IMG, TASK, USER, and ID, of each container in prev container
            console.log(prev_containers[ct]["img"]);
            console.log(prev_containers[ct]["task"]);
            // console.log(prev_containers[1]);
            display.appendChild(changeline);

            let ul = document.createElement("ul");

            //image tag which will store user inputed image 
            let image = document.createElement('img');

            //setting the image to past user input
            image.src = prev_containers[ct]["img"];

            //settign the ul to past user input
            ul.textContent = prev_containers[ct]["task"];
            
            // create an div card inside
            let div_con = document.createElement('div');

            //setting container id for our div
            div_con.id = "container";

            //button div -> div contaner to store our buttons :>
            let button_divs = document.createElement('div');

            //enter -> empty line for display
            const br = document.createElement('br');

            //create finish, backspace, and edit button for  our button div
            const finish = document.createElement('button');
            const backspace = document.createElement('button');
            const edit = document.createElement('button');

            //setting the text and ids for each of our buttons
            finish.innerText = "Finished";
            finish.id = "FinishButton";
            backspace.innerText = "Delete";
            edit.innerText = "Edit";
            edit.className = "EditButton";
            
            //adding all the elements inton display
            display.appendChild(div_con);
            div_con.appendChild(ul);
            div_con.appendChild(image);
            div_con.appendChild(br)
            div_con.appendChild(button_divs);
            button_divs.appendChild(finish);
            button_divs.appendChild(edit);
            button_divs.appendChild(backspace);

            finish.addEventListener("click", finish_pressed);
            backspace.addEventListener("click", delete_pressed);
            edit.addEventListener("click", edit_pressed);
        }
    }

    else {
        console.log("nothing")
    }

    
    //loop through each object in prev_containers and display in the display class html if prev_cntainer's length is greater than 0
    console.log(display)
    // delete all the previouse elements inside display
   
}

history_delete.addEventListener("click", delete_his);

function delete_his(){
    localStorage.clear();
    location.reload();


}


// Tips
// parentNode: Get the parent node of the current element.
// parentElement: Get the parent element of the current element.
// children: Get all child elements of the current element.
// firstChild: Get the first child element of the current element.
// lastChild: Get the last child element of the current element.
// previousSibling: Get the previous sibling element of the current element.
// nextSibling: Get the next sibling element of the current element.
// appendChild(): Add an element as a child node of the current element to the parent node.
// removeChild(): Remove the child nodes of the current element from the parent node.
// abcdefghijklmnopqrstuvwxyz