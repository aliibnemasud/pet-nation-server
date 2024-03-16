import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PetServices } from "./pet.services";
import pick from "../../../shared/pick";
import { petSearchableFields } from "./pet.constant";
import { paginationFields } from "../../constants/pagination";
import sendResponse from "../../../shared/sendResponse";
import { IPet } from "./pet.interface";
import httpStatus from "http-status";
const createPet = catchAsync(async (req: Request, res: Response) => {
    const petRequest = req.body;
    const createdPet = await PetServices.createPetService(petRequest);
    res.send({
        success: true,
        message: 'Pet created successfully!',
        data: createdPet,
    });
});

const getAllPets: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const filters: any = pick(req.query, petSearchableFields);
        const paginationOptions = pick(req.query, paginationFields);
        const result = await PetServices.getAllPet(
            filters,
            paginationOptions
        );
        sendResponse<IPet[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'All Pet data retrieved!',
            data: result.data,
            meta: result.meta,
        });
    }
);

const getSinglePet = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await PetServices.getSinglePet(id);
    sendResponse<IPet>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Pet data retrieved!',
        data: result,
    });
});

const updatePet = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await PetServices.updatePetById(id, payload);

    sendResponse<IPet>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Pet data Updated!',
        data: result,
    });
});


const deletePet = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await PetServices.deletePetById(id);
    sendResponse<IPet>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Pet deleted successfully!',
        data: result,
    });
});

export const petController = {
    createPet,
    getAllPets,
    getSinglePet,
    updatePet,
    deletePet
}