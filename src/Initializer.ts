import { SupabaseRepo } from "./model/SupabaseRepo";

function model() {
    return function createTableFromJSClass(cls: { new (): any }) {
        // get the class name as the table name
        let tableName = cls.name.toLowerCase();
        // get the class properties as an array of strings
        let properties = Object.getOwnPropertyNames(cls.prototype);
        // remove the constructor property as it is not needed for the table
        properties.splice(properties.indexOf("constructor"), 1);
        // initialize an empty array to store the column definitions
        let columns: string[] = [];
        // loop through the properties and generate the column definitions
        for (let prop of properties) {
          // get the data type of the property value
          let type = typeof cls.prototype[prop];
          // map the data type to a SQL data type
          let sqlType: string;
          switch (type) {
            case "string":
              sqlType = "TEXT";
              break;
            case "number":
              sqlType = "NUMERIC";
              break;
            case "boolean":
              sqlType = "BOOLEAN";
              break;
            case "function":
              // skip the methods as they are not needed for the table
              continue;
            default:
              // throw an error if the data type is not supported
              throw new Error(`Unsupported data type: ${type}`);
          }
          // add the column definition to the array
          columns.push(`${prop} ${sqlType}`);
        }
        // join the column definitions with commas
        let columnString = columns.join(", ");
        // return the SQL query string to create the table
        return `CREATE TABLE ${tableName} (${columnString});`;
      }
}




  