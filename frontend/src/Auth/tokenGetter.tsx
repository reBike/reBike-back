import jwtDecode, { JwtPayload } from "jwt-decode";
import { rs } from "src/utils/types";

// 해더에 사용할 닉네임을 위해 받아온 token 디코드
const decodeToken = (accessToken: string) => {
  console.log("잘 들어왔나?", accessToken);

  if (process.env.REACT_APP_SECRET_KEY && process.env.REACT_APP_ALGORITHM) {
    const decoded = jwtDecode<JwtPayload>(accessToken); // Returns with the JwtPayload type

    console.log("라이브러리로?", decoded);

    return decoded;
  }
};

export { decodeToken };
