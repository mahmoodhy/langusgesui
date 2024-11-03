/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */





export interface SimiliarWords {
  /** @format int32 */
  boxid?: number;
  word?: string | null;
  officialTranslate?: string | null;
}



export default interface SearchedWord {
  isInDatabase?: boolean;
  /** @format int32 */
  boxid?: number;
  word?: string | null;
  officialTranslate?: string | null;
}

// export class HttpClient<SecurityDataType = unknown> {
//   public baseUrl: string = "";
//   private securityData: SecurityDataType | null = null;
//   private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
//   private abortControllers = new Map<CancelToken, AbortController>();
//   private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

//   private baseApiParams: RequestParams = {
//     credentials: "same-origin",
//     headers: {},
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//   };

//   constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
//     Object.assign(this, apiConfig);
//   }

//   public setSecurityData = (data: SecurityDataType | null) => {
//     this.securityData = data;
//   };

//   protected encodeQueryParam(key: string, value: any) {
//     const encodedKey = encodeURIComponent(key);
//     return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
//   }

//   protected addQueryParam(query: QueryParamsType, key: string) {
//     return this.encodeQueryParam(key, query[key]);
//   }

//   protected addArrayQueryParam(query: QueryParamsType, key: string) {
//     const value = query[key];
//     return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
//   }

//   protected toQueryString(rawQuery?: QueryParamsType): string {
//     const query = rawQuery || {};
//     const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
//     return keys
//       .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
//       .join("&");
//   }

//   protected addQueryParams(rawQuery?: QueryParamsType): string {
//     const queryString = this.toQueryString(rawQuery);
//     return queryString ? `?${queryString}` : "";
//   }

//   private contentFormatters: Record<ContentType, (input: any) => any> = {
//     [ContentType.Json]: (input: any) =>
//       input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
//     [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
//     [ContentType.FormData]: (input: any) =>
//       Object.keys(input || {}).reduce((formData, key) => {
//         const property = input[key];
//         formData.append(
//           key,
//           property instanceof Blob
//             ? property
//             : typeof property === "object" && property !== null
//               ? JSON.stringify(property)
//               : `${property}`,
//         );
//         return formData;
//       }, new FormData()),
//     [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
//   };

//   protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
//     return {
//       ...this.baseApiParams,
//       ...params1,
//       ...(params2 || {}),
//       headers: {
//         ...(this.baseApiParams.headers || {}),
//         ...(params1.headers || {}),
//         ...((params2 && params2.headers) || {}),
//       },
//     };
//   }

//   protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
//     if (this.abortControllers.has(cancelToken)) {
//       const abortController = this.abortControllers.get(cancelToken);
//       if (abortController) {
//         return abortController.signal;
//       }
//       return void 0;
//     }

//     const abortController = new AbortController();
//     this.abortControllers.set(cancelToken, abortController);
//     return abortController.signal;
//   };

//   public abortRequest = (cancelToken: CancelToken) => {
//     const abortController = this.abortControllers.get(cancelToken);

//     if (abortController) {
//       abortController.abort();
//       this.abortControllers.delete(cancelToken);
//     }
//   };

//   public request = async <T = any, E = any>({
//     body,
//     secure,
//     path,
//     type,
//     query,
//     format,
//     baseUrl,
//     cancelToken,
//     ...params
//   }: FullRequestParams): Promise<HttpResponse<T, E>> => {
//     const secureParams =
//       ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
//         this.securityWorker &&
//         (await this.securityWorker(this.securityData))) ||
//       {};
//     const requestParams = this.mergeRequestParams(params, secureParams);
//     const queryString = query && this.toQueryString(query);
//     const payloadFormatter = this.contentFormatters[type || ContentType.Json];
//     const responseFormat = format || requestParams.format;

//     return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
//       ...requestParams,
//       headers: {
//         ...(requestParams.headers || {}),
//         ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
//       },
//       signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
//       body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
//     }).then(async (response) => {
//       const r = response.clone() as HttpResponse<T, E>;
//       r.data = null as unknown as T;
//       r.error = null as unknown as E;

//       const data = !responseFormat
//         ? r
//         : await response[responseFormat]()
//             .then((data) => {
//               if (r.ok) {
//                 r.data = data;
//               } else {
//                 r.error = data;
//               }
//               return r;
//             })
//             .catch((e) => {
//               r.error = e;
//               return r;
//             });

//       if (cancelToken) {
//         this.abortControllers.delete(cancelToken);
//       }

//       if (!response.ok) throw data;
//       return data;
//     });
//   };
// }

/**
 * @title API
 * @version v1
 */
// export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
//   api = {
//     /**
//      * No description
//      *
//      * @tags Authenticate
//      * @name AuthenticateLoginCreate
//      * @request POST:/api/Authenticate/login
//      * @secure
//      */
//     authenticateLoginCreate: (data: LoginModel, params: RequestParams = {}) =>
//       this.request<void, any>({
//         path: `/api/Authenticate/login`,
//         method: "POST",
//         body: data,
//         secure: true,
//         type: ContentType.Json,
//         ...params,
//       }),

//     /**
//      * No description
//      *
//      * @tags Authenticate
//      * @name AuthenticateRegisterCreate
//      * @request POST:/api/Authenticate/register
//      * @secure
//      */
//     authenticateRegisterCreate: (data: RegisterModel, params: RequestParams = {}) =>
//       this.request<void, any>({
//         path: `/api/Authenticate/register`,
//         method: "POST",
//         body: data,
//         secure: true,
//         type: ContentType.Json,
//         ...params,
//       }),

//     /**
//      * No description
//      *
//      * @tags Authenticate
//      * @name AuthenticateRegisterAdminCreate
//      * @request POST:/api/Authenticate/register-admin
//      * @secure
//      */
//     authenticateRegisterAdminCreate: (data: RegisterModel, params: RequestParams = {}) =>
//       this.request<void, any>({
//         path: `/api/Authenticate/register-admin`,
//         method: "POST",
//         body: data,
//         secure: true,
//         type: ContentType.Json,
//         ...params,
//       }),

//     /**
//      * No description
//      *
//      * @tags Home
//      * @name HomeStartNewDayCreate
//      * @request POST:/api/Home/StartNewDay
//      * @secure
//      */
//     homeStartNewDayCreate: (
//       query?: {
//         /** @format int32 */
//         wordcount?: number;
//         Force?: boolean;
//       },
//       params: RequestParams = {},
//     ) =>
//       this.request<void, any>({
//         path: `/api/Home/StartNewDay`,
//         method: "POST",
//         query: query,
//         secure: true,
//         ...params,
//       }),

//     /**
//      * No description
//      *
//      * @tags Home
//      * @name HomeGetTodayWordsRemainingIdsCreate
//      * @request POST:/api/Home/GetTodayWordsRemainingIds
//      * @secure
//      */
//     homeGetTodayWordsRemainingIdsCreate: (params: RequestParams = {}) =>
//       this.request<void, any>({
//         path: `/api/Home/GetTodayWordsRemainingIds`,
//         method: "POST",
//         secure: true,
//         ...params,
//       }),

//     /**
//      * No description
//      *
//      * @tags Home
//      * @name HomeIsTodayFinishedCreate
//      * @request POST:/api/Home/IsTodayFinished
//      * @secure
//      */
//     homeIsTodayFinishedCreate: (params: RequestParams = {}) =>
//       this.request<void, any>({
//         path: `/api/Home/IsTodayFinished`,
//         method: "POST",
//         secure: true,
//         ...params,
//       }),

//     /**
//      * No description
//      *
//      * @tags Home
//      * @name HomeWordByIdCreate
//      * @request POST:/api/Home/WordById/{wordId}
//      * @secure
//      */
//     homeWordByIdCreate: (wordId: number, params: RequestParams = {}) =>
//       this.request<void, any>({
//         path: `/api/Home/WordById/${wordId}`,
//         method: "POST",
//         secure: true,
//         ...params,
//       }),

//     /**
//      * No description
//      *
//      * @tags Home
//      * @name HomeNextRandomWordCreate
//      * @request POST:/api/Home/NextRandomWord
//      * @secure
//      */
//     homeNextRandomWordCreate: (params: RequestParams = {}) =>
//       this.request<void, any>({
//         path: `/api/Home/NextRandomWord`,
//         method: "POST",
//         secure: true,
//         ...params,
//       }),

//     /**
//      * No description
//      *
//      * @tags Home
//      * @name HomeCorrectAnswerCreate
//      * @request POST:/api/Home/CorrectAnswer
//      * @secure
//      */
//     homeCorrectAnswerCreate: (
//       query?: {
//         /** @format int32 */
//         wordId?: number;
//       },
//       params: RequestParams = {},
//     ) =>
//       this.request<void, any>({
//         path: `/api/Home/CorrectAnswer`,
//         method: "POST",
//         query: query,
//         secure: true,
//         ...params,
//       }),

//     /**
//      * No description
//      *
//      * @tags Home
//      * @name HomeWrongAnswerCreate
//      * @request POST:/api/Home/WrongAnswer
//      * @secure
//      */
//     homeWrongAnswerCreate: (
//       query?: {
//         /** @format int32 */
//         wordId?: number;
//       },
//       params: RequestParams = {},
//     ) =>
//       this.request<void, any>({
//         path: `/api/Home/WrongAnswer`,
//         method: "POST",
//         query: query,
//         secure: true,
//         ...params,
//       }),

//     /**
//      * No description
//      *
//      * @tags Home
//      * @name HomeThisWordIsLearnedCreate
//      * @request POST:/api/Home/ThisWordIsLearned
//      * @secure
//      */
//     homeThisWordIsLearnedCreate: (
//       query?: {
//         /** @format int32 */
//         wordId?: number;
//       },
//       params: RequestParams = {},
//     ) =>
//       this.request<void, any>({
//         path: `/api/Home/ThisWordIsLearned`,
//         method: "POST",
//         query: query,
//         secure: true,
//         ...params,
//       }),

//     /**
//      * No description
//      *
//      * @tags Home
//      * @name HomeFindSearchedWordFindSearchedWordCreate
//      * @request POST:/api/Home/FindSearchedWord/FindSearchedWord
//      * @secure
//      */
//     homeFindSearchedWordFindSearchedWordCreate: (
//       query?: {
//         word?: string;
//       },
//       params: RequestParams = {},
//     ) =>
//       this.request<SearchedWord, void>({
//         path: `/api/Home/FindSearchedWord/FindSearchedWord`,
//         method: "POST",
//         query: query,
//         secure: true,
//         format: "json",
//         ...params,
//       }),

//     /**
//      * No description
//      *
//      * @tags Home
//      * @name HomeGetsimiliarwordsinDataBaseCreate
//      * @request POST:/api/Home/GetsimiliarwordsinDataBase/{word}
//      * @secure
//      */
//     homeGetsimiliarwordsinDataBaseCreate: (word: string, params: RequestParams = {}) =>
//       this.request<void, any>({
//         path: `/api/Home/GetsimiliarwordsinDataBase/${word}`,
//         method: "POST",
//         secure: true,
//         ...params,
//       }),

//     /**
//      * No description
//      *
//      * @tags Home
//      * @name HomeGetTranslationCreate
//      * @request POST:/api/Home/GetTranslation/{word}
//      * @secure
//      */
//     homeGetTranslationCreate: (word: string, params: RequestParams = {}) =>
//       this.request<void, any>({
//         path: `/api/Home/GetTranslation/${word}`,
//         method: "POST",
//         secure: true,
//         ...params,
//       }),

//     /**
//      * No description
//      *
//      * @tags Home
//      * @name HomeEditMainMeaningofWordinUserBoxCreate
//      * @request POST:/api/Home/EditMainMeaningofWordin_UserBox/{newMeaning},{wordId}
//      * @secure
//      */
//     homeEditMainMeaningofWordinUserBoxCreate: (newMeaning: string, wordId: number, params: RequestParams = {}) =>
//       this.request<void, any>({
//         path: `/api/Home/EditMainMeaningofWordin_UserBox/${newMeaning},${wordId}`,
//         method: "POST",
//         secure: true,
//         ...params,
//       }),

//     /**
//      * No description
//      *
//      * @tags Home
//      * @name HomeEditMainMeaningofWordinBoxCreate
//      * @request POST:/api/Home/EditMainMeaningofWordin_Box/{newMeaning},{wordId}
//      * @secure
//      */
//     homeEditMainMeaningofWordinBoxCreate: (newMeaning: string, wordId: number, params: RequestParams = {}) =>
//       this.request<void, any>({
//         path: `/api/Home/EditMainMeaningofWordin_Box/${newMeaning},${wordId}`,
//         method: "POST",
//         secure: true,
//         ...params,
//       }),

//     /**
//      * No description
//      *
//      * @tags Home
//      * @name HomeEditYourTranslateMeaningofWordCreate
//      * @request POST:/api/Home/EditYourTranslateMeaningofWord/{newTranslate},{wordId}
//      * @secure
//      */
//     homeEditYourTranslateMeaningofWordCreate: (newTranslate: string, wordId: number, params: RequestParams = {}) =>
//       this.request<void, any>({
//         path: `/api/Home/EditYourTranslateMeaningofWord/${newTranslate},${wordId}`,
//         method: "POST",
//         secure: true,
//         ...params,
//       }),

//     /**
//      * No description
//      *
//      * @tags Home
//      * @name HomeEditYourExampleMeaningofWordCreate
//      * @request POST:/api/Home/EditYourExampleMeaningofWord/{newExample},{wordId}
//      * @secure
//      */
//     homeEditYourExampleMeaningofWordCreate: (newExample: string, wordId: number, params: RequestParams = {}) =>
//       this.request<void, any>({
//         path: `/api/Home/EditYourExampleMeaningofWord/${newExample},${wordId}`,
//         method: "POST",
//         secure: true,
//         ...params,
//       }),

//     /**
//      * No description
//      *
//      * @tags Home
//      * @name HomeEditGtMeaningofWordCreate
//      * @request POST:/api/Home/EditGTMeaningofWord/{newMeaning},{wordId}
//      * @secure
//      */
//     homeEditGtMeaningofWordCreate: (newMeaning: string, wordId: number, params: RequestParams = {}) =>
//       this.request<void, any>({
//         path: `/api/Home/EditGTMeaningofWord/${newMeaning},${wordId}`,
//         method: "POST",
//         secure: true,
//         ...params,
//       }),
      
//   };
// }
