import { IAuth, IAuthCreateOrUpdate } from "../../types/admin/auth.types";
import { Models } from "../../models";

/**specific resource findByKey */
export const findOneByKey = async (params: any): Promise<IAuth | null> => {
  return await Models.Admin.findOne({ ...params });
};

/**resource store */
export const Registration = async (
  data: IAuthCreateOrUpdate
): Promise<IAuth | null> => {
  const newAdmin = new Models.Admin({
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
    role: data.role,
  });
  return await newAdmin.save();
};
