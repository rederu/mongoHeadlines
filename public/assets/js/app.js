// Clicking 'Save Article' will set the Article saved = true
$(document).on("click", ".article-save", function () {
  var id = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/api/articles/save/" + id
  }).then(function () {
    location.reload();
  });
});

$(document).on("click", ".delete", function () {
  var id = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/api/articles/delete/" + id
  }).then(function () {
    location.reload();
  });
});

$(document).on("click", ".comment", function () {
  var id = $(this).attr("data-id");
  $(".comment-form").empty();

  $.ajax({
    method: "GET",
    url: "/api/articles/" + id
  }).then(function (data) {
    // Log and then add the note information to the modal.
    console.log(data);
    console.log(data.comment);
    if (data.comment) {
      $("#comments").append("<h5 id='comment-title'>" + data.comment.title + ":</h5> " + data.comment.body);
      $("#comments").append("<button class='btn btn-outline-danger btn-sm' data-id=" + data.comment._id + " id='deleteComment'>Delete</button>");
    }
    $(".form-comment").append("<button class='btn btn-outline-primary btn-sm' data-id=" +data._id +" id='add-comment'>Submit</button>");
    $("#commentModal").modal('show');
  });
});

$(document).on("click", "#add-comment", function() {
  // Get the id from the button
  var id = $(this).attr("data-id");

  $.ajax({
      method: "POST",
      url: "/api/articles/" + id,
      data: {
          // Value taken from title input
          title: $("#comment-title").val(),
          // Value taken from note textarea
          body: $("#comment-body").val()
      }
  }).then(function(data) {
      console.log(data);
      //$('#commentModal').modal('hide');
      $(".form-comment").empty();
  });
});

$(document).on("click", "#deleteComment", function() {
  // Get the id from the button
  var id = $(this).attr("data-id");

  $.ajax({
      method: "DELETE",
      url: "/api/articles/" + id
  }).then(function() {
      $("#commentModal").modal('hide');
      $(".form-comment").empty();
  });
});
