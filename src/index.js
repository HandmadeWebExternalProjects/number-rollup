import getTargets from "./get-targets";
import draw from "./draw";

const observerConfig = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0
};

let targets,
  observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let originalDomEl = entry.target,
          target = targets.find(el => el.domElement === originalDomEl);

        runAnimation(target);

        observer.unobserve(originalDomEl);
      }
    })
  }, observerConfig);


export default (userOptions) => {
  targets = getTargets(userOptions);

  targets.forEach((target) => {
    observer.observe(target.domElement);
  });
};

const runAnimation = (target) => {
  markTargetAsActive(target.domElement, true);
  let currentNumber = target.startNumber;
  let lastIntegerWritten = 0;
  let lastRunTime = performance.now();

  const run = () => {
    const millisecondsElapsed = performance.now() - lastRunTime;

    if (millisecondsElapsed > 0) {
      currentNumber = getNewNumber(target.incrementPerMillisecond, millisecondsElapsed, currentNumber);
      const currentNumberRounded = Math.floor(currentNumber);

      if (currentNumberRounded != lastIntegerWritten) {
        draw(target, currentNumberRounded);
        lastIntegerWritten = currentNumberRounded;
      }
    }

    if (shouldAnimationContinue(currentNumber, target.direction, target.endNumber)) {
      lastRunTime = performance.now();
      requestAnimationFrame(run);
    } else {
      markTargetAsActive(target.domElement, false);
    }
  };

  run();
};

const markTargetAsActive = (domElement, isActive) => {
  const isActiveClass = "number-rollup-is-active";

  if (isActive) {
    domElement.classList.add(isActiveClass);
  } else {
    domElement.classList.remove(isActiveClass);
  }
};

const getNewNumber = (incrementPerMillisecond, millisecondsElapsed, existingNumber) => {
  const numberToIncrement = incrementPerMillisecond * millisecondsElapsed;
  const newNumber = existingNumber + numberToIncrement;

  return newNumber;
};

const shouldAnimationContinue = (currentNumber, direction, endNumber) => {
  if (direction === "ascending") {
    return currentNumber < endNumber;
  } else {
    return currentNumber > endNumber;
  }
};

/**
 * Note: we could pretty easily implement easing in/out using the formulas
 * presented here: http://gizma.com/easing/
 * It would involve changing the getNewNumer() function and, instead of
 * passing it a msElapsedSinceLastRun, we'd pass it a msElaspsedSinceStart.
 * The easing functions return the value we need for the current run.
 */
