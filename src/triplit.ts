import { type Models, Schema as S } from '@triplit/db';
import {DB, IndexedDbExperimentalKVStore} from '@triplit/entity-db'
import TODOS from './data/todos.json' with { type: 'json' };
import USERS from './data/users.json' with { type: 'json' };

export const schema = {
  todos: {
    schema: S.Schema({
      id: S.Id(),
      text: S.String(),
      done: S.Boolean({ default: false }),
      assignee_id: S.String({ nullable: true }),
      assignee: S.RelationById('users', '$assignee_id'),
    }),
  },
  users: {
    schema: S.Schema({
      id: S.Id(),
      name: S.String(),
    }),
  },
} satisfies Models<any, any>;

const idbStorage = new IndexedDbExperimentalKVStore('triplit', { batchSize: 10000 });
const db = new DB({schema: {collections: schema}, kv:idbStorage});

export async function seedTriplit() : Promise<number>{
  const start = performance.now();
  console.log('seeding triplit...');
  {
    const t = performance.now();
    await db.transact(async (tx)=>{
      for (const todo of TODOS) {
        await tx.insert('todos', todo);
      }
    })
    console.log(`inserting ${TODOS.length} todos took`, performance.now() - t, 'ms');
  }
  {
    const t = performance.now();
    await db.transact(async (tx)=>{
      for (const user of USERS) {
        await tx.insert('users', user);
      }
    });
    console.log(`inserting ${USERS.length} took`, performance.now() - t, 'ms');
  }
  return Math.round(performance.now() - start);
}

export async function fetchTodosFromTriplit():Promise<number>{
  const start = performance.now();

  console.log('fetching from triplit...');
  const t = performance.now();
  const results = await db.fetch(db.query('todos').where('done', '=', true).build())
  console.log(`fetching ${results.length} todos took`, performance.now() - t, 'ms');
  console.log('results', results);
  return Math.round(performance.now() - start);
}