$(document ).ready(function() {
    //get all the data on app startup
    console.log("Startin up");
    loadData();
    function loadData(){
            console.log("on load data method");
            questionsRef.get().then(function(snapshot){
            loadTableData(snapshot);
        });
    }
    function loadTableData(snapshot){
        let tableRow='';
        snapshot.forEach(function(doc){
            tableRow += '<tr>';
            tableRow += '<td class="topic">'+doc.id+'</td>';
            tableRow += '<td class="topic">'+ doc.data().Level+'</td>';
            tableRow += '<td class="topic">'+ doc.data().Questions +'</td>';
            tableRow += '<td class="topic">'+ doc.data().Answers+'</td>';
            tableRow += '<td class="editEmployee"><i class="fa fa-pencil aria-hidden="true" style="color:blue"></i></td>'
            tableRow += '<td class="editEmployee"><i class="fa fa-trash aria-hidden="true" style="color:red"></i></td>'
            tableRow += '</tr>';
            
        });
        $('tbody.tbodyData').html(tableRow);
    }
    $('#createEmployee').click(function(){
        $('.employeeForm').css("display", "block");
        $('#dynamicBtn').text('Save Changes')
    });

    $('#dynamicBtn').click(function(){
        //employee form values
        const topic = $("#topic").val();
        const level = $("#level").val();
        const question = $("#question").val();
        const answer = $("#answer").val();

        
        //check if you need to create or update an employee
        if($(this).text() == "Save Changes"){
            let topicDoc = topic;
            console.log(question);
            questionsRef.get().then(function(snapshot){
                snapshot.forEach(doc =>{
                    let q = doc.data().Questions;
                    if(q.indexOf(question)!=-1){
                        firestore.collection("Questions").doc(topicDoc).set({
                            Questions:Questions.put(question),
                            Answers:Answer.put(Answer)
                        },
                        {
                            merge:true
                        }).then(function(docRef){
                            $('#operationStatus').html('<div class="alert alert-success"><strong>Success</strong>Question were added!!!</div>')
                            $('.emplyeeForm').css("display","none");
                            loadData();
                    }).catch(function(error){
                        $('#operationStatus').html('<div class="alert alert-danger"><strong>Error :(</strong>Question were Not added!!!</div>')
                    });
                    }
                });
            });
        }
        else{
        }
    });
    // Cancel the Employee form
    $('#cancel').click(function(){
        $('.employeeForm').css("display", "none");
    });

    // Get the data of the employee you want to edit
    $("tbody.tbodyData").on("click","td.editEmployee", function(){
        $('.employeeForm').css("display", "block");
        $('#dynamicBtn').text('Update Employee');

        $("#topic").val($(this).closest('tr').find('.topic').text());
        $("#level").val($(this).closest('tr').find('.level').text());
        $("#question").val($(this).closest('tr').find('.question').text());
        $("#answer").val($(this).closest('tr').find('.answer').text());
    });

    // Delete employee
    $("tbody.tbodyData").on("click","td.deleteEmployee", function(){
        //Get the Employee Data
        var fName = $(this).closest('tr').find('.fname').text(); //First Name
        var lName = $(this).closest('tr').find('.lname').text(); //Last Name
    });

    $("#searchEmployee" ).change(function() {
        console.log('You entered: ', $(this).val());
      });
});