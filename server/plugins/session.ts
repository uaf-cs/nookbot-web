export default defineNitroPlugin(() => {
  // See todo in server/utils/session.ts
  // sessionHooks.hook("fetch", async (session: UserSession, event) => {
  //   if (session.google && session.discord) {
  //     await updateSession(event, {
  //       user: {
  //         displayName: session.google.displayName,
  //         avatarUrl: session.google.picture,
  //       },
  //     });
  //   }
  // });
});
