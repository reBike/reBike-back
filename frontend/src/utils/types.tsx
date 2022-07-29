export namespace rs {
  export interface UserAuth {
    access_token: string;
    refresh_token: string;
  }
  export interface TokenInfo {
    value: string;
    expiry: number;
  }
  export interface TokenDecode {
    alias: string;
    email: string;
    exp: number;
    name: string;
    token_type: string;
  }

  export interface Trash {
    uploaded_trash_image_id: string;
    img: string;
    trash_kind: string;
  }

  export interface TrashList {
    trashlist: Array<Trash>;
  }

  export interface TrashResult {
    state: {
      trashName: string;
      throwWay: string;
      imgSrc: string;
    };
  }
}
