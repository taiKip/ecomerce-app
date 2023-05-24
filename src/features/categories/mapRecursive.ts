import { ICategory } from '../../interfaces'

export const mapRecursive = (
  oldArray: ICategory[],
  callback: (item: ICategory) => ICategory,
  newArray: ICategory[] = []
): ICategory[] => {
  if (oldArray.length <= 0) {
    return newArray
  } else {
    let [item, ...rest] = oldArray
    if (item.categories) {
      item = { ...item, categories: mapRecursive(item.categories, callback) }
    }
    const interimArray = [...newArray, callback(item)]
    return mapRecursive(rest, callback, interimArray)
  }
}
