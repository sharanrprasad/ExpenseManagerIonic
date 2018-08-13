export default  class CategoryModel {
     expenseCategoryId:number
      name: string
      parentId:string
      userId:string
      childCategories?:Array<CategoryModel>
}
