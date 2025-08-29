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
  email: string;
  otp:string;
  password:string
};

export interface ProfileDataType{
  first_name:string;
  last_name : string;
  role : string;
}
// Columns Heder Table In Quizzes 
type ColumnKeyQuizzes = "Title" | "Question" | "level" | "Date";
type RowKeyQuizzes = 'Question Title' | 'Question Desc' | 'Question difficulty level' | 'Date'

export interface ColumnsHederTableInQuizzes  {
  key: ColumnKeyQuizzes;
  label: RowKeyQuizzes;
};



