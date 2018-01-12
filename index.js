//variables
var A = shuffle(); //shuffle the tiles
window.paircount = 0; //tracks the number of matches
window.tilecount = 0; //tracks the number of open tiles
window.lasttile = null; //tracks the last open tile
window.opentile = null; //tracks the current open tile

//do stuff here

for (i = 0; i < 16; i++) {
  add_elem(i, A[i]); //adds event handlers to the tiles.
}

document.getElementById("overlay_win").onclick = function () {
  reset();
};

function add_class(id, cl) {
  var elem = document.getElementById(id);
  if (elem.classList.contains(cl) !== true) {
    elem.classList.add(cl);
  }
}

function rem_class(id, cl) {
  var elem = document.getElementById(id);
  if (elem.classList.contains(cl) === true) {
    elem.classList.remove(cl);
  }
}

//This function adds the selected class of a selected tile
function add_elem(i, elem) {
  document.getElementById("tile_" + i).onclick = function () {
    window.opentile = i;
    add_class("tile_" + i, "tile_open");
    add_class("tile_icon_" + i, "fa-" + elem);

    if (window.tilecount == 1) {
      if (i != window.lasttile && window.A[i] == window.A[window.lasttile]) {
        //checks if the 2 stmbols match and aren't the same tile
        var first = document.getElementById("tile_" + i); //get tile id
        var second = document.getElementById("tile_" + window.lasttile); //get tile id

        first.classList.add("tile_closed"); //remove tiles
        second.classList.add("tile_closed"); //remove tiles

        first.onclick = ""; //remove event handlers
        second.onclick = ""; //remove event handlers

        window.paircount++; //increment pair count
        if (window.paircount == 8) {
          //win condition
          //alert('You win!');//show victory banner here
          add_class("overlay_win", "overlay_win_open");
        }
      } else {
        rem_delay(window.opentile, window.lasttile);
        //clears the tiles with a 1 second delay(to let the player see the tile)
      }

      window.tilecount = 0; //resets the opened tile counter to 0
    } else {
      window.lasttile = i; //sets the last tile
      window.tilecount++;
    } //increments the tile count
  };
}

//This function removes all tile classes (used to hide tiles)

function rem_select(i) {
  rem_class("tile_" + i, "tile_open");
  rem_class("tile_icon_" + i, "fa-eye");
  rem_class("tile_icon_" + i, "fa-star");
  rem_class("tile_icon_" + i, "fa-heart");
  rem_class("tile_icon_" + i, "fa-diamond");
}

//this function hides tiles, with a delay
//it is called when the tiles don't match

function rem_delay(first, second) {
  setTimeout(function () {
    rem_select(first); //closes open tiles
    rem_select(second); //closes open tiles
  }, 1000);
}

//This function shuffles the tiles
function shuffle() {
  var j;
  var t;

  var A = [
    "eye",
    "eye",
    "eye",
    "eye",
    "star",
    "star",
    "star",
    "star",
    "heart",
    "heart",
    "heart",
    "heart",
    "diamond",
    "diamond",
    "diamond",
    "diamond"
  ];

  for (i = 0; i < 16; i++) {
    j = Math.floor(Math.random() * (i + 1));
    t = A[i];
    A[i] = A[j];
    A[j] = t;
  }
  return A;
}

//this function resets the game
function reset() {
  window.A = shuffle(); //shuffle tiles and reset variables
  window.paircount = 0;
  window.tilecount = 0;
  window.lasttile = null;
  window.opentile = null;

  for (i = 0; i < 16; i++) {
    rem_select(i); //turns around tiles
    add_elem(i, A[i]); //adds events
    rem_class("tile_" + i, "tile_closed"); //Tiles back to normal opacity..
  }
}
