import { AxiosError } from "axios";

const asyncWrapper = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
  return async function (
    this: any,
    ...args: Parameters<T>
  ): Promise<ReturnType<T>> {
    try {
      return await fn.apply(this, args);
    } catch (error) {
      if (error instanceof AxiosError) {
        const msg = error.message;
        throw `ERROR: ${msg}`;
      } else {
        throw "ERROR: Something went wrong!";
      }
    }
  };
};

export default asyncWrapper;
