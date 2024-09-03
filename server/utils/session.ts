import { UserSession } from "#auth-utils";
import { H3Event } from "h3";
import { setUserSession } from "#imports";

export async function setSessionUser(event: H3Event) {
  // TODO: This should be removed but for now hooks can't be used for this use case. See https://github.com/atinux/nuxt-auth-utils/pull/130/files#r1741242713
  const session = await getUserSession(event);

  if (session.google && session.discord) {
    await setUserSession(event, {
      user: {
        name: session.google.name,
        avatarUrl: session.google.picture,
      },
    });
    return;
  }
  await setUserSession(event, { user: null });
}
