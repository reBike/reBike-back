import { Button, Typography, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";

function UploadImage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const resizeFile = (file) =>
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

  const onChange2 = async (event) => {
    try {
      const file = event.target.files[0];
      const img = await resizeFile(file);
      setImage(img); // update image
      setPreview(URL.createObjectURL(img));
      const formData = new FormData();
      formData.append("file", file);
      console.log("success upload image!");
      console.log(formData);
      console.log(event.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const onClick = () => {
    if (image === null) return alert("no image");
    else {
      navigate("/mainpage/resultpage", { state: preview });
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
          <img src={preview}></img>
          <input type="file" hidden required onChange={(e) => onChange2(e)} />
          {image ? null : (
            <Box>
              {" "}
              <CloudUploadIcon
                sx={{ color: "#759F98", mr: 1 }}
                fontSize="large"
              />
              <Typography sx={{ color: "#759F98" }}>
                {" "}
                Upload your image!
              </Typography>
            </Box>
          )}
        </Button>
        <Box>
          <Button
            onClick={onClick}
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
