import spreadsheetFactor from './spreadsheet'

import spreadsheetSecret from '../YOUR_SECRET_HERE.json'

const spreadsheetId = 'YOUR_KEY_HERE'

const printUsers = async () => {
  // You'll have to execute the function here, it'll return the functions 
  const spreadsheet = await spreadsheetFactor(spreadsheetSecret, spreadsheetId)
  
  // Usually you'll have more tables, I suggest you to create a "constants" file with all your tables defined in there.
  const TABLE_USERS = 1

  const users = await spreadsheet.getUsers(TABLE_USERS)


  console.log(users)
}

printUsers()
