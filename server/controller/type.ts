//

import {
  SlimeDictionarySkeleton,
  SlimeWordSkeleton
} from "/server/skeleton/dictionary/slime";
import {
  CustomErrorSkeleton
} from "/server/skeleton/error";
import {
  NotificationSkeleton
} from "/server/skeleton/notification";
import {
  UserSkeleton
} from "/server/skeleton/user";


export const SERVER_PATH = {
  createDictionary: "/api/dictionary/create",
  uploadDictionary: "/api/dictionary/upload",
  deleteDictionary: "/api/dictionary/delete",
  changeDictionaryName: "/api/dictionary/edit/name",
  changeDictionarySecret: "/api/dictionary/edit/secret",
  changeDictionaryExplanation: "/api/dictionary/edit/explanation",
  addNotification: "/api/news/add",
  searchDictionary: "/api/dictionary/search",
  downloadDictionary: "/api/dictionary/download",
  fetchDictionary: "/api/dictionary/info",
  fetchWholeDictionary: "/api/dictionary/whole",
  fetchDictionaries: "/api/dictionary/list",
  fetchAllDictionaries: "/api/dictionary/list/all",
  fetchDictionaryAggregation: "/api/dictionary/aggregate",
  checkDictionaryAuthorization: "/api/dictionary/check",
  login: "/api/user/login",
  logout: "/api/user/logout",
  registerUser: "/api/user/register",
  changeUserEmail: "/api/user/edit/email",
  changeUserPassword: "/api/user/edit/password",
  fetchUser: "/api/user/info",
  fetchNotifications: "/api/news/list"
};

type ProcessType = {
  createDictionary: {
    get: Noop,
    post: {
      request: {name: string},
      response: {
        200: SlimeDictionarySkeleton,
        400: never
      }
    }
  },
  uploadDictionary: {
    get: Noop,
    post: {
      request: {number: number},
      response: {
        200: SlimeDictionarySkeleton,
        400: CustomErrorSkeleton<"invalidDictionaryNumber">
      }
    }
  },
  deleteDictionary: {
    get: Noop,
    post: {
      request: {number: number},
      response: {
        200: boolean,
        400: CustomErrorSkeleton<"invalidDictionaryNumber">
      }
    }
  },
  changeDictionaryName: {
    get: Noop,
    post: {
      request: {number: number, name: string},
      response: {
        200: SlimeDictionarySkeleton,
        400: CustomErrorSkeleton<"invalidDictionaryNumber">
      }
    }
  },
  changeDictionarySecret: {
    get: Noop,
    post: {
      request: {number: number, secret: boolean},
      response: {
        200: SlimeDictionarySkeleton,
        400: CustomErrorSkeleton<"invalidDictionaryNumber">
      }
    }
  },
  changeDictionaryExplanation: {
    get: Noop,
    post: {
      request: {number: number, explanation: string},
      response: {
        200: SlimeDictionarySkeleton,
        400: CustomErrorSkeleton<"invalidDictionaryNumber">
      }
    }
  },
  addNotification: {
    get: Noop,
    post: {
      request: {type: string, title: string, text: string},
      response: {
        200: NotificationSkeleton,
        400: never
      }
    }
  }
  searchDictionary: {
    get: {
      request: {number: number, search: string, mode: string, type: string, offset?: number, size?: number},
      response: {
        200: {hitSize: number, hitWords: Array<SlimeWordSkeleton>},
        400: CustomErrorSkeleton<"invalidDictionaryNumber">
      }
    },
    post: Noop
  },
  downloadDictionary: {
    get: {
      request: {number: number},
      response: {
        200: never,
        400: CustomErrorSkeleton<"invalidDictionaryNumber">
      }
    },
    post: Noop
  },
  fetchDictionary: {
    get: {
      request: {number: number},
      response: {
        200: SlimeDictionarySkeleton,
        400: CustomErrorSkeleton<"invalidDictionaryNumber">
      }
    },
    post: Noop
  },
  fetchWholeDictionary: {
    get: {
      request: {number: number},
      response: {
        200: SlimeDictionarySkeleton,
        400: CustomErrorSkeleton<"invalidDictionaryNumber">
      }
    },
    post: Noop
  }
  fetchDictionaries: {
    get: {
      request: {},
      response: {
        200: Array<SlimeDictionarySkeleton>,
        400: never
      }
    },
    post: Noop
  },
  fetchAllDictionaries: {
    get: {
      request: {},
      response: {
        200: Array<SlimeDictionarySkeleton>,
        400: never
      }
    },
    post: Noop
  },
  fetchDictionaryAggregation: {
    get: {
      request: {},
      response: {
        200: {dictionarySize: number, wordSize: number},
        400: never
      }
    },
    post: Noop
  },
  checkDictionaryAuthorization: {
    get: {
      request: {number: number},
      response: {
        200: boolean,
        400: CustomErrorSkeleton<"invalidDictionaryNumber">
      }
    },
    post: Noop
  },
  login: {
    get: Noop,
    post: {
      request: {name: string, password: string},
      response: {
        200: {token: string, user: UserSkeleton},
        400: never
      }
    }
  },
  logout: {
    get: Noop,
    post: {
      request: {},
      response: {
        200: boolean,
        400: never
      }
    }
  },
  registerUser: {
    get: Noop,
    post: {
      request: {name: string, email: string, password: string},
      response: {
        200: UserSkeleton,
        400: CustomErrorSkeleton<"duplicateUserName" | "invalidUserName" | "invalidEmail" | "invalidPassword">
      }
    }
  },
  changeUserEmail: {
    get: Noop,
    post: {
      request: {email: string},
      response: {
        200: UserSkeleton,
        400: CustomErrorSkeleton<"invalidEmail">
      }
    }
  },
  changeUserPassword: {
    get: Noop,
    post: {
      request: {password: string},
      response: {
        200: UserSkeleton,
        400: CustomErrorSkeleton<"invalidPassword">
      }
    }
  },
  fetchUser: {
    get: {
      request: {},
      response: {
        200: UserSkeleton,
        400: never
      }
    },
    post: Noop
  },
  fetchNotifications: {
    get: {
      request: {offset?: number, size?: number},
      response: {
        200: Array<NotificationSkeleton>,
        400: never
      }
    },
    post: Noop
  }
};

export type MethodType = "get" | "post";
export type ProcessName = keyof ProcessType;

export type RequestType<N extends ProcessName, M extends MethodType> = ProcessType[N][M]["request"];
export type ResponseType<N extends ProcessName, M extends MethodType> = ValueOf<ProcessType[N][M]["response"]>;

type Noop = {request: never, response: never};
type ValueOf<T> = T[keyof T];