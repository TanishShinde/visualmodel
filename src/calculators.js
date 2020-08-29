/**
 * Calculates the dimensions of the next layer, given its description and the previous dimensions.
 * @param  {int}    width  Previous width.
 * @param  {int}    height Previous height.
 * @param  {int}    depth  Previous depth.
 * @param  {Object} layer  The next layer.
 * @return {Array}         The dimensions of the next layer.
 */
function calculateNextLayerDimensions (width, height, depth, layer)
{
    let output = [0, 0, 0];

    switch (layer.class_name) {
        case "Conv2D":
        case "SeparableConv2D":
            let filters = layer.config.filters;
            let kernel = layer.config.kernel_size;
            let strides = layer.config.strides;
            let padding = layer.config.padding === "same" ? 1 : 0;

            output[0] = floor((width - kernel[0] + 2 * padding) / strides[0]) + 1;
            output[1] = floor((height - kernel[1] + 2 * padding) / strides[1]) + 1;
            output[2] = filters;
            break;


        case "MaxPooling2D":
            let pool = layer.config.pool_size;
            output[0] = floor(width / pool[0]);
            output[1] = floor(height / pool[1]);
            output[2] = depth;

            break;


        case "GlobalAveragePooling2D":
            output[0] = 1;
            output[1] = 1;
            output[2] = depth;

            break;


        case "Flatten":
            output[0] = width * height * depth;
            output[1] = 1;
            output[2] = 1;

            break;


        case "Dense":
            let units = layer.config.units;
            output[0] = units;
            output[1] = 1;
            output[2] = 1;

            break;

        default:
            output[0] = 0;
            output[1] = 0;
            output[2] = 0;

            break;
    }

    return output;
}


/**
 * Calculates the multiplier needed such that the smallest block is big enough.
 * @param  {int} blockList The list of blocks to be drawn.
 * @return {int}           The multiplier.
 */
function calculateMultiplier (blockList)
{
    let avgW = 0;
    let avgStdDevW = 0;
    let base = 0;

    for (let i = 0; i < blockList.length; i++) {
        avgW += blockList[i][0] + blockList[i][2] * cos(radians(BLOCK_ANGLE));
    }

    avgW /= blockList.length;

    for (let i = 0; i < blockList.length; i++) {
        avgStdDevW += abs(blockList[i][0] + blockList[i][2] * cos(radians(BLOCK_ANGLE)) - avgW);
    }

    avgStdDevW /= blockList.length;

    base = abs(avgW - avgStdDevW) == 0 ? 1 : abs(avgW - avgStdDevW);

    return windowWidth * 0.5 / base;
}


/**
 * Calculates the blocks that should be drawn based on raw model data.
 * @param  {Object} modelData Model data in JSON form (already parsed).
 * @return {None}             None
 */
function calculateBlocks (modelData)
{
    let width = 0;
    let height = 0;
    let depth = 0;
    let layers = modelData.config.layers;

    for (let i = 0; i < layers.length; i++) {
        if (layers[i].config.batch_input_shape) {
            width = layers[i].config.batch_input_shape[1];
            height = layers[i].config.batch_input_shape[2];
            depth = layers[i].config.batch_input_shape[3];    
            append(blockList, [width, height, depth, "Input", false]);     
            // Add a caret to toggle collapse/expand   
            append(colExpCarets,
                   createElement("i", "").class("fas fa-caret-up").mousePressed(function () { toggleBlock(i); }));
        }

        dimensions = calculateNextLayerDimensions(width, height, depth, layers[i]);
        width = dimensions[0];
        height = dimensions[1];
        depth = dimensions[2];

        // Expand everything by default
        append(blockList, [width, height, depth, layers[i].class_name, false]);
        // Add a caret to toggle collapse/expand   
        append(colExpCarets,
               createElement("i", "").class("fas fa-caret-up").mousePressed(function () { toggleBlock(i + 1); }));
    }

    multiplier = calculateMultiplier(blockList);

    totalHeight = 0;
    for (let i = 0; i < blockList.length; i++) {
        totalHeight += blockList[i][1] + blockList[i][2] * sin(radians(BLOCK_ANGLE));
    }

    resizeCanvas(windowWidth - 23, totalHeight * multiplier + 300 * blockList.length + 300);

    collapseAllButton.style('opacity', 1);
    expandAllButton.style('opacity', 1);
    backToTopButton.style('opacity', 1);
}
