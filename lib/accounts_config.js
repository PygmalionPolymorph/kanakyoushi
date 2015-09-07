AccountsTemplates.configure({
// Behavior
confirmPassword: true,
enablePasswordChange: true,
forbidClientAccountCreation: false,
overrideLoginErrors: true,
sendVerificationEmail: false,
lowercaseUsername: false,
focusFirstInput: true,

// Appearance
showAddRemoveServices: false,
showForgotPasswordLink: false,
showLabels: false,
showPlaceholders: true,
showResendVerificationEmailLink: false,

// Client-side Validation
continuousValidation: false,
negativeFeedback: false,
negativeValidation: true,
positiveValidation: true,
positiveFeedback: true,
showValidating: true,

// Redirects
homeRoutePath: '/home',
redirectTimeout: 4000,

// Texts
texts: {
  button: {
      signUp: "Register"
  },
  socialSignUp: "Register",
  socialIcons: {
      "meteor-developer": "fa fa-rocket"
  },
  title: {
      forgotPwd: "Recover Your Password"
  },
}
});
