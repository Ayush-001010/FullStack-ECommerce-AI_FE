export default interface AIChatInterface {
  intent: "ExploreDiscountProducts" | null;
  missing_fields: Array<string> | null;
  assistant_question: string | null;
  userResponse: string | null;
  AskQuestionType: "Text" | null;
  type : "user" | "ai";
  FinalOuptut: string | null;
  ToolResponse : Array<any> | null;
}
