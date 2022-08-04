import Api from "src/utils/customApi";
import { useState, useEffect } from "react";
import { getAccess } from "src/Auth/tokenManager";

const TrashInfoApi = (itemID: any, userIdToRedux: any) => {
  const [imgUrl, setImgUrl] = useState("");
  const [trashKinds, setTrashKinds] = useState([]);
  const trashKindList: any = [];
  const what: any = getAccess();
  useEffect(() => {
    Api.get(`/trash/users/${userIdToRedux}/images/${itemID}/kinds`, {
      headers: {
        Authorization: `${what.value}`,
      },
    }).then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        trashKindList.push(response.data[i].kind);
      }
      console.log(trashKindList);
      setTrashKinds(trashKindList);
    });

    Api.get(`/trash/users/${userIdToRedux}/images/${itemID}`, {
      headers: {
        Authorization: `${what.value}`,
      },
    }).then(function (response) {
      console.log(response.data.image);
      setImgUrl(response.data.image);
    });
  }, []);

  return { imgUrl, trashKinds };
};

export default TrashInfoApi;
