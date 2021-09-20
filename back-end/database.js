const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const database = 'MongoDB';
var db;

//Connecting to the database
async function connect() {

  //Uses connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  db = client.db(database);

  return 'done';
}

function insertAlarm(alarm) {
  console.log("CHEGUEI NO INSERT");
  const alarmToInsert = alarm;
  console.log({ alarmToInsert: alarmToInsert });  

  console.log("VOU INSERIR AGORA");      
  try {
    db.collection("alarm").insertOne(alarmToInsert,
      {
        ordered: false
      }
    );
  } catch (error) {
    console.log(error);
  };

}

async function getAllDocuments() {

  console.log("CHEGUEI AQUI");
  await connect();
  return await db.collection("alarm").find({}).toArray(function (error, result) {
    if (error) console.log({ error });
    console.log(result);
    return result;
  });


}

module.exports = { insertAlarm, getAllDocuments }