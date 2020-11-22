console.log('yo yo yo');
$( document ).ready( handleReady );

function handleReady(){
    console.log('jquery has joined the party');
    //click listeners will go here
    setupClickListeners();
    
}
//function for click listeners
function setupClickListeners(){
    $('#addTask').on('click', function(){
        console.log('in addTask on click');
        let taskToSend = {
            task: $('#taskIn').val()
        }
        saveTask( taskToSend);
    })
}
function saveTask( newTask ){
    console.log('in save task', newTask);
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: newTask
    })
    .then( function(response) {
        getTask();
    })
    .catch(function(error){
        console.log('ERROR TRY AGAIN', error);
        alert('ERROR TRY AGAIN')
    })

}
function getTask(){
    console.log('in function get task');
    $.ajax({
        type: 'GET',
        url: '/tasks',
    }).then( function (result) {
        $('#viewTasks').empty();
        console.log(result);
        for(let i=0; i<result.length; i++){
            console.log(result);
            $('viewTasks').append(
                `<tr data-id=${result[i].id}>
                <td>${result[i].task}</td>
                <td>${result[i].status}</td>
                <td><button class="completeButton">Completed</button></td>
                <td><button class="deleteButton">Delete</button></td>
        
                </tr>`
            )
        }
    })
}
//function addTask -- add new task POST

//function completeTask -- mark as complete

//function deleteTask -- delete task

//function refreshTasks -- refresh on reload

//function renderTasks -- render on DOM --GET