import express from 'express';
import { petController } from './pet.controller';
const router = express.Router();
router.post('/create-pet', petController.createPet);
router.get('/get-pet/:id', petController.getSinglePet);
router.patch('/update-pet/:id', petController.updatePet);
router.delete('/delete-pet/:id', petController.deletePet);
router.get('/get-pets', petController.getAllPets);
export const PetRoutes = router;