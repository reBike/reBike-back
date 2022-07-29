import { Button, Typography, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import Api from "../../utils/customApi";

function UploadImage() {
  const [isImg, setIsImg] = useState(null);
  const [urlImg, setUrlImg] = useState("");
  const [respondImg, setRespondImg] = useState(null);
  const navigate = useNavigate();

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

  // const sendImage: () => Promise<any> = async () => {
  //   const trashFormData = new FormData();
  //   trashFormData.append("filename", respondImg as any);

  //   await Api.post(
  //     `/trash/mainpage/users/f446242a-a219-44b9-aef7-86932259f799/result`,
  //     trashFormData
  //   )
  //     .then((res) => {
  //       const sendAxiosTrashResult: rs.TrashResult = {
  //         state: {
  //           trashName: res.data[0].name,
  //           throwWay: res.data[0].way,
  //           imgSrc: urlImg,
  //         },
  //       };
  //       navigate(`/mainpage/resultpage`, { state: sendAxiosTrashResult.state });
  //     })
  //     .catch((error) => {
  //       console.log("An error occurred:", error.response);
  //     });
  // };

  // const onClickImgResult = () => {
  //   if (isImg === null) return alert("no image");
  //   else {
  //     sendImage();
  //   }
  // };
  const sendImage: () => Promise<any> = async () => {
    const trashFormData = new FormData();
    trashFormData.append("filename", respondImg as any);

    return await Api.post(
      `/trash/mainpage/users/959f9b1c-c0bf-44b1-bb31-4ff08e86f782/result`,
      trashFormData
    );
  };

  const onClickImgResult = () => {
    if (isImg === null) return alert("no image");
    else {
      (async () => {
        const res = await sendImage();
        // const tN = res.data[0].name;
        navigate(`/mainpage/resultpage`, {
          state: {
            trashName: res.data[0].name,
            throwWay: res.data[0].way,
            imgSrc: urlImg,
          },
        });
      })();
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
