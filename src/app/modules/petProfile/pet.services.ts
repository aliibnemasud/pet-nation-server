import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../shared/interfaces/common";
import { IPaginationOption } from "../../../shared/interfaces/pagination";
import { petSearchableFields } from "./pet.constant";
import { IPet, IPetDocument, IPetFilter } from "./pet.interface";
import { Pet } from "./pet.schema";
const createPetService = async (pet: IPet): Promise<IPet | null> => {
    const addedOrder = Pet.create(pet);
    return addedOrder;
};
const getAllPet = async (
    filters: IPetFilter,
    paginationOption: IPaginationOption
): Promise<IGenericResponse<IPet[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const andConditions = [];
    // this function working like the above structure for `SearchTerm`
    if (searchTerm) {
        andConditions.push({
            $or: petSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // This function is working for exact match.
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // if search with everything or an empty object
    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};
    const { limit, page, skip, sortBy, sortOrder } =
        paginationHelper.calculatePagination(paginationOption);
    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = await Pet.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await Pet.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const getSinglePet = async (
    id: string
): Promise<IPet | null> => {
    const result = Pet.findById(id);
    return result;
};
const updatePetById = async (
    id: string,
    payload: Partial<IPet>
): Promise<IPet | null> => {

    const result = await Pet.findByIdAndUpdate(
        { _id: id },
        payload,
        { new: true }
    );
    return result;
};
const deletePetById = async (
    id: string
): Promise<IPetDocument | null> => {
    const result = await Pet.findByIdAndDelete(id).lean().exec() as IPetDocument;
    return result;
};
export const PetServices = {
    createPetService,
    getAllPet,
    getSinglePet,
    updatePetById,
    deletePetById
}