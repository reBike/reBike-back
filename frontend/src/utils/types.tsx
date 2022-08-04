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
    id?: any;
    image: string;
  }

  export interface TrashList {
    trashlist: Array<Trash>;
  }

  //❌
  export interface TrashResult {
    state: {
      trashName: string;
      throwWay: string;
      imgSrc: string;
    };
  }
  //❌
  export interface Challenge {
    challenge_id: number;
    type: boolean;
  }
  export interface ChallengeInfo {
    id: number;
    imgT: string;
    imgF: string;
    test: string;
  }

  export interface AutoSave {
    user_autosave: boolean;
  }
}
