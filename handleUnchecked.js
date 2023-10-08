// Function to handle the logic when the checkbox is unchecked
function handleCheckboxUnchecked(sheet, row) {
    // Checkbox is unchecked, delete the corresponding row in "DataC" based on ID
  
    // Get the ID (first data in the row)
    var id = sheet.getRange(row, 1).getValue();
  
    // Open the "Destination" Google Sheets file by ID
    var destinationSpreadsheet = SpreadsheetApp.openById("1XSBcj4OLvVS5RWJDo8CfD1B4VTTWe0ExQDZpar4qLes");
  
    // Get the "DataC" sheet in the "Destination" file
    var targetSheet = destinationSpreadsheet.getSheetByName("DataC");
  
    // Find the row with the matching ID in "DataC" and delete it
    var dataCValues = targetSheet.getRange(2, 1, targetSheet.getLastRow() - 1, 1).getValues();
    for (var i = 0; i < dataCValues.length; i++) {
      if (dataCValues[i][0] == id) {
        // Get the deleted row's data
        var deletedRowData = targetSheet.getRange(i + 2, 1, 1, targetSheet.getLastColumn()).getValues()[0];
  
        // Delete the corresponding row in "DataC"
        targetSheet.deleteRow(i + 2); // Adding 2 to account for the header row and 0-based index
  
        // Send an email with the deleted row's data
        var emailAddress = "marton.trautmann@nanushka.com"; // Enter the recipient's email address
        var subject = "Deleted Row Data";
        var message = "The following row data was deleted:\n\n" + deletedRowData.join("\n");
  
        MailApp.sendEmail({
          to: emailAddress,
          subject: subject,
          body: message
        });
  
        // Clear the timestamp in column E in "DataB"
        sheet.getRange(row, 5).clearContent();
        break; // Exit the loop once the row is deleted
      }
    }
  }
  
  