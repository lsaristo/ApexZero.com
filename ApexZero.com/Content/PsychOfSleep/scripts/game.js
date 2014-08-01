/*
 * game.js
 * 
 * The sleep demonostration game.
 */

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
    init_game();
}

function grid(rows, cols)
{
    var table = document.getElementById("canvas");
    var i = 0;
    var new_table = document.createElement('table');
    new_table.className = "grxd";
    new_table.cellSpacing = 0;
    new_table.border = 1;
    new_table.cellPadding = 0;
    

    for (var r = 0; r < rows-2; r++) {
        var row = new_table.insertRow(r);
        for (var c = 0; c < cols-2; c++) {
            var cell = row.insertCell(c);
            cell.innerHTML = i++;
            cell.onclick = function () { test(this) };
        }
    }
    table.appendChild(new_table);
}

function init_game()
{
    grid(24, 32);
}

window.onload = remove_warning;