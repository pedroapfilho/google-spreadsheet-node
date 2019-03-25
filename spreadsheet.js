import GoogleSpreadsheet from 'google-spreadsheet'

import { promisify } from 'util'

const spreadsheetFactor = (spreadsheetSecret, spreadsheetId) => {
  // Here I initialize the GoogleSpreadsheet class with the spreadsheetId
  const spreadsheet = new GoogleSpreadsheet(spreadsheetId)

  // This function is "private"
  // It'll get the rows of the table
  const getRows = async table => {

    // This one is one of the most important ones.. You'll have to put this on every
    // private call like: getColumns or whatever, because it authenticate all your
    // future calls to this spreadsheet
    await promisify(spreadsheet.useServiceAccountAuth)(spreadsheetSecret)

    // This one is the actual call to get thr rows
    return promisify(spreadsheet.getRows)(table)
  }

  return {

    // This function is "public"
    // This one is just an example on how to add new calls, on this one I created a table 
    // of users, that have some properties (id, email, pass and phone)
    getUsers: async (table) => {
      const rows = await getRows(table)

      // If you really want to use these data, map through it and return only what you need.
      // Usually you'll receive a lot of unnecessary data
      return rows.map(row => ({
        id: Number(row.id),
        email: String(row.email),
        pass: String(row.pass),
        phone: String(row.phone),
      }))
    }
  }
}

export default spreadsheetFactor
