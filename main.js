function onEdit(e) {
  try {
    var sheet = e.source.getActiveSheet();
    var range = e.range;

    // Check if the edited cell is in column D (checkbox column) on "DataB" sheet
    if (sheet.getName() == "DataB" && range.getColumn() == 4) {
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

        // Call a function from another script file to handle the logic for checking the checkbox
        handleCheckboxChecked(rowData);

      } else {
        // Checkbox is unchecked, call a function from another script file to handle the logic for unchecked checkbox
        handleCheckboxUnchecked(sheet, row);
      }
    }
  } catch (error) {
    Logger.log(error); // Log any errors for debugging
  }
}
