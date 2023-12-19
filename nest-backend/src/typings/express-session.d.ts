import { SessionData } from 'express-session';

declare module 'express-session' {
  interface Session {
    user: {
      _id: string;
      email: string;
      roles: {
        type: Map,
        of: String,
        default: {} // Set default roles to an empty dictionary
      },
      // Add any other user properties as needed
    };
  }
}
