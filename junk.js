//function appendTasks(result){
    //     $('#viewTasks').empty();
        
    //     for(let i = 0; i < result.length; i+= 1){
    //         let task = result[i];
    //         //console.log('this', + task.id);
    //         let $tr = $('<tr></tr>')
    
    //         if (task.status === 'incomplete'){
    //             $('tr').addClass("incomplete");
    //         }
    
    //         else {
    //             $('tr').addClass("complete");
    //         }
    
    //         $tr.data('task', task);
    //         console.log('task', task);
    //         console.log(task);
    //         $tr.append(`<td>${task.task}</td>`);
    //         $tr.append(`<td>${task.status}</td>`);
    //         $tr.append(`<td><button class="deleteBtn">DELETE</button></td>`);
    //         $('#viewTasks').append($tr);
            
    //         if(task.status === 'incomplete')
    //         {
    //             $tr.append(`<td><button class="completeButton">COMPLETE</button></td>`);
    //         }
    //     }
    
    // }

    function changeColor(){
        let taskId = $(this).closest('tr').data('id');
        if(taskId === 'Complete'){
            $('tr').addClass("complete");
        // $(this).closest('tr').addClass("complete");
        }
        else{$('tr').addClass("incomplete")}    
    }


    console.log('yo yo yo');
$( document ).ready( handleReady );

function handleReady(){
    console.log('jquery has joined the party');
    //click listeners will go here
    getTask();//refreshes on page load
    setupClickListeners();
    completeTask();
    //changeColor();
    
}
//function for click listeners
function setupClickListeners(){
    $('#viewTasks').on('click', '.completeButton', completeTask);
    $('#viewTasks').on('click', '.deleteButton', deleteTask)
    $('#addTask').on('click', function(){
        console.log('in addTask on click');
        let taskToSend = {
            task: $('#taskIn').val()
        }
        saveTask( taskToSend);
    })
   //$('#viewTasks').on('click', '.completeButton', changeColor)
}
function saveTask( newTask ){
    console.log('in save task', newTask);
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: newTask
    })
    .then( function(response) {
        $('#taskIn').val('');
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
            $('#viewTasks').append(
                `<tr data-id=${result[i].id}>
                <td>${result[i].task}</td>
                <td>${result[i].status}</td>
                <td><button class="completeButton">Completed</button></td>
                <td><button class="deleteButton">Delete</button></td>
        
                </tr>`
           )
       }
    })
       // appendTasks();
    .catch(function(error){
        console.log('error in get task', error);
    })

//function completeTask -- mark as complete--PUT
function completeTask(){
    console.log('complete clicked');
    console.log( $(this).closest('tr').data('id') );
    let taskId = $(this).closest('tr').data('id');
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`
    })
    .then( function(response) {
        getTask();
        changeColor();    
    })
    .catch( function(error){
        console.log('error in complete', error);
        alert('something bad happened. try again later')
    })
    
}

//function deleteTask -- delete task
function deleteTask(){
    console.log('delete clicked');
    console.log( $(this).closest('tr').data('id') );
    let taskId = $(this).closest('tr').data('id');
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`
    })
    .then( function(response) {
        getTask(); 
    })
    .catch( function(error){
        console.log('error in delete', error);
        alert('something bad happened. try again later')
    })
}

//function to apply css background color to tr


    