import { SessionData } from 'express-session';

declare module 'express-session' {
  interface Session {
    user: {
      _id: string;
      email: string;
      role: string;
      // Add any other user properties as needed
    };
  }
}
