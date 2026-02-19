Hooks.once("init", async function () {
  game.settings.register("depruner-chat-message-remover", "limit", {
    name: game.i18n.localize(
      "depruner-chat-message-remover.module-settings.limit.name",
    ),
    hint: game.i18n.localize(
      "depruner-chat-message-remover.module-settings.limit.hint",
    ),
    scope: "world",
    config: true,
    default: 30,
    type: Number,
  });
});

Hooks.once("ready", async function () {
  if (!game.user.isGM) return;
  Hooks.on(
    "preCreateChatMessage",
    async (_document, _data, _options, _userId) => {
      const maxMessages = game.settings.get(
        "depruner-chat-message-remover",
        "limit",
      );

      const deleteCount = game.messages.contents.length - maxMessages;
      if (deleteCount <= 0) return;

      const messagesToDelete = [
        ...game.messages.contents.slice(0, deleteCount),
      ];

      messagesToDelete.forEach((message) => {
        if (message) {
          return message?.delete();
        }
      });
    },
  );
});
