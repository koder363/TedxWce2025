import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import '../OurTeam/OurTeam';

export function initThreejs(canvas, container) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 35, 40);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 3);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const loader = new GLTFLoader();
  let textModel;
  let isZoomedOut = false;
  let isInsideScene = false;
  let lastTouchY = 0;
  let lastTouchMoveY = 0;

  // Load Stage Model
  loader.load('/stage2.glb', function (gltf) {
    const model = gltf.scene;
    model.scale.set(5, 5, 5);
    model.position.set(0, -4, 0);
    model.traverse(node => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    scene.add(model);

    // Load Text Model
    loader.load('/updated2.glb', function (textGltf) {
      textModel = textGltf.scene;
      textModel.scale.set(1, 1,1);
      textModel.position.set(-13, 10, 3);
      textModel.traverse(node => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          node.material.emissive.setHex(0xff0000);
        }
      });

      const textGlow = new THREE.PointLight(0xff0000, 0, 0);
      textGlow.position.set(0, 1, 4);
      scene.add(textGlow);
      scene.add(textModel);
    });
  });

  // Mouse enter/leave to detect focus on the scene
  container.addEventListener("mouseenter", () => isInsideScene = true);
  container.addEventListener("mouseleave", () => isInsideScene = false);

  // Orbit Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Function to handle scroll behavior on different screen sizes
  function handleScroll(event, isTouch = false) {
    if (!isInsideScene) return;

    const deltaY = isTouch ? event.touches[0].clientY - lastTouchY : event.deltaY;
    lastTouchY = isTouch ? event.touches[0].clientY : null;

    if (window.innerWidth <= 768) {
      event.preventDefault(); // Block scrolling page

      // Lock X-axis rotation while allowing normal touch interactions
      controls.enableRotate = false;
      controls.enableZoom = false;

      if (deltaY > 0 && camera.position.z < 80) {
        camera.position.z += deltaY * 0.05;
      } else if (deltaY < 0 && camera.position.z > 50) {
        camera.position.z += deltaY * 0.05;
      }

      isZoomedOut = camera.position.z >= 80;

      // Scroll to next section if zoomed out (for mobile)
      if (isZoomedOut && deltaY > 0) {
        scrollToNextSection();
      } else if (!isZoomedOut && deltaY < 0) {
        scrollToPrevSection();
      }
    } else {
      // Allow normal rotation and zooming for large screens
      controls.enableRotate = true;
      controls.enableZoom = true;

      if (deltaY > 0) { // Scrolling down
        if (camera.position.z < 80) {
          camera.position.z += deltaY * 0.05;
          event.preventDefault();
        } else {
          isZoomedOut = true;
        }
      } else if (deltaY < 0) { // Scrolling up
        if (camera.position.z > 50) {
          camera.position.z += deltaY * 0.05;
          event.preventDefault();
        } else {
          isZoomedOut = false;
        }
      }
    }
  }

  // Scroll to next section or page
  function scrollToNextSection() {
    console.log("next");
    const nextSection = document.querySelector('.team-section'); // Ensure this matches your next section's class or ID
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Scroll to previous section or page
  function scrollToPrevSection() {
    const prevSection = document.querySelector('.prev-section'); // Ensure this matches your previous section's class or ID
    if (prevSection) {
      prevSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Show or hide "Next Section" button based on zoom level and screen size
  function showNextButton() {
    const nextButton = document.getElementById("nextButton");

    // Check screen size before showing the button
    if (window.innerWidth <= 768) {
      if (nextButton) {
        nextButton.style.display = camera.position.z >= 80 ? "block" : "none";
      }
    } else {
      // Ensure the button is hidden on larger screens
      if (nextButton) {
        nextButton.style.display = "none";
      }
    }
  }

  // Create the "Next Section" button
  const nextButton = document.createElement("button");
  nextButton.id = "nextButton";
  nextButton.classList.add("next-button");
  nextButton.textContent = "Next Section";
  document.body.appendChild(nextButton);

  // Add the event listener after the button is appended to the document
  nextButton.addEventListener("click", () => {
    scrollToNextSection();
  });

  // Styling for the button (CSS in JS)
  const style = document.createElement("style");
  style.textContent = `
    .next-button {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 15px 30px;
      font-size: 16px;
      background-color: black;
      color: white;
      border: 2px solid red;
      border-radius: 5px;
      cursor: pointer;
      z-index: 9999;
      display: none; /* Hidden by default for large screens */
    }

    .next-button:hover {
      background-color: red;
      color: black;
    }

    @media (max-width: 768px) {
      .next-button {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: block; /* Always show the button on mobile */
      }
    }
  `;
  document.head.appendChild(style);

  function animate() {
    requestAnimationFrame(animate);
    if (textModel) textModel.position.y = 10;
    controls.update();
    renderer.render(scene, camera);
    showNextButton(); // Update button visibility on each frame
  }
  animate();

  // Resize Handling (Responsive)
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    if (window.innerWidth <= 768) {
      camera.position.set(0, 10, 60);
      controls.enableRotate = false; // Disable rotation on mobile
    } else {
      camera.position.set(0, 20, 50);
      controls.enableRotate = true; // Allow rotation on larger screens
    }

    camera.updateProjectionMatrix();
  });

  // Block normal page scroll when zoomed out on desktop
  window.addEventListener('wheel', (event) => {
    if (window.innerWidth > 768 && isZoomedOut) {
      window.scrollBy(0, event.deltaY);
      event.preventDefault();
    }
  });

  // Event Listeners for touch and wheel interactions
  window.addEventListener("wheel", handleScroll, { passive: false });

  // Track touchstart and touchmove for mobile swipe gestures
  window.addEventListener("touchstart", (event) => {
    lastTouchY = event.touches[0].clientY;
  }, { passive: false });

  window.addEventListener("touchmove", (event) => {
    handleScroll(event, true); // Pass isTouch as true for touch events
    lastTouchMoveY = event.touches[0].clientY;
  }, { passive: false });
}
