

$(document).ready(function(){

var header = document.getElementById("btnbar");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  if (current.length > 0) { 
    current[0].className = current[0].className.replace(" active", "");
  }
  this.className += " active";
  });
}

    todo_data = {"todo":[{"work":"focus think then do work!"},{"work":"eat sleep code repeat for while 1"}],"todo_pen":[{"work":"the end is near - pending"},{"work":"winter is comming -pending"},{"work":"prepare for next -pending"},{"work":"winter is comming. the game of thrones begins"},{"work":"we will say to the god of death is- NOT TODAY"},{"work":"prepare for next it will be good"},{"work":"morning walk"}]}
    var source = $("#alldata-template").html();
    var template = Handlebars.compile(source);
    var html = template(todo_data.todo);
    var htm = template(todo_data.todo_pen);
    $("#all-task").html(htm);
    $("#all-task").html(html);

    $("#clear-all").show();

  
  $("#pen").click(function(){
    $("#all-task").hide();
    $("#pending-task").show();
    $("#completed-task").hide();
   // todo = {"todo_pen":[{"work":"the end is near - pending"},{"work":"winter is comming -pending"},{"work":"prepare for next -pending"},{"work":"winter is comming. the game of thrones begins"},{"work":"we will say to the god of death is- NOT TODAY"},{"work":"prepare for next it will be good"},{"work":"morning walk"}]}
    var source = $("#alldata-template").html();
    var template = Handlebars.compile(source);
    var html = template(todo_data.todo_pen);
    $("#pending-task").html(html);
    $("#clear-all").hide();
  })

  $("#com").click(function(){
    $("#all-task").hide();
    $("#pending-task").hide();
    $("#completed-task").show();
   // todo_d = {"todo_comp":[{"work":"task is done - completed"},{"work":"hello its working -completed"},{"work":"it seems good -completed"},{"work":"its awesome experience having here"},{"work":"making myself more productive"},{"work":"winter is comming. the game of thrones begins"},{"work":"we will say to the god of death is- NOT TODAY"},{"work":"prepare for next it will be good"},{"work":"morning walk"}]}
    var source = $("#alldata-template").html();
    var template = Handlebars.compile(source);
    var html = template(todo_data.todo);
    $("#completed-task").html(html);
    $("#clear-all").show();
  })
  $("#all").click(function(){
    $("#all-task").show();
    $("#pending-task").hide();
    $("#completed-task").hide();
    $("#clear-all").hide();
  })

  $("#todo_add").hide();
  $("#todo_edit").hide();
  $(document).ready(function(){
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
    $("#edit").click(function(){
      $("#todo_home").hide();
      $("#todo_add").hide();
      $("#todo_edit").show();
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

});


        $('#clear-all').click(function(){
                $("#tasks input:checkbox").each(function(){
                    if (this.checked) {
                         $(this).remove();
                    }
                    return false;  

                })
        });

});


    function previewFile() {
      var preview = document.querySelector('img');
      var file    = document.querySelector('input[type=file]').files[0];
      var reader  = new FileReader();

      reader.onloadend = function () {
        preview.src = reader.result;
      }

      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
      }
    }