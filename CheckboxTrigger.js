function onEdit(e) {
    try {
      var sheet = e.source.getActiveSheet();
      var range = e.range;
  
      // Check if the edited cell is in column D (checkbox column) on "DataA" sheet
      if (sheet.getName() == "DataA" && range.getColumn() == 4) {
        var row = range.getRow();
        var isChecked = range.getValue();
        var timestamp = new Date();
  
        if (isChecked) {
          // Format the date and time as "YYYY.MM.DD HH:mm"
          var formattedTimestamp = Utilities.formatDate(timestamp, "GMT", "yyyy.MM.dd HH:mm");
  
          // Get the entire row's values
          var rowData = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
  
          // Append the formatted timestamp to the rowData
          rowData.push(formattedTimestamp);
  
          // Open the "Destination" Google Sheets file by ID
          var destinationSpreadsheet = SpreadsheetApp.openById("1XSBcj4OLvVS5RWJDo8CfD1B4VTTWe0ExQDZpar4qLes");
  
          // Get the "DataB" sheet in the "Destination" file
          var targetSheet = destinationSpreadsheet.getSheetByName("DataB");
  
          // Append the rowData to the "DataB" sheet in the "Destination" file
          targetSheet.appendRow(rowData);
  
          // Send an email with the checked row's data
          var emailAddress = "trautmann.marton.bence1995@gmail.com"; // Enter the recipient's email address
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
        }
      }
    } catch (error) {
      Logger.log(error); // Log any errors for debugging
    }
  }
  