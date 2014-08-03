/*
 * game.js
 * 
 * The sleep distraction identification game.
 */

//
// Cells in the picture grid that coorspond to points of interest on the image. 
var hit_cells = [
    [367, 398, 368],
    [523, 524, 525, 553, 554, 555],
    [437, 438, 439, 467, 468, 469, 527, 528, 529],
    [452, 423, 482, 483, 484, 513, 514, 515, 543, 544],
    [416, 354, 355, 356, 384, 385, 386, 414, 415, 444, 445, 446, 474, 475, 476,
        504, 505, 506, 535, 536, 530],
    [294, 293, 323, 324],
    [161, 162, 163, 191, 192, 193, 221, 222, 223, 251, 252, 253, 281, 282, 283]
];

//
// Values sourced at runtime from database;
var message_list = [];

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
function show_notify(message)
{
    var n = document.getElementById("notificationArea");
    n.style.background = "#07a400";
    n.innerHTML = message;
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
    img.style.left = (coords[0] * 30).toString() + "px";
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
    show_notify(message_list[grouping]);
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
    
    if(result) {
        do_hit(cell, i);
    } else {
        do_miss(cell);
    }
}

/**
 * Show error.
 */
function show_error(message)
{
    var n = document.getElementById("notificationArea");
    n.style.background = "red";
    n.innerHTML = message;
    n.style.display = "block";
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
    var split_messages = messages.split("~");
    for (var i = 0; i < split_messages.length; i++) {
        message_list.push(split_messages[i]);
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
