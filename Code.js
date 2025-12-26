// Get all tasks
function getTasks() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ToDoList");
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const data = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
  return data.map(row => ({ id: row[0], task: row[1], status: row[2] }));
}

// Add a new task
function addTask(taskText) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ToDoList");
  const id = new Date().getTime();
  sheet.appendRow([id, taskText, "Pending"]);
  return { id, task: taskText, status: "Pending" };
}

// Update task status
function updateTaskStatus(id, status) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ToDoList");
  const data = sheet.getRange(2,1,sheet.getLastRow()-1,3).getValues();
  for(let i=0;i<data.length;i++){
    if(data[i][0]==id){
      sheet.getRange(i+2,3).setValue(status);
      return {id, status};
    }
  }
  return null;
}

// Delete a task
function deleteTask(id) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ToDoList");
  const data = sheet.getRange(2,1,sheet.getLastRow()-1,3).getValues();
  for(let i=0;i<data.length;i++){
    if(data[i][0]==id){
      sheet.deleteRow(i+2);
      return {id};
    }
  }
  return null;
}

// Update task text
function updateTaskText(id, newText) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ToDoList");
  const data = sheet.getRange(2,1,sheet.getLastRow()-1,3).getValues();
  for(let i=0;i<data.length;i++){
    if(data[i][0]==id){
      sheet.getRange(i+2,2).setValue(newText);
      return {id, task:newText};
    }
  }
  return null;
}

// Serve HTML
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('To-Do List App')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
