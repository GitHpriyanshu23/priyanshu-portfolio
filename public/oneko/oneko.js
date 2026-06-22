// oneko.js: https://github.com/adryd325/oneko.js

(function oneko() {
  const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  if (isReducedMotion) return;

  const nekoEl = document.createElement("div");
  let persistPosition = true;

  let nekoPosX = 32;
  let nekoPosY = 32;
  
  let mousePosX = 0;
  let mousePosY = 0;

  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;
  let isAsleep = false;
  let sleepAnimationFrame = 0;
  let wakeHintEl = null;
  let zzzEl = null;
  let wakeText = "Wake up Mowgli";
  let petName = "";
  let nekoFile = "./oneko.gif";
  let sleepFile = "./oneko/mowgli-sleep.png";

  const nekoSpeed = 10;
  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  function init() {
    nekoFile = "./oneko.gif";
    const curScript = document.currentScript;
    if (curScript && curScript.dataset.cat) {
      nekoFile = curScript.dataset.cat;
    }
    if (curScript && curScript.dataset.sleep) {
      sleepFile = curScript.dataset.sleep;
    }
    if (curScript && curScript.dataset.persistPosition) {
      if (curScript.dataset.persistPosition === "") {
        persistPosition = true;
      } else {
        persistPosition = JSON.parse(curScript.dataset.persistPosition.toLowerCase());
      }
    }
  
    let loadedFromStorage = false;

    if (persistPosition) {
      let storedNeko = JSON.parse(window.localStorage.getItem("oneko"));
      if (storedNeko !== null) {
        nekoPosX = storedNeko.nekoPosX;
        nekoPosY = storedNeko.nekoPosY;
        mousePosX = storedNeko.mousePosX;
        mousePosY = storedNeko.mousePosY;
        frameCount = storedNeko.frameCount;
        idleTime = storedNeko.idleTime;
        idleAnimation = storedNeko.idleAnimation;
        idleAnimationFrame = storedNeko.idleAnimationFrame;
        nekoEl.style.backgroundPosition = storedNeko.bgPos;
        loadedFromStorage = true;
      }
    }

    if (!loadedFromStorage && curScript && curScript.dataset.spawnX && curScript.dataset.spawnY) {
      nekoPosX = Number(curScript.dataset.spawnX);
      nekoPosY = Number(curScript.dataset.spawnY);
      mousePosX = nekoPosX;
      mousePosY = nekoPosY;
    }
  
    if (curScript && curScript.dataset.name) {
      petName = curScript.dataset.name;
      nekoEl.id = "mowgli";
      nekoEl.title = petName;
      nekoEl.setAttribute("aria-label", petName);
    } else {
      nekoEl.id = "oneko";
      nekoEl.ariaHidden = true;
    }
    if (curScript && curScript.dataset.wakeText) {
      wakeText = curScript.dataset.wakeText;
    }
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "auto";
    nekoEl.style.cursor = "pointer";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = 2147483647;

    nekoEl.style.backgroundImage = `url(${nekoFile})`;
    
    document.body.appendChild(nekoEl);

    wakeHintEl = document.createElement("div");
    wakeHintEl.id = "mowgli-wake-hint";
    wakeHintEl.textContent = wakeText;
    document.body.appendChild(wakeHintEl);

    zzzEl = document.createElement("div");
    zzzEl.id = "mowgli-zzz";
    zzzEl.innerHTML = "<span>z</span><span>z</span><span>z</span>";
    document.body.appendChild(zzzEl);

    nekoEl.addEventListener("click", function (event) {
      event.stopPropagation();
      if (isAsleep) {
        wakeUp();
      } else {
        goToSleep();
      }
    });

    nekoEl.addEventListener("mouseenter", function () {
      if (isAsleep) {
        nekoEl.title = "";
        positionWakeHint();
        wakeHintEl.style.display = "block";
      }
    });

    nekoEl.addEventListener("mouseleave", function () {
      wakeHintEl.style.display = "none";
      if (isAsleep && petName) {
        nekoEl.title = petName;
      }
    });

    document.addEventListener("mousemove", function (event) {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    });
    
    if (persistPosition) {
      window.addEventListener("beforeunload", function (event) {
        window.localStorage.setItem("oneko", JSON.stringify({
          nekoPosX: nekoPosX,
          nekoPosY: nekoPosY,
          mousePosX: mousePosX,
          mousePosY: mousePosY,
          frameCount: frameCount,
          idleTime: idleTime,
          idleAnimation: idleAnimation,
          idleAnimationFrame: idleAnimationFrame,
          bgPos: nekoEl.style.backgroundPosition
        }));
      });
    }
    
    window.requestAnimationFrame(onAnimationFrame);
  }

  let lastFrameTimestamp;

  function onAnimationFrame(timestamp) {
    // Stops execution if the neko element is removed from DOM
    if (!nekoEl.isConnected) {
      return;
    }
    if (!lastFrameTimestamp) {
      lastFrameTimestamp = timestamp;
    }
    if (timestamp - lastFrameTimestamp > 100) {
      lastFrameTimestamp = timestamp;
      frame();
    }
    window.requestAnimationFrame(onAnimationFrame);
  }

  function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function positionWakeHint() {
    if (!wakeHintEl) return;
    wakeHintEl.style.left = `${nekoPosX - 24}px`;
    wakeHintEl.style.top = `${nekoPosY + 22}px`;
  }

  function positionZzz() {
    if (!zzzEl) return;
    zzzEl.style.left = `${nekoPosX - 2}px`;
    zzzEl.style.top = `${nekoPosY - 26}px`;
  }

  function applySleepPose() {
    nekoEl.style.backgroundImage = `url(${sleepFile})`;
    nekoEl.style.backgroundPosition = "0 0";
    nekoEl.style.backgroundSize = "32px 32px";
  }

  function applyAwakePose() {
    nekoEl.style.backgroundImage = `url(${nekoFile})`;
    nekoEl.style.backgroundSize = "";
  }

  function goToSleep() {
    isAsleep = true;
    sleepAnimationFrame = 0;
    idleAnimation = null;
    idleAnimationFrame = 0;
    idleTime = 0;
    nekoEl.classList.add("is-asleep");
    nekoEl.setAttribute("aria-label", wakeText);
    applySleepPose();
    if (zzzEl) {
      positionZzz();
      zzzEl.style.display = "block";
    }
  }

  function wakeUp() {
    isAsleep = false;
    sleepAnimationFrame = 0;
    resetIdleAnimation();
    idleTime = 0;
    nekoEl.classList.remove("is-asleep");
    wakeHintEl.style.display = "none";
    if (zzzEl) {
      zzzEl.style.display = "none";
    }
    applyAwakePose();
    if (petName) {
      nekoEl.title = petName;
      nekoEl.setAttribute("aria-label", petName);
    }
    setSprite("alert", 0);
  }

  function renderSleeping() {
    applySleepPose();
    positionZzz();
  }

  function idle() {
    idleTime += 1;

    // every ~ 20 seconds
    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) == 0 &&
      idleAnimation == null
    ) {
      let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
      if (nekoPosX < 32) {
        avalibleIdleAnimations.push("scratchWallW");
      }
      if (nekoPosY < 32) {
        avalibleIdleAnimations.push("scratchWallN");
      }
      if (nekoPosX > window.innerWidth - 32) {
        avalibleIdleAnimations.push("scratchWallE");
      }
      if (nekoPosY > window.innerHeight - 32) {
        avalibleIdleAnimations.push("scratchWallS");
      }
      idleAnimation =
        avalibleIdleAnimations[
          Math.floor(Math.random() * avalibleIdleAnimations.length)
        ];
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192) {
          resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  function frame() {
    frameCount += 1;

    if (isAsleep) {
      renderSleeping();
      if (wakeHintEl && wakeHintEl.style.display === "block") {
        positionWakeHint();
      }
      return;
    }

    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < nekoSpeed || distance < 48) {
      idle();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);
      // count down after being alerted before moving
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    let direction;
    direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    setSprite(direction, frameCount);

    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  }

  init();
})();
