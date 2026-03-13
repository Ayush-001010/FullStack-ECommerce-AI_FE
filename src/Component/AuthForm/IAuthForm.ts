export default interface IAuthForm {
    type: "signIn" | "signUp";
    changeType : () => void;
    submitHandler: (values: Record<string, string>) => Promise<void>;
}