import { User } from "./user.schema";


export const findLastUserId = async () => {
    const lastUser = await User.findOne({}, { id: 1, _id: -1 }).sort({
      createdAt: -1,
    });
    return lastUser?.id ? lastUser?.id.substring(4) : undefined;
  };

export const generateUserId = async () => {
    const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0');
    const incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    return incrementId;
};