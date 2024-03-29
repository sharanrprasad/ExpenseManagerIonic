
export const BaseUrl:string = "https://localhost:5001/api";

//export const BaseUrl:string = "https://10.0.2.2:5001/api";
export  const LoginUrl = BaseUrl + "/login";
export const  SignUpUrl = BaseUrl+ "/signup";
export const AddExpenseUrl = BaseUrl + "/expense/add/";
export const DeleteExpenseUrl = BaseUrl + "/expense/";
export const GetExpenses = BaseUrl+ "/expense/user/";
export const GetExpensesTop = BaseUrl+ "/expense/user-top/";

export const GetCategories = BaseUrl+ "/category/";
export const GetSummaryUrl = BaseUrl + "/summary/bydate";
export const GetCurrentBudgetUrl = BaseUrl + "/budget/current/";
export const UpdateBudgetUrl = BaseUrl + "/budget/update/";
export const DeleteBudgetUrl = BaseUrl + "/budget/delete/"
export const AddBudgetUrl =  BaseUrl + "/budget/add/";
export const AddCategoryParent = BaseUrl + "/category/add-parent"

