export const save_ID = (id: any) => {
  console.log(id);
  return {
    type: "SAVE_ID",
    payload: id,
  };
};
// type 이라는 속성을 가진 액션을 생성하는 addCart 는 액션 생성 함수입니다.
// 이름만 봐도 장바구니에 담는 역할을 할 것 같습니다.
