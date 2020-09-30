/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
const createEmployeeRecord = function(element) {
  return {
    firstName: element[0],
    familyName: element[1],
    title: element[2],
    payPerHour: element[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = function(employeeData) {
  return employeeData.map(function(element) {
    return createEmployeeRecord(element)
  })
}

const createTimeInEvent = function(dateTime) {
  let [date, hour] = dateTime.split(' ')
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  })
  return this
}

const createTimeOutEvent = function(dateTime) {
  let [date, hour] = dateTime.split(' ')
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  })
  return this
}

const hoursWorkedOnDate = function(workDay) {
  let clockIn = this.timeInEvents.find(function(t){
    return t.date === workDay
  })
  let clockOut = this.timeOutEvents.find(function(t){
    return t.date === workDay
  })
  return (clockOut.hour - clockIn.hour) / 100
}

const wagesEarnedOnDate = function(workDay) {
  let wage = hoursWorkedOnDate.call(this, workDay)
    * this.payPerHour
    return parseFloat(wage.toString())
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const calculatePayroll = function(employeesArray) {
  return employeesArray.reduce(function(memo, rec){
    return memo + allWagesFor.call(rec)
  }, 0)
}

const findEmployeeByFirstName = function(collection, firstNameString) {
  return collection.find(function(record){
    return record.firstName === firstNameString
  })
}
