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
    })
}
//function addTask -- add new task POST

//function completeTask -- mark as complete

//function deleteTask -- delete task

//function refreshTasks -- refresh on reload

//function renderTasks -- render on DOM --GET