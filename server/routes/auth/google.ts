import { GoogleUserDetails } from "~/types";
import { setSessionUser } from "~/server/utils/session";

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user: google }: { user: GoogleUserDetails }) {
    const session = await setUserSession(event, { google });
    if (!session.discord) {
      return sendRedirect(event, "/auth/discord");
    }
    await setSessionUser(event);
    return sendRedirect(event, "/courses");
  },
});
