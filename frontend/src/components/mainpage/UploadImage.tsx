import { Button, Typography, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import Api from "../../utils/customApi";
import { ReduxModule } from "../../modules/ReduxModule";

import { useDispatch } from "react-redux";
import { save_ID } from "../../actions/ImgIDActions";

function UploadImage() {
  const [isImg, setIsImg] = useState(null);
  const [urlImg, setUrlImg] = useState("");
  const [respondImg, setRespondImg] = useState(null);
  const navigate = useNavigate();
  const userIdtoRedux = ReduxModule().decodeInfo?.id;
  console.log(userIdtoRedux, "in uploadImage");

  const resizeFile = (file: Blob) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500, // max width
        250, // max height
        "JPEG",
        513, // min width
        0, // min height
        (uri) => {
          resolve(uri);
        },
        "file" // 저장 형식
      );
    });

  //❌

  const dispatch = useDispatch();

  //❌

  const onChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file: any =
        event.target.files instanceof FileList ? event.target.files[0] : null;

      setRespondImg(file);

      const img: any = await resizeFile(file);
      setIsImg(img);
      setUrlImg(URL.createObjectURL(img));
      console.log("success upload image!");
    } catch (err) {
      console.log(err);
    }
  };

  const sendImage: () => Promise<any> = async () => {
    const trashFormData = new FormData();
    trashFormData.append("filename", respondImg as any);

    await Api.post(`/trash/users/${userIdtoRedux}/results`, trashFormData)
      .then((res) => {
        dispatch(save_ID(res.data.image_id));
        //res.data.challenge : NONE 확인해야함
        navigate(`/mainpage/resultpage`);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };

  const onClickImgResult = () => {
    if (isImg === null) return alert("no image");
    else {
      sendImage();
    }
  };

  return (
    <Box>
      <form>
        <Button
          variant="outlined"
          sx={{
            border: 1,
            borderColor: "black",
            backgroundColor: "white",
            width: 600,
            height: 300,
            mt: 10,
            "&:hover": {
              backgroundColor: "#C3F5E7",
              borderColor: "#1F7D66",
            },
          }}
          component="label"
        >
          <img src={urlImg}></img>
          <input
            type="file"
            hidden
            required
            onChange={(e) => onChangeImage(e)}
          />
          {isImg ? null : (
            <Box>
              {" "}
              <CloudUploadIcon sx={{ color: "#759F98" }} fontSize="large" />
              <Typography sx={{ color: "#759F98" }}>
                {" "}
                Upload your image!
              </Typography>
            </Box>
          )}
        </Button>
        <Box>
          <Button
            onClick={onClickImgResult}
            variant="contained"
            sx={{
              "&:hover": {
                backgroundColor: "#4F6B66",
              },
              mt: 2,
              width: 80,
              height: 30,
              fontWeight: "bold",
              fontSize: 12,
              mb: 2,
              color: "white",
              backgroundColor: "#759F98",
            }}
          >
            결과보기
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default UploadImage;
