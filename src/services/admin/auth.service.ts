import { IAuth, IAuthCreateOrUpdate } from "../../types/admin/auth.types";
import { Admin } from "../../models/admin.model";

/**specific resource findByKey */
const findOneByKey = async (params: any): Promise<IAuth | null> => {
  return await Admin.findOne({ ...params });
};

/**resource store */
const Registration = async ({
  data,
}: {
  data: IAuthCreateOrUpdate;
}): Promise<IAuth | null> => {
  const newAdmin = new Admin({
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
    role: data.role,
  });
  return await newAdmin.save();
};

export const adminAuthService = {
  findOneByKey,
  Registration,
};
