import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../shared/interfaces/common";
import { IPaginationOption } from "../../../shared/interfaces/pagination";
import { productSearchableFields } from "./product.constant";
import { IProduct, IProductDocument, IProductFilter } from "./product.interface";
import { Product } from "./product.schema";

const createProductService = async (product: IProduct): Promise<IProduct | null> => {
  const addedProduct = Product.create(product);
  return addedProduct;
};
const getProducts = async (
  filters: IProductFilter,
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IProduct[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  // this function working like the above structure for `SearchTerm`
  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map(field => ({
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

  const result = await Product.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Product.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleProduct = async (
  id: string
): Promise<IProduct | null> => {
  const result = Product.findById(id);
  return result;
};

const updateProductById = async (
  id: string,
  payload: Partial<IProduct>
): Promise<IProduct | null> => {

  const result = await Product.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return result;
};

const deleteProductById = async (
  id: string  
): Promise<IProductDocument | null> => {
  const result = await Product.findByIdAndDelete(id).lean().exec() as IProductDocument;
  return result;
};

export const ProductServices = {
  createProductService,
  getProducts,
  getSingleProduct,
  updateProductById,
  deleteProductById
};