/*
 * game.js
 * 
 * The sleep distraction identification game.
 */

//
// Cells in the picture grid that coorspond to points of interest on the image. 
var hit_cells = [
    [368, 398],                                        // POPCORN.1
    [524, 525, 553, 554, 555],                              // TABLET.2
    [468, 437, 438, 439, 467, 469, 527, 528, 529, 499, 498, 497],          // HEATER.3
    [451, 452, 423, 482, 483, 484, 513, 514, 515, 544, 453, 454],     // LAPTOP.4
    [416, 354, 355, 356, 384, 385, 386, 414, 415, 444, 445, 446, 474, 475, 476,  // TV.5
        504, 505, 506, 535, 536, 530],
    [294, 293, 323, 324],                                   // LAMP .6
    [161, 162, 163, 191, 192, 193, 221, 222, 223, 251, 252, 253, 281, 282, 283] // MOON.7
    [000] // BEER.8
];

//
// Values sourced at runtime from database;
var message_list = [];
var url_messages = [];
var hit_coord = [[275, 340], [500, 460], [640, 410], [130, 410], [850, 350], [795, 270], [390, 180], [000] ];
var hit_so_far = [];

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
    var message = 
        "In our day to day lives, there are so many distractors around us that"
        + " we're not even aware of that can be affecting the quality of our sleep"
        + ". The brain relies on a careful balance of external cues--called "
        + "zeitgebers--to regulate the body's natural daily cycle, the Circadian "
        + "ryhthym. These cues exist naturally in the environment, with the most"
        + " noticeable of them being the light from the sun.<br><br>"
        + "Today we have so many gadets and devices that can potentially "
        + "generate confusing input that mimic natural zeitgebers at times when"
        + " the brain wouldn't expect them to be prevalent"
        + ". The result of this is that the body's natural clock can be"
        + " thrown off from the natural daily cycle. This can create a host"
        + " of problems, ranging from simple insomnia to more serious "
        + "conditions involving chronic sleep deprivation or delay/advanced"
        + " sleep phase syndrome in which the sleep/wake cycle has been "
        + "shifted.<br><br>In light of the importance of maintaining a "
        + "sleeping environment free of these artificial zeitgebers, the Sleep"
        + " distraction game has been developed to help you identify common"
        + " sources of these distractors that are typically found in a bedroom."
        + " You should attempt to identify all the distractors in the room "
        + "featured below by clicking on the offending item. You will be "
        + "notified of your correctness. You will also find interesting "
	+ "reading on the details for each item you identify.<br><br>"
	+ "This game was written exclusively for use as demonstration"
	+ " for UC Berkeley's Psychology of Sleep. Please email any inaccuracies "
	+ "or bugs to <a id='aa' href=mailto:dev@apexzero.com?Subject=Game>ApexZero</a>";
    var msg = document.createElement("p");
    var title = document.createElement("p");
    var link = document.createElement("a");
    var link_text = document.createTextNode("Hide This Message");
    link.appendChild(link_text);
    link.title = "Title";
    link.className = "err";
    link.id = "err_link";
    link.href="javascript:hide_msg()";

    title.className = "title";
    msg.className = "e";
    msg.id = "err_msg";

    title.innerHTML = "Welcome to the Sleep Distraction Game!";
    msg.innerHTML = message;
    elem.innerHTML = "";

    elem.appendChild(title);
    elem.appendChild(msg);
    elem.appendChild(link);
}

function hide_msg() {
    var elem = document.getElementById("err_msg");
    var link = document.getElementById("err_link");
    document.getElementById("aa").style.display = "none";
    link.firstChild.data = "Show Message";
    link.href = "javascript:show_msg()";
    elem.className = "hide_me";
}

function show_msg() {
    var elem = document.getElementById("err_msg");
    var link = document.getElementById("err_link");
    link.firstChild.data = "Hide Message";
    link.href = "javascript:hide_msg()";
    elem.className = "e";

    document.getElementById("aa").style.display = "inline";
}

function is_over(id)
{
    var i = 0;

    for ( ; i < hit_so_far.length; i++) {
        if (id == hit_so_far[i]) { break; }
    }

    if (i == hit_so_far.length) {
        hit_so_far.push(id);
    }

    if (hit_so_far.length == 8) { return true; }
    return false;
}

/**
 * Show a notification in gree.
 */
function show_notify(id)
{
    var n = document.getElementById("notify");
    var title = document.getElementById("notify_title");
    var msg = document.getElementById("notify_message");

    title.innerHTML = "Correct!!";
    msg.innerHTML = message_list[id];
    msg.innerHTML += ". <a href=\"" + url_messages[id] + "\">Read More >>></a>";
    n.style.display = "block";

    if (is_over(id)) {
        msg.innerHTML += "<br><br><br><strong>YOU WIN!!";

        var rel = document.createElement("button");
        rel.onclick = function () { window.location.reload(true); };
        var text = document.createTextNode("Play again");
        rel.appendChild(text);
        n.appendChild(rel);
    }
}

/**
 * Draw a circle graphic on the canvas image.
 */
function draw_circle(grouping)
{
    var img = document.createElement("img");
    img.src= "/Content/PsychOfSleep/images/circle.png";
    img.className = "pic1";
    var coords = hit_coord[grouping];
    img.style.left = coords[0] + "px";
    img.style.top = coords[1] + "px";
    document.getElementById("canvas").appendChild(img);
}

/**
 * Compute the x,y pixel offset coordinates from a cell id.
 */
function get_coords(cell)
{
    var row_num = Math.floor(cell / 30);    // 22 Rows total
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
