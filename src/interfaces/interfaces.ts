export interface LoginFormInputs {
  email: string;
  password: string;
};
export interface RegisterForm{ 
  first_name:string;
  last_name:string;
  role: 'Student' | 'Instructor' ; 
  email: string
  password: string 
};
export interface ForgetPasswordTypes {
  email: string;
};
export interface resetPasswordTypes {
  email: string;
  otp:string;
  password:string
};
export interface changePasswordTypes {

  password_new:string;
  password:string
};

export interface ProfileDataType{
  first_name:string;
  last_name : string;
  role : string;
}
// Columns Heder Table In Quizzes 
type ColumnKeyQuizzes = string;
type RowKeyQuizzes = string

export interface ColumnsHederTableInQuizzes  {
  key: ColumnKeyQuizzes;
  label: RowKeyQuizzes;
};



