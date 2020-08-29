/**
 * Handles file input (when the user loads a JSON model file).
 * @param  {Object} file The file chosen by the user.
 * @return {None}        None
 */
function handleFile (file)
{
    blockList = [];
    removeColExpCarets();

    loadJSON(file.data, calculateBlocks);    
}


/**
 * Loads an example to demonstrate the use of visualmodel.
 * @return {None} None
 */
function loadExample ()
{
    blockList = [];
    removeColExpCarets();
    // Reset input just in case a file has been loaded
    input.attribute('type', 'text');
    input.attribute('type', 'file');

    loadJSON('assets/model.json', calculateBlocks);
}


/**
 * Scrolls to the top of the page.
 * @return {None} None
 */
function scrollUp ()
{
    window.scrollTo(0, 0);
}


/**
 * Collapses all blocks.
 * @return {None} None
 */
function collapseBlocks ()
{
    for (let i = 0; i < blockList.length; i++) {
        blockList[i][4] = true;
        colExpCarets[i].class("fas fa-caret-left")
    }
}


/**
 * Expands all blocks.
 * @return {None} None
 */
function expandBlocks ()
{
    for (let i = 0; i < blockList.length; i++) {
        blockList[i][4] = false;
        colExpCarets[i].class("fas fa-caret-up")
    }
}


/**
 * Toggles a specific block (expands/collapses it).
 * @param  {int}  i The block index.
 * @return {None}   None
 */
function toggleBlock (i)
{
    if (i >= 0 && i < blockList.length) {
        // Toggle flag
        blockList[i][4] = !blockList[i][4];
    
        // Toggle caret
        if (colExpCarets[i].class() === "fas fa-caret-up") {
            colExpCarets[i].class("fas fa-caret-left")
        } else {
            colExpCarets[i].class("fas fa-caret-up")
        }
    }
}


/**
 * Removes all collapse/expand carets.
 * @return {None} None
 */
function removeColExpCarets ()
{
    for (let i = 0; i < colExpCarets.length; i++) {
        colExpCarets[i].remove();
    }

    colExpCarets = [];
}
