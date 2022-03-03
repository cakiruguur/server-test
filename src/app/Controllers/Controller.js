// @TODO Controller inheritance olayını araştır

// const httpStatus = require("http-status");


// class Controller {
//   constructor(serv) {
//     this.serv = serv;
//   }

//   index(req, res) {
//     this.serv.list()
//       .then((response) => {
//         res.status(httpStatus.OK).send(response);
//       })
//       .catch((err) => {
//         res.send(err);
//       });
//   }

//   find(req, res) {
//     this.service
//       .findById(req.params.id)
//       .then((response) => {
//         res.status(httpStatus.OK).send(response);
//       })
//       .catch((err) => {
//         res.send(err);
//       });
//   }

//   create(req, res) {
//     this.service
//       .insert(req.body)
//       .then((response) => {
//         res.send(response);
//       })
//       .catch((e) => {
//         res.send(e);
//       });
//   }

//   delete(req, res) {
//     this.service
//       .destroy(req.params.id)
//       .then((response) => {
//         res.status(httpStatus.OK).send(response);
//       })
//       .catch((err) => {
//         res.send(e);
//       });
//   }
// }

// module.exports = Controller;
