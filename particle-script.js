var NUM_PARTICLES, 
    THICKNESS = 50, 
    SPACING = 2, 
    MARGIN = 0, 
    COLOR = 0, 
    DRAG = 0.95, 
    EASE = 0.25, 
    RESTORE_FORCE = 0.02;  // Restoring force

var container, canvas, ctx, particle, list, tog, man, mx, my, w, h;

// Particle object structure
particle = {
  vx: 0,
  vy: 0,
  x: 0,
  y: 0,
  ox: 0,  // Original X (rest position)
  oy: 0   // Original Y (rest position)
};

function init() {
  // Get the footer element and its dimensions
  var footer = document.querySelector('footer');
  w = footer.offsetWidth; // Set width to the footer's width
  h = footer.offsetHeight; // Set height to the footer's height

  // Dynamically calculate number of particles based on footer size
  var cols = Math.floor(w / SPACING); // Calculate columns
  var rows = Math.floor(h / SPACING); // Calculate rows
  NUM_PARTICLES = rows * cols; // Total particles

  // Create and set up the canvas
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = w; // Set canvas width to footer width
  canvas.height = h; // Set canvas height to footer height

  // Append canvas inside the footer
  footer.appendChild(canvas);

  list = [];

  // Initialize particles in a grid pattern
  for (var i = 0; i < NUM_PARTICLES; i++) {
    var p = Object.create(particle);
    p.x = p.ox = MARGIN + SPACING * (i % cols);
    p.y = p.oy = MARGIN + SPACING * Math.floor(i / cols);
    list[i] = p;
  }

  // Track mouse movement and adjust coordinates
  // Track mouse movement and adjust coordinates based on viewport positioning
    window.addEventListener('mousemove', function(e) {
        // Get the mouse position relative to the footer
        const footer = document.querySelector('footer');
        const footerRect = footer.getBoundingClientRect();
    
        // Mouse position relative to the footer
        mx = e.clientX - footerRect.left;  // Adjusted for the footer
        my = e.clientY - footerRect.top;   // Adjusted for the footer
        man = true;
    });


  step();
}

function step() {
    // Clear canvas
    ctx.clearRect(0, 0, w, h);
  
    if (tog = !tog) {
      if (!man) {
        var t = +new Date() * 0.001;
        mx = w * 0.5 + (Math.cos(t * 2.1) * Math.cos(t * 0.9) * w * 0.45);
        my = h * 0.5 + (Math.sin(t * 3.2) * Math.tan(Math.sin(t * 0.8)) * h * 0.45);
      }
  
      for (var i = 0; i < NUM_PARTICLES; i++) {
        var p = list[i];
  
        // Calculate distance to mouse
        var dx = mx - p.x;
        var dy = my - p.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        
        // Normalize distance and apply force towards mouse
        var force = Math.min(THICKNESS / (d * d), 1); // Ensure that the force doesn't go beyond a limit
  
        // Stronger repelling force
        var repelFactor = 50;  // Stronger multiplier for repelling force
        if (d < THICKNESS) {
          var angle = Math.atan2(dy, dx);
          p.vx -= repelFactor * force * Math.cos(angle);  // Repelling force increases
          p.vy -= repelFactor * force * Math.sin(angle);  // Repelling force increases
        }
  
        // Apply drag and ease to move towards the original resting position (ox, oy)
        p.x += (p.vx *= DRAG) + (p.ox - p.x) * EASE;
        p.y += (p.vy *= DRAG) + (p.oy - p.y) * EASE;
  
        // Add a restoring force to slowly bring particles back to their original positions
        p.x += (p.ox - p.x) * RESTORE_FORCE;
        p.y += (p.oy - p.y) * RESTORE_FORCE;
      }
    } else {
      var imageData = ctx.createImageData(w, h);
      var data = imageData.data;
  
      for (var i = 0; i < NUM_PARTICLES; i++) {
        var p = list[i];
        var n = (~~p.x + (~~p.y * w)) * 4;
  
        // Check if the particle is still moving (velocity is above a threshold)
        var isMoving = Math.abs(p.vx) > 0.01 || Math.abs(p.vy) > 0.01; // Check if velocity is above a small threshold
  
        // If the particle is moving, set its color to light blue
        if (isMoving) {
          data[n] = 173;  // Light blue R
          data[n + 1] = 216;  // Light blue G
          data[n + 2] = 230;  // Light blue B
        } else {
          data[n] = 0;  // Black R
          data[n + 1] = 0;  // Black G
          data[n + 2] = 0;  // Black B
        }
        
        data[n + 3] = 255; // Full opacity
      }
  
      ctx.putImageData(imageData, 0, 0);
    }
  
    requestAnimationFrame(step);
  }
  

// Initialize the particle system
init();
