class JsonCircle extends Error {
  constructor (public path: string[], public prevPath: string[]) {
    super(`found circle path: ${path.join('.')} ---> ${prevPath.join('.')}`)
  }
}

interface PathNode {
  prop: string;
  ref: any;
}

/**
 * if exist a circle path will throw a JsonCircle Error
 */
export const checkCirclePath = (obj: any, record = new Array<PathNode>()) => {
  const idx = record.slice(0, record.length - 1).findIndex(v => v.ref === obj)
  if (idx !== -1) {
    throw new JsonCircle(record.map(v => v.prop), record.slice(0, idx + 1).map(v => v.prop))
  }
  if (typeof obj === 'object' && obj !== null) {
    for (const [k, v] of Object.entries(obj)) {
      checkCirclePath(v, [...record, { prop: k, ref: v }])
    }
  }
}

export const getCirclePath = (obj: any) => {
  try {
    checkCirclePath(obj)
  } catch (error) {
    if (error instanceof JsonCircle) {
      return ([error.path, error.prevPath]) as unknown as [string, string]
    }
    throw error
  }
  return null
}
