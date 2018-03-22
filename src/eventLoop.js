/* 
### Event Loop by JS-like **pseudocode** (~100% compatibility except "strict mode" and `Thread` class)

### TODO:
* relevant requestIdleCallback
* events (description for microtasks?)
* setImmediate
* stack
* heap?
* ...
*/

import {
  Thread,
  isRequestAnimationFrameTime,
  isRequestIdleCallbackTime,
  reflow,
  repaint,
} from 'environment';

const tasks = [],
      microtasks = [],
      rAFtasks = [],
      rICtasks = [];

class TimeoutExecutor extends Thread {
  activeTimers = {
    length: 0,
  };
  expiredTasks = [];
  maxNestingLevel = 5;
  minDelay = 4;

  clearTimer(handle) {
    this.activeTimers[handle] = null;
  }
}

const timeoutExecutor = new TimeoutExecutor();

const createTimeout = (handler, timeout, args, repeat, previousHandle) => {
  let handle;

  if (previousHandle === undefined) {
    handle = ++timeoutExecutor.activeTimers.length;
    timeoutExecutor.activeTimers[handle] = task;
  } else {
    handle = previousHandle;
  }

  function task() {
    typeof handler === 'string' ? eval(handler) : handler(...args);
    if (repeat === true) createTimeout(handler, timeout, args, repeat, handle);
  }

  /*
    I don't know how it can be implemented by another way:
    #7 in https://www.w3.org/TR/html/webappapis.html#timer-initialization-steps
    `If the currently running task is a task that was created by this algorithm, then...`
  */
  with (handler) {
    var previosNestingLevel = nestingLevel;
  }
  const nestingLevel = previosNestingLevel === undefined ? 0 : previosNestingLevel + 1;
  task.nestingLevel = nestingLevel;

  if (nestingLevel >= timeoutExecutor.maxNestingLevel && timeout < timeoutExecutor.minDelay) {
    timeout = timeoutExecutor.minDelay;
  }

  timeoutExecutor.inParallel(async function() {
    await this.await(timeout);
    const task = this.activeTimers[handle];
    if (task !== null) this.expiredTasks.push(task);
  });

  return handle;
};

window.setTimeout = (handler, timeout, ...args) => createTimeout(handler, timeout, args, false);

window.setInterval = (handler, timeout, ...args) => createTimeout(handler, timeout, args, true);

window.clearTimeout = window.clearInterval = handle => timeoutExecutor.clearTimer(handle);

const loopExecutor = () => {
  const task = tasks.shift();
  if (task !== undefined) {
    task();
  }

  for (
    let microtask = microtasks.shift();
    microtask !== undefined;
    microtask = microtasks.shift()
  ) {
    microtask();
  }

  if (isRequestAnimationFrameTime()) {
    const rAFtasksForThisLoop = [...rAFtasks];
    for (
      let rAFtask = rAFtasksForThisLoop.shift();
      rAFtask !== undefined;
      rAFtask = rAFtasksForThisLoop.shift()
    ) {
      rAFtask();
    }
  }

  reflow();

  repaint();

  if (isRequestIdleCallbackTime()) {
    const rICtasksForThisLoop = [...rICtasks];
    for (
      let rICtask = rICtasksForThisLoop.shift();
      rICtask !== undefined;
      rICtask = rICtasksForThisLoop.shift()
    ) {
      rICtask();
    }
  }

  for (
    let expiredTasks = TimeoutExecutor.expiredTasks.shift();
    expiredTasks !== undefined;
    expiredTasks = TimeoutExecutor.expiredTasks.shift()
  ) {
    tasks.push(expiredTasks);
  }
};

export const eventLoop = () => {
  while (true) loopExecutor();
};
