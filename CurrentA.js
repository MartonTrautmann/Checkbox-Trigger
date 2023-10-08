function onEdit(e) {
    try {
      var sheet = e.source.getActiveSheet();
      var range = e.range;
  
      // Check if the edited cell is in column D (checkbox column) on "DataA" sheet
      if (sheet.getName() == "DataA" && range.getColumn() == 4) {
        var row = range.getRow();
        var isChecked = range.getValue();
        var timeZone = "GMT+2";
        var timestamp = new Date();
  
        if (isChecked) {
          // Format the date and time as "YYYY.MM.DD HH:mm"
          var formattedTimestamp = Utilities.formatDate(timestamp, timeZone, "yyyy.MM.dd HH:mm");
  
          sheet.getRange(row, 5).setValue(formattedTimestamp);
  
          // Get the entire row's values
          var rowData = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
  
          // Append the formatted timestamp to the rowData
          rowData.push();
  
          // Open the "Destination" Google Sheets file by ID
          var destinationSpreadsheet = SpreadsheetApp.openById("1XSBcj4OLvVS5RWJDo8CfD1B4VTTWe0ExQDZpar4qLes");
  
          // Get the "DataB" sheet in the "Destination" file
          var targetSheet = destinationSpreadsheet.getSheetByName("DataC");
  
          // Append the rowData to the "DataB" sheet in the "Destination" file
          targetSheet.appendRow(rowData);
  
          // Send an email with the checked row's data
          var emailAddress = "marton.trautmann@nanushka.com"; // Enter the recipient's email address
          var subject = "Checked Row Data";
          var message = "The following row data was checked and copied:\n\n" + rowData.join("\n");
  
          MailApp.sendEmail({
            to: emailAddress,
            subject: subject,
            body: message
          });
  
        } else {
          // Task unchecked, clear the timestamp in column E
          sheet.getRange(row, 5).clearContent();
  
  
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
              // Delete the corresponding row in "DataC"
              targetSheet.deleteRow(i + 2); // Adding 2 to account for the header row and 0-based index
              break; // Exit the loop once the row is deleted
            }
          }
  
           // Send an email with the deleted row's data
          var emailAddress = "marton.trautmann@nanushka.com"; // Enter the recipient's email address
          var subject = "Deleted Row Data";
          var message = "The following row data was deleted:\n\n" + deletedRowData.join("\n");
  
          MailApp.sendEmail({
            to: emailAddress,
            subject: subject,
            body: message
          });
        }
      }
  
    } catch (error) {
      Logger.log(error); // Log any errors for debugging
    }
  }