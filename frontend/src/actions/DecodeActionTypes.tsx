export const DECODE_SUCCESS = "DECODE_SUCCESS";
export const DECODE_FAIL = "DECODE_FAIL";

export type DecodePropsType = {
  id: string;
  alias: string;
};

export interface decodeFailDispatch {
  type: typeof DECODE_FAIL;
}

export interface decodeSucccessDispatch {
  type: typeof DECODE_SUCCESS;
  payload: DecodePropsType;
}

//성공햇을떄 넘어온 데이터를 payload 에 저장
export type DecodeDispatchType = decodeFailDispatch | decodeSucccessDispatch;
