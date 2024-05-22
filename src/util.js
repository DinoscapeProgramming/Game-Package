function generateRandomNumbers(options, extraOptions) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "generateRandomNumbers", err: "No options were given" });
    if (!Object.keys(options).includes("count") || !options.count) return resolve({ action: "generateRandomNumbers", err: "No count was given" });
    var numbers = [];
    var number;
    while(numbers.length < (options.count * 2)) {
      number = Math.floor(Math.random() * options.count) + 1;
      if ((numbers.reduce((data, item) => (data + ((item === number) ? 1 : 0)), 0)) < 2) {
        numbers.push(number);
      }
    }
    return resolve({ action: "generateRandomNumbers", numbers });
  });
}

function generateRandomNumbersSync(options, extraOptions) {
  if (!options || Object.keys(options).length === 0) return { action: "generateRandomNumbersSync", err: "No options were given" };
  if (!Object.keys(options).includes("count") || !options.count) return { action: "generateRandomNumbersSync", err: "No count was given" };
  var numbers = [];
  var number;
  while(numbers.length < (options.count * 2)) {
    number = Math.floor(Math.random() * options.count) + 1;
    if ((numbers.reduce((data, item) => (data + ((item === number) ? 1 : 0)), 0)) < 2) {
      numbers.push(number);
    }
  }
  return { action: "generateRandomNumbersSync", numbers };
}

function dangerouslyLoopThroughData(options, extraOptions) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "dangerouslyLoopThroughData", err: "No options were given" });
    if (!Object.keys(options).includes("data") || !options.data) return resolve({ action: "dangerouslyLoopThroughData", err: "No data were given" });
    if (!Object.keys(options).includes("expectedData") || !options.expectedData) return resolve({ action: "dangerouslyLoopThroughData", err: "No expected data were given" });
    Object.entries(options.data).forEach((item, index) => {
      if (typeof item[1] === "object") {
        dangerouslyLoopThroughData({
          expectedData: options.expectedData[item[0]],
          data: item[1]
        }).then(() => {
          if (options.data.length === (index + 1)) return resolve({ action: "dangerouslyLoopThroughData", success: true });
        });
      } else {
        if (options.expectedData[item[0]] !== item[1]) return resolve({ action: "dangerouslyLoopThroughData", success: false });
        if (options.data.length === (index + 1)) return resolve({ action: "dangerouslyLoopThroughData", success: true });
      }
    });
  });
}

function dangerouslyLoopThroughDataSync(options, extraOptions) {
  if (!options || Object.keys(options).length === 0) return { action: "dangerouslyLoopThroughDataSync", err: "No options were given" };
  if (!Object.keys(options).includes("data") || !options.data) return { action: "dangerouslyLoopThroughDataSync", err: "No data were given" };
  if (!Object.keys(options).includes("expectedData") || !options.expectedData) return { action: "dangerouslyLoopThroughDataSync", err: "No expected data were given" };
  Object.entries(options.data).forEach((item) => {
    if (typeof item[1] === "object") {
      dangerouslyLoopThroughDataSync({
        expectedData: options.expectedData[item[0]],
        data: item[1]
      });
      if (options.data.length === (index + 1)) return { action: "dangerouslyLoopThroughDataSync", success: true };
    } else {
      if ((options.expectedData?.[item[0]]?.minimum && (item[1].length < options.expectedData?.[item[0]]?.minimum)) || (options.expectedData?.[item[0]]?.maximum && (options.expectedData?.[item[0]]?.maximum > 0) && (item[1].length > options.expectedData?.[item[0]]?.maximum))) return { action: "dangerouslyLoopThroughDataSync", success: false };
      if (options.data.length === (index + 1)) return { action: "dangerouslyLoopThroughDataSync", success: true };
    }
  });
}

function getQuantityOfEachItem(options, extraOptions) {
  return new Promise((resolve, reject) => {
    if (!options || Object.keys(options).length === 0) return resolve({ action: "getQuantityOfEachItem", err: "No options were given" });
    if (!Object.keys(options).includes("array") || !options.array) return resolve({ action: "getQuantityEachItem", err: "No array was given" });
    return resolve({ action: "getQuantityOfEachItem", result: options.array.reduce((data, item) => ({ ...data, ...{ [item]: (data[item] || 0) + 1 } }), {}) });
  });
}

function getQuantityOfEachItemSync(options, extraOptions) {
  if (!options || Object.keys(options).length === 0) return { action: "getQuantityOfEachItemSync", err: "No options were given" };
  if (!Object.keys(options).includes("array") || !options.array) return { action: "getQuantityEachItemSync", err: "No array was given" };
  return { action: "getQuantityOfEachItemSync", result: options.array.reduce((data, item) => ({ ...data, ...{ [item]: (data[item] || 0) + 1 } }), {}) };
}

module.exports = {
  generateRandomNumbers,
  dangerouslyLoopThroughData,
  generateRandomNumbersSync,
  dangerouslyLoopThroughDataSync,
  getQuantityOfEachItem,
  getQuantityOfEachItemSync
}
