const express = require("express");
const server = express();

// GET; // buscar algo
// POST; // criar algo
// PUT; // atualizar infos
// DELETE; // deleta alguma coisa

server.get("/teste", (req, res) => {
  return res.status(200).send({ name: "Tobinha" });
});

server.put("/teste_put", (req, res) => {
  return res.status(200).send({ name: "Tobinha PUT" });
});

server.post("/teste_post", (req, res) => {
  return res.status(200).send({ name: "Tobinha POST" });
});

server.delete("/teste_delete", (req, res) => {
  return res.status(200).send({ name: "Tobinha POST" });
});


server.listen(3000, () => console.log(`Serve on POST 3000`));
