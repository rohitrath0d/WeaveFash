import arcjet, { detectBot, fixedWindow, protectSignup, sensitiveInfo, shield, validateEmail } from "@arcjet/next";

// arcjet configuration for the registration/sign-up. same we also have to create for login, coz it can also be tampered, hence have to be secured.
export const protectSignUpRules = arcjet({
    key: process.env.ARCJET_KEY!,
    rules:[
        protectSignup({
            email: {
                mode: "LIVE",                   // will block requests. Use "DRY_RUN" to log only
                // Block emails that are disposable, invalid, or have no MX records
                block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
        },
        bots: {
          mode: "LIVE",
          // configured with a list of bots to allow from
          // https://arcjet.com/bot-list
          allow: [], // "allow none" will block all detected bots
        },
        // It would be unusual for a form to be submitted more than 5 times in 10
        // minutes from the same IP address
        rateLimit: {
          // uses a sliding window rate limit
          mode: "LIVE",
          interval: "10m", // counts requests over a 10 minute sliding window
          max: 5, // allows 5 submissions within the window
        },
    }),
    ]
})


// arcjet configuration for the login.

export const protectLoginRules = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    validateEmail({ 
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      // block disposable, invalid, and email addresses with no MX records
      deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
    }),
  ],
}); 

export const createNewProductRules = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    // Arcjet code
    // Bot protection
    detectBot({
      mode: "LIVE",       // will block requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [],
    }),

    // Rate limiting -> Algorithms -> fixedWindow()
    fixedWindow({
      // only 5 products can be added in 300 seconds

      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      window: "300s", // 60 second fixed window
      max: 5,     // allow a maximum of 100 requests
    }),


    // Shield protects your app from common attacks e.g. SQL injection
    // DRY_RUN mode logs only. Use "LIVE" to block
    shield({
      // mode: "DRY_RUN",
      mode: "LIVE",
    }),
  ]
})

// We can add more functionalities from arcjet such as Token Buckets, Sliding window techniques. Read docs.




export const createCouponRules = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    detectBot({
      mode: "LIVE",
      allow: [],
    }),
    fixedWindow({
      mode: "LIVE",
      window: "300s",
      max: 5,
    }),
    shield({
      mode: "LIVE",
    }),
    sensitiveInfo({
      mode: "LIVE",
      deny: ["EMAIL", "CREDIT_CARD_NUMBER", "PHONE_NUMBER"],
    }),
  ],
});