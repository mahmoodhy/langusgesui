export default interface SearchedWord {
    isInDatabase?: boolean;
    /** @format int32 */
    boxid?: number;
    word?: string | null;
    officialTranslate?: string | null;
  }
  
 