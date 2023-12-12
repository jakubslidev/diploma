// jwt-payload.interface.ts

export interface JwtPayload {
    _id: string;
    email: string;
    roles: string[];
    // Add any other properties your JWT payload may have
    pageId?: string;
}

  