import { DiscordUserDetails } from "~/types";
import { setSessionUser } from "~/server/utils/session";

export default defineOAuthDiscordEventHandler({
  async onSuccess(event, { user: discord }: { user: DiscordUserDetails }) {
    const session = await setUserSession(event, {
      discord,
    });
    if (!session.google) {
      return sendRedirect(event, "/auth/google");
    }
    await setSessionUser(event);
    return sendRedirect(event, "/courses");
  },
});
