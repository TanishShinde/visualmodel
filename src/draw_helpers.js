/**
 * Draws a pseudo-3d block.
 * @param  {int}  x          Horizontal starting point. 
 * @param  {int}  y          Vertical starting point.
 * @param  {int}  width      The width of the block.
 * @param  {int}  height     The height of the block.
 * @param  {int}  depth      The depth of the block.
 * @param  {int}  multiplier The multiplier to resize width, height and depth.
 * @param  {bool} collapsed  Flag to tell if only dimensions should be shown.
 * @param  {int}  i          The block's index.
 * @return {None}            None
 */
function drawBlock (x, y, width, height, depth, multiplier, collapsed, i)
{
    let w = width * multiplier;
    let h = height * multiplier
    let dx = depth * cos(radians(BLOCK_ANGLE)) * multiplier;
    let dy = depth * sin(radians(BLOCK_ANGLE)) * multiplier;

    if (width === 0 && height === 0 && depth === 0) {
        let w = 10 * multiplier;
        let h = 10 * multiplier;
        let d = 10 * multiplier;

        width = "?";
        height = "?";
        depth = "?";
    }

    if (collapsed === false) {
        noFill();
        beginShape();    
        vertex(x, y);
        vertex(x + dx, y - dy);
        vertex(x + dx + w, y - dy);
        vertex(x + dx + w, y - dy + h);
        vertex(x + w, y + h);
        vertex(x, y + h);
        endShape(CLOSE);

        beginShape();
        vertex(x, y);
        vertex(x + w, y);
        vertex(x + w, y + h);
        endShape();

        beginShape();
        vertex(x + w, y);
        vertex(x + dx + w, y - dy);
        endShape();


        fill(0, 0, 0);
        textSize(fontSize);
        textAlign(CENTER);
        text(width, x + (w / 2), y + h + fontSize);
        text(height, x - fontSize, y + (h / 2) + fontSize / 2);
        push();
        translate(x + w, y + h);
        rotate(radians(-BLOCK_ANGLE));
        text(depth, depth * multiplier / 2, fontSize);
        pop();
        

        text('(' + width + ', ' + height + ', ' + depth + ')', windowWidth / 2, y + h + fontSize * 3);
        colExpCarets[i].position(windowWidth / 2 + 80, y + h + fontSize * 3 - colExpCarets[i].size().height / 2 + 2);
    } else {
        text('(' + width + ', ' + height + ', ' + depth + ')', windowWidth / 2, y);
        colExpCarets[i].position(windowWidth / 2 + 80, y - colExpCarets[i].size().height / 2 + 2);
    }

}


/**
 * Draws a downwards arrow at a given position.
 * @param  {int}  x1 Horizontal starting point.
 * @param  {int}  y1 Vertical starting point.
 * @param  {int}  x2 Horizontal ending point.
 * @param  {int}  y2 Vertical ending point.
 * @return {None}    None
 */
function drawArrow (x1, y1, x2, y2)
{
    push();
    stroke('black');
    strokeWeight(3);
    fill('black');
    line(x1, y1, x2, y2);
    let arrowSize = 7;
    triangle(x2 - arrowSize / 2, y2 - arrowSize,
             x2 + arrowSize / 2, y2 - arrowSize,
             x2, y2);
    pop();
}
