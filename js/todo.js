baseUrl = "http://192.168.2.191/todo_api/api/";
userId=1;
$(document).ready(function(){

  var header = document.getElementById("btnbar");
  var btns = header.getElementsByClassName("btn");

  // the ajax http call
  var DoAjaxWork = function (ajaxUrl, reqType, ajaxReqData, onSucess, onError) {
    $.ajax({
      url: ajaxUrl,
      type: reqType,
      data: ajaxReqData,
      success: onSucess,
      error: onError

    });
  }

  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      if (current.length > 0) { 
        current[0].className = current[0].className.replace(" active", "");
      }
      this.className += " active";
    });
  }

  //strart of complete update
  function updateTask(c){
    // $.ajax(baseUrl+'updateTask',{
      //   type:'GET',
      data ={
        id: 1,
        tsid:c 
      }
      function fnsucc() {
        alert("this task is completed");
        window.location.href = "index.html";
      }
      function fnerr (){
        alert("having some issue completion");
      }
      DoAjaxWork(baseUrl+'updateTask','POST',data,fnsucc,fnerr);
  }

  // end of complete update

 // start of title edity function



 function updateTaskTitle(tid,title,im){
   data ={
      id: 1,
      tsid:tid,
      tit:title,
      img:im
    }

   function fnsucc() {
      alert("task is updated successfully");
      window.location.href = "index.html";
    }
    function fnerr (){
      alert("having issue in updating");
    }
    DoAjaxWork(baseUrl+'updateTaskTitle','POST',data,fnsucc,fnerr)
 }

 function updateTitle(tid,title){
   $("#todo_home").hide();
   $("#todo_add").hide();
   $("#todo_edit").show();
   $('#edit_task').val(title);
   $('#edit-task').attr('data-tsid', tid);
 }

  //start of rempove complete
  function removeComplete(t){
    data ={
      id: userId,
      tsid:t
    }
    function fnsucc() {
      alert("task is removed successfully");
      window.location.href = "index.html";
    }
    function fnerr (){
      alert("having issue in removing");
    }
    DoAjaxWork(baseUrl+'removeComplete','POST',data,fnsucc,fnerr)
  }

  $('body').off('click').on('click','.btn_status',function(e){ 
    //let a =parseInt($(this).attr('data-tid'));
    let status= $(this).attr('data-staus');
    switch(status){
      case "Completed": 
      {
        var tid=$(this).attr('c-tid');
        
        updateTask(tid);
        break;
      }
      case "update":
      {
        var tid=$(this).attr('u-tid');
        var title=$(this).parent().parent().parent().find('.padtask').text();
        updateTitle(tid,title);
        break;
      }
      case "delete": 
        var tid=$(this).attr('data-tid');
        removeComplete(tid);
        break;
    }
    // removeComplete(a);
  });

// edit task submit button
  $('body').off('click','#edit-task').on('click','#edit-task',function(){
      var tid= document.querySelector('#edit-task').getAttribute('data-tsid');
      var title= document.querySelector('#edit_task').value;
      var im= document.querySelector('#file-input').value;
      updateTaskTitle(tid,title,im);
  })
  // end of remove complete

 // chech the checkbox

//  function checkTheBox(){
//    var checkString = document.querySelector('.check').getAttribute('data-check');
//    if(checkString=="checked"){
//     document.querySelector('.class').checked=true;
//    }
//    else{
//      document.querySelector('.class').checked=false;
//    }
//  }


  // start of get all task
  getAllTask();

  $('#all').click(function(){
      getAllTask(); 
 
  });

  function getAllTask(){
    reqObj = {
      id: 1,
      state: "all"
    };
    // function fnsucc(data) {
    //   var dataToBeDisplayed={"all":data};
    //   console.log(dataToBeDisplayed);
    //   var source = $("#alldata-template").html();
    //   var template = Handlebars.compile(source);
    //   var html = template(dataToBeDisplayed.all);
    //   $("#all-task").html(html);
    //   $(".clear-all").hide();
    // }
    // function fnerr (){
    //   alert("having issue in get all task");
    // }
    // DoAjaxWork(baseUrl+'getTask?id='+reqObj.id+'&state='+reqObj.state,'GET',reqObj,fnsucc,fnerr)

    $.ajax(baseUrl+'getTasks?id=1&state=all',{
      type:'GET',
      success: function (data) { 
        var dataToBeDisplayed={"all":data};
        console.log(dataToBeDisplayed);
        var source = $("#alldata-template").html();
        var template = Handlebars.compile(source);
        var html = template(dataToBeDisplayed.all);
        $("#all-task").html(html);
        $(".clear-all").hide();
      },  
      error: function (errorThrown) {  
        console.log('Error in Operation');  
      }  
    });
  }
  // end of get all tasks

  //start of get pending task
  $("#pen").click(function(){ 
        $("#all-task").hide();
        $("#pending-task").show();
        $("#completed-task").hide();
        getPendingTask();

  });

  function getPendingTask(){
    reqObj = {
      id: 1,
      state: "pending",
    };
    $.ajax(baseUrl+'getTasks?id='+reqObj.id + '&state='+reqObj.state,{
      type:'GET',
      success: function (data) { 
        var dataToBeDisplayed={"pending":data}; 
        var source = $("#alldata-template").html();
        var template = Handlebars.compile(source);
        var html = template(dataToBeDisplayed.pending);
        $("#pending-task").html(html);
        $(".clear-all").hide();
      },  
      error: function (errorThrown) {  
        console.log('Error in Operation');  
      }  
    })
  }
  //end of get pending task

  //start of get complete task
  $("#com").click(function(){
        $("#all-task").hide();
        $("#pending-task").hide();
        $("#completed-task").show();
        getCompletedTask();
        

  })

  function getCompletedTask(){
    reqObj = {
    id: 1,
    state: "completed",
   };
    $.ajax(baseUrl+'getTasks?id='+reqObj.id + '&state='+reqObj.state,{
      type:'GET',
       success: function (data) { 
         var dataToBeDisplayed={"completed":data};
         var source = $("#alldata-template").html();
         var template = Handlebars.compile(source);
         var html = template(dataToBeDisplayed.completed);
         $("#completed-task").html(html);
         $("#kclear-all").show();
         $("h5").removeClass("striketext");
        },  
        error: function (errorThrown) {  
          console.log('Error in Operation');  
        }  
    });
  }

  //end of get complete task

  //Add new task
  $('#add-task').click(function(){
    var title= document.getElementById("add_task").value;
    var img= document.getElementById("file-input").value;
    addNewTask(title,img);
  })

  function addNewTask(title,img){
    $.ajax(baseUrl+'addTask',{
      type:'POST',
      data :{
        id: userId,
        tit: title,
        i_url: img,
        state: "pending" },
        success: function (data) { 
        window.location.href = "index.html";
      },
      error: function (errorThrown) {  
        console.log('Error in Operation');  
      } 
    })
  }


  $("#all").click(function(){
  $("#all-task").show();
  $("#pending-task").hide();
  $("#completed-task").hide();
  $("#clear-all").hide();
  })

  $("#todo_add").hide();
  $("#todo_edit").hide();

  $("#right-icon").click(function(){
    $("#todo_home").hide();
    $("#todo_add").show();
  });
  $("#left-icon").click(function(){
    $("#todo_home").show();
    $("#todo_add").hide();
    $("#todo_edit").hide();
  });
  $("#left").click(function(){
    $("#todo_home").show();
    $("#todo_add").hide();
    $("#todo_edit").hide();
  });
    $("#left_update").click(function(){
    $("#todo_home").show();
    $("#todo_add").hide();
    $("#todo_edit").hide();
  });


  function previewImages() {
    var preview = document.querySelector('#preview');
    if (this.files) {
      [].forEach.call(this.files, readAndPreview);
    }
    function readAndPreview(file) {
      // Make sure `file.name` matches our extensions criteria
      if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
        return alert(file.name + " is not an image");
      } // else...
      var reader = new FileReader();
      reader.addEventListener("load", function() {
        var image = new Image();
        image.height = 100;
        image.title  = file.name;
        image.src    = this.result;
        preview.appendChild(image);
      });
      reader.readAsDataURL(file);
    }
  }

  document.querySelector('#file-input').addEventListener("change", previewImages);
  function previewFile() {
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
    reader.onloadend = function () {
      preview.src = reader.result;
    }
    if (file) {
      reader.readAsDataURL(file);
    } 
    else {
      preview.src = "";
    }
  }

  Handlebars.registerHelper('checkClass', function(options) {
  if(options.toLowerCase()=='completed'){
    return "checked"
  }
  else return "not_checked" 

  });


  // helpers
  Handlebars.registerHelper('checkcomplete', function(options) {
    if(options.toLowerCase()=='completed'){
      return "striketext"
    }
    else return " " 

  });




});