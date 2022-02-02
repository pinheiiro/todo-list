import { clientPromise, db } from '../client';

clientPromise

db.createCollection("tasks", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["task"],
            properties: {
                task: {
                    bsonType: "string",
                    description: "campo obrigatório"
                },
                completed: {
                    bsonType: "bool",
                    default: false
                }
            }
        }
    }
})