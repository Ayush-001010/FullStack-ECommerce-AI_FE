import type { ContactInfoInterface, FeatureNameInterface } from "../Interface/Auth";

export default class AuthConfig {
    static readonly title : string = "Welcome to our enchanted Shop!!";
    static readonly sub_description : { signIn : string , signUp : string} = {
        signIn:"",
        signUp:"Create your account to step inside our enchanted shop—stocked with supplies to help you stand strong against He-Who-Must-Not-Be-Named."
    };
    static readonly featureNames : Array<FeatureNameInterface> = [
        {
            name : "Buy Product",
            description : "Choose your magical gear, add it to your cart, and place your order in just a few spells.",
            icon : "bi bi-boxes"
        },
        {
            name : "Track Product",
            description:"Follow your order’s journey from our shelves to your doorstep with real-time updates.",
            icon : "bi bi-alarm"
        },
        {
            name :"AI Assistant",
            description:"Tell us what you need, and our assistant will recommend the right items for your mission—quickly and wisely.",
            icon : "bi bi-openai"
        }
    ];
    static readonly contactInfo : Array<ContactInfoInterface> = [
        { name : "Contact" } ,  {name  : "leetcode"} , { name : "github"} , { name : "linkedin"}
    ]
}