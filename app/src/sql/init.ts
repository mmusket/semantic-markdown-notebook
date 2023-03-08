import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url'
import initSqlJs from 'sql.js';

// import  './libs/sql-wasm.js';
// import wasmUrl from './libs/sqljs.wasm?url'// const initSqlJs = window.initSqlJs;
const SQL = await initSqlJs({ locateFile: file => wasmUrl });

// Create a database
const db = new SQL.Database();
// NOTE: You can also use new SQL.Database(data) where
// data is an Uint8Array representing an SQLite database file


// Execute a single SQL string that contains multiple statements
let sqlstr = "CREATE TABLE hello (a int, b char); \
INSERT INTO hello VALUES (0, 'hello'); \
INSERT INTO hello VALUES (1, 'world');";
db.run(sqlstr); // Run the query without returning anything

// Prepare an sql statement
const stmt = db.prepare("SELECT * FROM hello WHERE a=:aval AND b=:bval");
// Bind values to the parameters and fetch the results of the query
const result = stmt.getAsObject({ ':aval': 1, ':bval': 'world' });
console.log(result); // Will print {a:1, b:'world'}


// const stmt2 = db.prepare("select median(value) from generate_series(1, 19);");
// while (stmt2.step()) {
//   console.log('stats!', stmt2.get());
// }

