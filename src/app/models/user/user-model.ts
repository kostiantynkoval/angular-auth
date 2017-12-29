export class User {
  weChatId: string;
  profile: {
    firstName: string;
    lastName: string;
    phone: string;
    phonePrefix: string;
    email: string;
    dependentName: string;
    tagIds: number[];
    currencyId: number;
    languageIsEnglish: boolean;
    imageUrl: string;
  };
  subscription: {
    weChatTransactionNumber: string;
    invitationCode: string;
    membershipMonths: number;
    amountUSD: number;
  };
}
