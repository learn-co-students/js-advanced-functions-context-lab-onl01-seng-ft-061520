function createEmployeeRecord(array){
  let empObj = {};
  empObj.firstName = array[0];
  empObj.familyName = array[1];
  empObj.title = array[2];
  empObj.payPerHour = array[3];
  empObj.timeInEvents = [];
  empObj.timeOutEvents = [];
  return empObj;
}

function createEmployeeRecords(array){
  const records = [];
  array.forEach(row => records.push(createEmployeeRecord(row)));
  return records;
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}


function createTimeOutEvent(date){
  let timeOutEvent = {};
  const time = date.split(' ')
  timeOutEvent.type = "TimeOut";
  timeOutEvent.hour = parseInt(time[1]);
  timeOutEvent.date = time[0];
  this.timeOutEvents.push(timeOutEvent);
  return this;
}

function hoursWorkedOnDate(date){
  const timeIn = this.timeInEvents.find(e => e.date === date);
  const timeOut = this.timeOutEvents.find(e => e.date === date);
  const hoursWorked = timeOut.hour - timeIn.hour
  return hoursWorked/100;
}

function wagesEarnedOnDate(date){
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

// function allWagesFor(empObj){
//   const dates = [];
//   empObj.timeInEvents.forEach(e => dates.push(e.date));
//   let wages = dates.map(d => wagesEarnedOnDate(empObj, d));
//   return wages.reduce(function(total, element){ return element + total},0);
// }

function findEmployeeByFirstName(array, firstName){
  return array.find(obj => obj.firstName === firstName);
}

function calculatePayroll(array){
  const payOuts = array.map(empObj => allWagesFor.call(empObj));
  return payOuts.reduce(function(total, element){ return element + total},0);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
