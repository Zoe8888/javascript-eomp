fetch("https://guarded-lake-78300.herokuapp.com/", {})
  .then((res) => res.json())
  .then((data) => console.log(data));

$("#signUp").click(function () {
  $("#form-box").css("transform", "translateX(80%)");
  $("#signIm").addClass("hide");
  $("#signUp").removeClass("hide");
});
signUp;
$("#signIm").click(function () {
  $("#form-box").css("transform", "translateX(0%)");
  $("#signUp").addClass("hide");
  $("#signIm").removeClass("hide");
});
