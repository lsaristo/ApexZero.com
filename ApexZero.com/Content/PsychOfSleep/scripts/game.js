/*
 * game.js
 * 
 * The sleep distraction identification game.
 */

//
// Cells in the picture grid that coorspond to points of interest on the image. 
var hit_cells = [
    [367, 368, 338, 398],                                        // POPCORN.1
    [524, 525, 553, 554, 555],                              // TABLET.2
    [437, 438, 439, 467, 468, 469, 527, 528, 529, 499, 498, 497],          // HEATER.3
    [451, 452, 423, 482, 483, 484, 513, 514, 515, 544, 453, 454],     // LAPTOP.4
    [416, 354, 355, 356, 384, 385, 386, 414, 415, 444, 445, 446, 474, 475, 476,  // TV.5
        504, 505, 506, 535, 536, 530],
    [294, 293, 323, 324],                                   // LAMP .6
    [161, 162, 163, 191, 192, 193, 221, 222, 223, 251, 252, 253, 281, 282, 283] // MOON.7
];

//
// Values sourced at runtime from database;
var message_list = [];
var url_messages = [];

/**
 * Test that the module is working.
 */
function test(e)
{
    alert("Cell: " + e.innerHTML);
}

/**
 * Replace standard noscript warning.
 */
function remove_warning()
{
    var elem = document.getElementById("noscript");
    elem.innerHTML = "";
    elem.className = "blank";
}

/**
 * Show a notification in gree.
 */
function show_notify(id)
{
    var n = document.getElementById("notify");
    var title = document.getElementById("notify_title");
    var msg = document.getElementById("notify_message");

    title.innerHTML = "Correct";
    msg.innerHTML = message_list[id];
    msg.innerHTML += ". Read more: " + url_messages[id];
    n.style.display = "block";
}

/**
 * Draw a circle graphic on the canvas image.
 */
function draw_circle(grouping)
{
    var img = document.createElement("img");
    img.src= "/Content/PsychOfSleep/images/circle.png";
    img.className = "pic1";
    
    var coords = get_coords(hit_cells[grouping][0]);
    img.style.left = (coords[0] * 28).toString() + "px";
    img.style.top = (coords[1] * 18).toString() + "px";
    document.getElementById("canvas").appendChild(img);
}

/**
 * Compute the x,y pixel offset coordinates from a cell id.
 */
function get_coords(cell)
{
    var row_num = Math.floor(cell / 22);    // 22 Rows total
    var col_num = cell % 30;    // 30 Columns total

    return [col_num, row_num];
}


function find_first_instance(id)
{
    for(var i=0; i < hit_cells.length; i++) {
        if(hit_cells[i] == id) { return i; }
    }
    return -1;
}

/**
 * Do hit.
 */
function do_hit(cell, grouping)
{
    show_notify(grouping);
    draw_circle(grouping);
}

function do_miss(cell)
{
    show_error(cell + " was NOT a hit");
}


/**
 * Determine whether the cell selected was a 'hit'.
 */
function is_hit(cell)
{
    var i = 0;
    var result
        = function () {
            for ( ; i < hit_cells.length; i++) {
                for (var j = 0; j < hit_cells[i].length; j++) {
                    if (hit_cells[i][j] == cell) {
                        return true;
                    }
                }
            }
            return false;
        }(cell);
    
    if (result) {
        do_hit(cell, i);
    } else {
        do_miss(cell);
    }
}

/**
 * Show error.
 */
function show_error(message) {
    var n = document.getElementById("notify");
    var title = document.getElementById("notify_title");
    var msg = document.getElementById("notify_message");

    title.innerHTML = "Sorry";
    msg.innerHTML = "That's not one of them.";
}


/**
 * Draw the grid overlay on the image.
 */
function grid(rows, cols)
{
    var table = document.getElementById("canvas");
    var i = 0;
    var new_table = document.createElement('table');
    new_table.className = "grxd";
    new_table.cellSpacing = 0;
    new_table.border = 0;
    new_table.cellPadding = 0;
    

    for (var r = 0; r < rows-2; r++) {
        var row = new_table.insertRow(r);
        row.className = "myrow";
        for (var c = 0; c < cols-2; c++) {
            var cell = row.insertCell(c);
            cell.innerHTML = i++;
            cell.onclick = function () { is_hit(this.innerHTML) };
        }
    }
    table.appendChild(new_table);
}

function process_messages(messages) 
{
    for (var i = 0; i < 15; i++) {
        url_messages.push(i);
        message_list.push(i);
    }

    var split_messages = messages.split("~");
    
    for (var i = 0; i < split_messages.length; i++) {
        if (split_messages[i] == "") { continue; }
        var message_compoenents = split_messages[i].split("^");
        var message_id = parseInt(message_compoenents[0]);
        var message_body = message_compoenents[1];
        var message_url = message_compoenents[2];

        url_messages[message_id-1] = (message_url);
        message_list[message_id-1] = (message_body);
    }
}

/**
 * Serves as a starting point for any other logic in the game.
 */
function init_game(messages)
{
    remove_warning();
    process_messages(messages);
    document.getElementById("canvas").style.display = "block";
    grid(24, 32);
}