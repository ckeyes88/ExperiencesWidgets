/**
 * Deep copies the provided target. Useful for deep copying objects. 
 */
export function deepClone<T>(target: T): T {
  // Handle null
  if (target === null) {
    return target;
  }
  // Handle dates
  if (target instanceof Date) {
    return new Date(target.getTime()) as unknown as T;
  }
  // Handle arrays
  if (target instanceof Array) {
    const cp = [] as unknown[];
    for (let i = 0; i < (target as unknown[]).length; i++) {
      cp.push(target[i]);
    }
    return cp.map(v => deepClone<unknown>(v)) as unknown as T;
  }
  // Handle objects
  if (typeof target === "object" && target !== {}) {
    const cp = { ...(target as { [key: string]: any }) };
    Object.keys(cp).forEach(k => {
      cp[k] = deepClone<unknown>(cp[k]);
    });
    return cp as T;
  }
  // Return default
  return target;
}