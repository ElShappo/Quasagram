/*
  dependencies
*/

let busboy = require("busboy");
let path = require("path");
let os = require("os");
let fs = require("fs");
let UUID = require("uuid-v4");

const express = require("express");
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

/*
  config - express
*/

const app = express();

/*
  config - firebase
*/

const serviceAccount = require("./quasagram-6b4de-8e066134a44f.json");

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "quasagram-6b4de.appspot.com",
});

const db = getFirestore();
const bucket = getStorage().bucket();

/*
  endpoint - posts
*/

app.get("/posts", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  let posts = [];
  db.collection("posts")
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
        posts.push(doc.data());
      });
      response.send(posts);
    });
});

/*
  endpoint - createPost
*/

app.post("/createPost", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  console.log("POST request");
  const bb = busboy({ headers: request.headers });

  let fields = {};
  let fileData = {};

  let uuid = UUID();

  bb.on("file", (name, file, info) => {
    const { filename, encoding, mimeType } = info;

    let filepath = path.join(os.tmpdir(), filename);
    file.pipe(fs.createWriteStream(filepath));

    fileData = { filepath, mimeType };

    console.log("Resulting filepath: ", filepath);

    file
      .on("data", (data) => {
        console.log(`File [${name}] got ${data.length} bytes`);
      })
      .on("close", () => {
        console.log(`File [${name}] done`);
      });
  });

  bb.on("field", (name, val, info) => {
    fields[name] = val;
  });

  bb.on("close", () => {
    console.log("Done parsing form!");
    console.log(fields);
    console.log("Unique id: ", uuid);

    bucket.upload(
      fileData.filepath,
      {
        uploadType: "media",
        metadata: {
          metadata: {
            contentType: fileData.mimeType,
            firebaseStorageDownloadTokens: uuid,
          },
        },
      },
      (err, uploadedFile) => {
        if (!err) {
          db.collection("posts")
            .doc(fields.id)
            .set({
              id: fields.id,
              caption: fields.caption,
              location: fields.location,
              date: parseInt(fields.date),
              imageUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`,
            })
            .then(() =>
              response.send(`Post with id=${fields.id} successfully added`)
            );
        }
      }
    );
  });
  request.pipe(bb);
});

/*
  listen
*/

app.listen(3000, () => {
  console.log(`Server is listening on some port`);
});
