import Api from "./customApi";
import { getAccess } from "src/Auth/tokenManager";
import { rs } from "../utils/types";

const what: any = getAccess();
let user_autosave: rs.AutoSave;

const isAutoSave = async () => {
  await Api.get(`/users/autosave`, {
    headers: {
      Authorization: `${what.value}`,
    },
  }).then((res) => {
    user_autosave = res.data;

    return user_autosave;
  });
  return user_autosave;
};

const changeAutoSave = async (isBoolean: boolean) => {
  await Api.patch(`/users/autosave`, isBoolean, {
    headers: {
      Authorization: `${what.value}`,
    },
  }).then((res) => {
    user_autosave = res.data;

    return user_autosave;
  });
  return user_autosave;
};

export { isAutoSave, changeAutoSave };
