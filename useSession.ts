// Copyright (c) 2021-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { useEffect, useState } from "react";
import { EmailTokenDTO } from "../../auth/email/types/EmailTokenDTO";
import { EmailAuthSessionService } from "../services/EmailAuthSessionService";

export interface SessionData {

    readonly token      : EmailTokenDTO | undefined;
    readonly email      : string | undefined;
    readonly isLoggedIn : boolean;

}

function createSessionData (
    token      : EmailTokenDTO | undefined,
    email      : string | undefined,
    isLoggedIn : boolean
) : SessionData {
    return {
        token,
        email,
        isLoggedIn
    };
}

export function useSession () : SessionData {

    const [ sessionData, setSessionData ] = useState<SessionData>(
        createSessionData(EmailAuthSessionService.getEmailToken(), EmailAuthSessionService.getEmailAddress(), EmailAuthSessionService.hasSession())
    );

    // When session service changes data
    useEffect(() => {
        return EmailAuthSessionService.on(
            EmailAuthSessionService.Event.EMAIL_TOKEN_UPDATED,
            () => {

                const token = EmailAuthSessionService.getEmailToken();
                const email = EmailAuthSessionService.getEmailAddress();
                const isLoggedIn = EmailAuthSessionService.hasSession();

                if (
                    sessionData.token !== token ||
                    sessionData.email !== email ||
                    sessionData.isLoggedIn !== isLoggedIn
                ) {
                    setSessionData(createSessionData(token, email, isLoggedIn));
                }

            }
        );
    });

    return sessionData;

}
