function createRef(employees, key, value) {
  const referenceObj = {};
  for (let i = 0; i < employees.length; i++) {
    const currentEmployee = employees[i];
    if (currentEmployee.hasOwnProperty(key)) {
      referenceObj[currentEmployee[key]] = currentEmployee[value];
    }
  }
  return referenceObj;
}

module.exports = { createRef };
