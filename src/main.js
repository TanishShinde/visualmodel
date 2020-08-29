// Globals
let multiplier = 1;
let blockList = [];
let fontSize = 16;
let fontRegular;
let fontItalic;
let fontBold;
let input;
let inputLabel;
let showExampleButton;
let readMoreLink;
let backToTopButton;
let collapseAllButton;
let expandAllButton;
let BLOCK_ANGLE = 20;
let totalHeight = 0;
let colExpCarets = [];


/**
 * Preloads assets.
 * @return {None} None
 */
function preload ()
{
    fontRegular = loadFont("assets/DM_Mono/DMMono-Regular.ttf");
    fontItalic = loadFont("assets/DM_Mono/DMMono-Italic.ttf");
    fontBold = loadFont("assets/DM_Mono/DMMono-Medium.ttf");
}


/**
 * Handles window resizing.
 * @return {None} None
 */
function windowResized ()
{
    if (totalHeight === 0) {
        resizeCanvas(windowWidth - 23, windowHeight - 23);
    } else {
        resizeCanvas(windowWidth - 23, totalHeight * multiplier + 300 * blockList.length + 300);
    }
}


/**
 * Setups visualmodel.
 * @return {None} None
 */
function setup ()
{
    createCanvas(windowWidth - 23, windowHeight - 23);  

    // File input, will be hidden
    input = createFileInput(handleFile);
    input.attribute('id', 'file-input');
    input.attribute('accept', '.json');
    // Label to stylize file input
    inputLabel = createElement('label', '');
    inputLabel.attribute('for', 'file-input');
    // Button to load example
    showExampleButton = createButton('show an example');
    showExampleButton.mousePressed(loadExample);
    // Link to GitHub repo
    readMoreLink = createA("https://github.com/TanishShinde/visualmodel", "read more");
    // 'Back to top' button
    backToTopButton = createButton("back to top");
    backToTopButton.mousePressed(scrollUp);
    backToTopButton.style('opacity', 0);
    // Collapse/expand buttons
    collapseAllButton = createButton("collapse all blocks");
    collapseAllButton.mousePressed(collapseBlocks);
    collapseAllButton.style('opacity', 0);
    expandAllButton = createButton("expand all blocks");
    expandAllButton.mousePressed(expandBlocks);
    expandAllButton.style('opacity', 0);

    smooth();
}


/**
 * Draws items on the screen.
 * @return {None} None
 */
function draw ()
{
    // Start at a vertical offset of 100
    let y = 100;

    // Clear canvas
    background('white');
    
    // Draw title & subtitle
    textFont(fontRegular);
    textAlign(CENTER);
    
    push();
    textSize(100);
    text("VisualModel", width / 2, y);
    pop();
    
    y += 50;
    
    push();
    textSize(20);
    text("take a peek at your model's inner workings", width / 2, y);
    pop();

    y += 50;

    // Position input label & show example button
    inputLabel.position(floor(windowWidth / 2 - (inputLabel.size().width + 1) / 2), y);
    y += 60;

    push();
    textSize(20);
    text("or", width / 2, y);
    pop();

    y += 25;
    showExampleButton.position(floor(windowWidth / 2 - (showExampleButton.size().width + 1) / 2), y);
    y += 50

    // Draw model
    y += blockList[0] ? blockList[0][2] + 50 : 50;
    for (let i = 0; i < blockList.length; i++) {
        drawBlock(windowWidth / 2 - (blockList[i][0] + blockList[i][2]) * multiplier / 2, y,
                  blockList[i][0], blockList[i][1], blockList[i][2], multiplier, blockList[i][4], i);

        
        // If cube is drawn, extra gap is needed
        if (blockList[i][4] === false) {
            y += (blockList[i][1]) * multiplier + 80;
        } else {
            y += 20;
        }
        

        // Draw arrows and layer names
        if (i + 1 < blockList.length) {
            drawArrow(windowWidth / 2, y, windowWidth / 2, y + 50);
            y += 50;

            text(blockList[i + 1][3], windowWidth / 2, y + fontSize + 10);
            
            y += fontSize * 2 + 10;
            drawArrow(windowWidth / 2, y, windowWidth / 2, y + 50);
            y += 50;
        }

        if (i + 1 < blockList.length) {
            y += fontSize * 2;
        
            if (blockList[i + 1][4] === false) {
                y += (blockList[i + 1][2]) * sin(radians(BLOCK_ANGLE)) * multiplier
            }
        }
    }

    // Draw footer
    y += 100;
    strokeWeight(5);
    line(0, y, windowWidth, y);
    y += 50;
    text("made by TanishShinde using p5.js", width / 2, y);
    y += 20;
    readMoreLink.position(width / 2 - 40, y);
    strokeWeight(1);

    // Draw collapse/expand all buttons
    collapseAllButton.position(windowWidth - 200, windowHeight - 200, 'fixed');
    expandAllButton.position(windowWidth - 200, windowHeight - 150, 'fixed');
    // Draw back to top button
    backToTopButton.position(windowWidth - 200, windowHeight - 100, 'fixed');
}

