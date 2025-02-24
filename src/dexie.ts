import Dexie from 'dexie';
import TODOS from './data/todos.json' with { type: 'json' };
import USERS from './data/users.json' with { type: 'json' };
// Define the database
const db = new Dexie('TodoDatabase');

// Define database schema
db.version(2).stores({
	todos: 'id',
	users: 'id',
});

var all = Dexie.Promise.all;

export async function seedDexie(): Promise<number>{
  const start = performance.now();
  console.log('seeding dexie...');
  {
    const t = performance.now();
    await db.todos.bulkAdd(TODOS);
    console.log(`inserting ${TODOS.length} todos took`, performance.now() - t, 'ms');
  }
  {
    const t = performance.now();
    await db.users.bulkAdd(USERS);
    console.log(`inserting ${USERS.length} took`, performance.now() - t, 'ms');
  }
  return Math.round(performance.now() - start);
}

export async function fetchTodosFromDexie():Promise<number>{
  console.log('fetching from dexie...');
  const t = performance.now();
  const results = await db.todos.filter((todo) => todo.done).toArray();
  console.log(`fetching ${results.length} completed todos took`, performance.now() - t, 'ms');
  console.log('results', results);
  return Math.round(performance.now() - t);
}
