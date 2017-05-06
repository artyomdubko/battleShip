  var rowsCols = 5;
  var filesToId = [];
  var prizes = ["prizes/beer-outline-filled.png", "prizes/beer-outline-filled.png", "prizes/Pizza-icon.png", "prizes/ice-cream.png", "prizes/ice-cream.png"];
  var crossPng = "images/cross-miss.png";

  $(document).ready(function() {
      $('.add_more').click(function(e) {
          e.preventDefault();
          $(this).before("<input name='file[]' type='file'/>");
      });
  });


  function createBattle() {
      rowsCols = $('.rows-count').val();
      $('.create-div').hide();
      var squareId = 1; 
      var squareSize = 600 / rowsCols;
      var battleInfoClass = "board-text"
      var battleSquare = "battle-square"
      var battleImg = "battle-img"
      var files = [];
      var letters = ["", "A", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"];
      var numbers = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
      //  $("input[name='file[]']").each(function() {
      // 	var fileName = $(this).val().split('/').pop().split('\\').pop(); 
      // 	files.push(fileName);
      // 	filesToId.push(generateRandomInteger(1,rowsCols*rowsCols));
      // });

      filesToId = randomArray(prizes.length, rowsCols);
      var gameBoardContainer = document.getElementById("gameboard");
      // make the grid columns and rows
      for (i = 0; i <= rowsCols; i++) {
          for (j = 0; j <= rowsCols; j++) {
              // create a new div HTML element for each grid square and make it the right size
              var square = document.createElement("div");
              gameBoardContainer.appendChild(square);
              // set each grid square's coordinates: multiples of the current row or column number
              var topPosition = j * squareSize;
              var leftPosition = i * squareSize;
              // use CSS absolute positioning to place each grid square on the page
              square.style.top = topPosition + 'px';
              square.style.left = leftPosition + 'px';
              square.style.height = squareSize + 'px';
              square.style.width = squareSize + 'px';

              if (i == 0) {
                  square.innerHTML = square.innerHTML + numbers[j];
                  square.className += " " + battleInfoClass;
              } else if (j == 0) {
                  square.innerHTML = square.innerHTML + letters[i];
                  square.className += " " + battleInfoClass;
              } else {
                  square.className += " " + battleSquare;
                  square.id = squareId;
                  var img = document.createElement("img");
                  square.appendChild(img);
                  img.id = "img" + squareId;
                  img.className += " " + battleImg;
                  squareId++;
              }
          }
      }

      $(".battle-square").on('click', function(event) {
          openSquare($(this));
      });

  }



  function openSquare($square) {
      var found = false;
      for (i = 0; i < filesToId.length; i++) {
          if (filesToId[i] == $square[0].id) { 
              found = true;
			  $img  = $($square[0]).children("img");
			  $img.attr('src', prizes[i]);
			  $($img).fadeIn(1500);
          }
      }
      if (!found) { 
			  $img  = $($square[0]).children("img");
			  $img.attr('src', crossPng);
			  $($img).fadeIn(1500);	  
      }
  }

  function randomArray(prizesCount, rowsCols) {
      var arr = []
      while (arr.length < prizesCount) {
          var randomnumber = Math.ceil(Math.random() * (rowsCols * rowsCols))
          if (arr.indexOf(randomnumber) > -1) continue;
          arr[arr.length] = randomnumber;
      }
      return arr;
  }