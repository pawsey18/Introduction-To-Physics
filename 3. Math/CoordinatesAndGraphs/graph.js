class Graph {
  constructor(context, xmin, xmax, ymin, ymax, x0, y0, xwidth, ywidth) {
    // LETIABLE DECLARATIONS
    // canvas context on which to draw graph instance
    let ctx = context;
    // location of origin (in pixels) in parent document
    let x_orig;
    let y_orig;
    // overall width and height of graph in pixels
    let x_width;
    let y_width;
    // min and max of x and y relative to origin (in pixels)
    let x_min_rel;
    let x_max_rel;
    let y_min_rel;
    let y_max_rel;
    // obvious
    let x_tick_major;
    let x_tick_minor;
    let y_tick_major;
    let y_tick_minor;
    // scaling used in displaying values on the axes
    let x_displ_scal;
    let y_displ_scal;
    // width and height of textbox used for displaying values on the axes
    // this should not have to be tampered with (I hope)
    let tw = 15;
    let th = 20;
    // declarations for quantities to be used later
    let x_min;
    let x_max;
    let y_min;
    let y_max;
    let xx;
    let yy;
    let x_displ;
    let y_displ;
    let txpos;
    let typos;

    // assign parameter values based on specified arguments
    x_orig = x0;
    y_orig = y0;
    x_width = xwidth;
    y_width = ywidth;

    x_displ_scal = (xmax - xmin) / xwidth;
    y_displ_scal = (ymax - ymin) / ywidth;
    
    x_min_rel = xmin / x_displ_scal;
    x_max_rel = xmax / x_displ_scal;
    y_min_rel = ymin / y_displ_scal;
    y_max_rel = ymax / y_displ_scal;
    // convert to absolute coordinates
    x_min = x_min_rel + x_orig;
    x_max = x_max_rel + x_orig;
    y_min = y_orig - y_min_rel;
    y_max = y_orig - y_max_rel;
    txpos = x_orig - tw;
    typos = y_orig;

    // DRAW GRID: draw major, minor lines and display values
    this.drawGrid = function (xmajor, xminor, ymajor, yminor) {
      x_tick_major = xmajor / x_displ_scal;
      x_tick_minor = xminor / x_displ_scal;
      y_tick_major = ymajor / y_displ_scal;
      y_tick_minor = yminor / y_displ_scal;
      // draw major grid lines
      ctx.strokeStyle = "#999999";
      ctx.lineWidth = 1;
      ctx.beginPath();
      yy = y_max;
      do {
        ctx.moveTo(x_min, yy);
        ctx.lineTo(x_max, yy);
        yy += y_tick_major;
      } while (yy <= y_min);
      xx = x_min;
      do {
        ctx.moveTo(xx, y_min);
        ctx.lineTo(xx, y_max);
        xx += x_tick_major;
      } while (xx <= x_max);
      ctx.stroke();
      // draw minor grid lines
      ctx.strokeStyle = "#cccccc";
      ctx.lineWidth = 1;
      ctx.beginPath();
      yy = y_max;
      do {
        ctx.moveTo(x_min, yy);
        ctx.lineTo(x_max, yy);
        yy += y_tick_minor;
      } while (yy <= y_min);
      xx = x_min;
      do {
        ctx.moveTo(xx, y_min);
        ctx.lineTo(xx, y_max);
        xx += x_tick_minor;
      } while (xx <= x_max);
      ctx.stroke();
      //display values
      ctx.font = "10pt Arial";
      ctx.fillStyle = "#000000";
      ctx.textAlign = "right";
      ctx.textBaseline = "top";
      yy = y_max;
      do {
        y_displ = (y_orig - yy) * y_displ_scal;
        ctx.fillText(y_displ, txpos + 5, yy - th / 2);
        yy += y_tick_major;
      } while (yy <= y_min);
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      xx = x_min;
      do {
        x_displ = (xx - x_orig) * x_displ_scal;
        ctx.fillText(x_displ, xx - tw + 10, typos + 5);
        xx += x_tick_major;
      } while (xx <= x_max);
    };

    // DRAW AXES: draw axes and labels
    this.drawAxes = function (xlabel, ylabel) {
      if (typeof xlabel === "undefined") xlabel = "x";
      if (typeof ylabel === "undefined") ylabel = "y";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x_min, y_orig);
      ctx.lineTo(x_max, y_orig);
      ctx.moveTo(x_orig, y_min);
      ctx.lineTo(x_orig, y_max);
      ctx.stroke();
      //axis labels
      ctx.font = "12pt Arial";
      ctx.fillStyle = "#000000";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(xlabel, x_max + 0.75 * tw, typos - th / 2);
      ctx.fillText(ylabel, txpos + tw / 2 + 5, y_max - 1.5 * th);
    };

    // plot data
    this.plot = function (xArr, yArr, pColor, pDots, pLine) {
      // the last three arguments have default values
      if (typeof pColor === "undefined") pColor = "#0000ff";
      if (typeof pDots === "undefined") pDots = true;
      if (typeof pLine === "undefined") pLine = true;

      let xpos = x_orig + xArr[0] / x_displ_scal;
      let ypos = y_orig - yArr[0] / y_displ_scal;

      ctx.strokeStyle = pColor;
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(xpos, ypos);
      ctx.arc(xpos, ypos, 1, 0, 2 * Math.PI, true);

      for (let i = 1; i < xArr.length; i++) {
        xpos = x_orig + xArr[i] / x_displ_scal;
        ypos = y_orig - yArr[i] / y_displ_scal;

        if (pLine) {
          ctx.lineTo(xpos, ypos);
        } else {
          ctx.moveTo(xpos, ypos);
        }
        if (pDots) {
          ctx.arc(xpos, ypos, 1, 0, 2 * Math.PI, true);
        }
      }
      ctx.stroke();
    };
  }
}
