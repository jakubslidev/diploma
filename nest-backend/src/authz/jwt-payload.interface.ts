// jwt-payload.interface.ts

export interface JwtPayload {
    _id: string;
    email: string;
    role: string;
    // Add any other properties your JWT payload may have
    pageId?: string;
}

  