import { Router } from "express";

import { createVeterinaryController } from "./controllers/Veterinary/createVeterinaryController";
import { createAnimalController } from "./controllers/Animals/createAnimalController";
import { listAnimalController } from "./controllers/Animals/listAnimalController";
import { createCustomerController } from "./controllers/Customer/createCustomerController";
import { listCustomerController } from "./controllers/Customer/listCustomerController";
import { createSpecieController } from "./controllers/Specie/createSpecieController";
import { ListSpecieController } from "./controllers/Specie/listSpecieController";
import { createExameController } from "./controllers/Exam/createExamController";
import { createAnimalsExameController } from "./controllers/Exam/createAnimalsExameController";
import { listCustomerAnimalController } from "./controllers/Exam/listCustomerAnimalController";
import { ListCustomerSonController } from "./controllers/Customer/listCustomerSonController";
import { GenerateAnimalSexController } from "./controllers/Animals/GenerateAnimalSexController";
import { AuthVeterinaryController } from "./controllers/Veterinary/AuthVeterinaryController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { RefreshTokenController } from "./controllers/Veterinary/RefreshTokenController";
import { hasExternalAuth } from "./middlewares/hasExternalAuth";
import { ListProductersController } from "./controllers/Exam/List/ListProductersController";
import { InsertProductersController } from "./controllers/Exam/Create/InsertProductersController";
import { CreateExameIdController } from "./controllers/Exam/Create/CreateExameIdController";
import { SendExameControllerNew } from "./controllers/Exam/SendExameControllerNew";
import { NewListExameController } from "./controllers/Exam/List/NewListExameController";

const router = Router();

router.get("/listExame", isAuthenticated, new NewListExameController().handle);

router.post(
  "/sendExame/:id",
  isAuthenticated,
  hasExternalAuth,
  new SendExameControllerNew().handle
);

router.post(
  "/createExameId",
  isAuthenticated,
  new CreateExameIdController().handle
);

router.get(
  "/listProducters/:id",
  isAuthenticated,
  new ListProductersController().handle
);

router.post(
  "/insertProducters",
  isAuthenticated,
  new InsertProductersController().handle
);

router.post("/veterinarys", new createVeterinaryController().handle);

router.post(
  "/createanimal",
  isAuthenticated,
  new createAnimalController().handle
);

router.get("/listanimal", isAuthenticated, new listAnimalController().handle);

router.post(
  "/createCustomer",
  isAuthenticated,
  hasExternalAuth,
  new createCustomerController().handle
);

router.get(
  "/listCustomer",
  isAuthenticated,
  new listCustomerController().handle
);

router.post(
  "/createSpecie",
  isAuthenticated,
  new createSpecieController().handle
);

router.get("/listSpecie", isAuthenticated, new ListSpecieController().handle);

router.post(
  "/exameCreate",
  isAuthenticated,
  new createExameController().handle
);

router.post(
  "/insertAnimal",
  isAuthenticated,
  new createAnimalsExameController().handle
);

router.get(
  "/listCustomerExam/:id",
  isAuthenticated,
  new listCustomerAnimalController().handle
);

router.get(
  "/listCustomerSon/:id_especie_animal",
  isAuthenticated,
  new ListCustomerSonController().handle
);

router.post(
  "/generates",
  isAuthenticated,
  new GenerateAnimalSexController().handle
);


router.post("/refresh", new RefreshTokenController().handle);

router.post("/session", new AuthVeterinaryController().handle);

export { router };
