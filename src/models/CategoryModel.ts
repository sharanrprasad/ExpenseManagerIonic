export default  class CategoryModel {
     exenseCategoryId:number
      name: string
      parentId:string
      userId:string
      childCategories?:Array<CategoryModel>
}
