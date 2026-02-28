import { Probot } from "probot";
import { initTelegramBot, sendNotification } from "./bot.js";
import { Markup } from "telegraf";

export default (app: Probot) => {
  
  initTelegramBot();
  
  const CHAT_ID = process.env.TG_CHAT_ID || "1005164538404";

  app.on("pull_request.opened", async (context) => {
    app.log.info("Received pull request opened event")
    const pr = context.payload.pull_request;
    const repo = context.payload.repository;
    
    if (!pr || !repo) {
        app.log.error("Missing pull request or repository data");
        return;
    }
    
    const message = `🔔 有新的 Pull Request！\n\n` +
      `📦 仓库: ${repo.full_name}\n` +
      `👤 作者: ${pr.user.login}\n` +
      `📝 标题: ${pr.title}\n` +
      `🔗 链接: ${pr.html_url}`;
    
    const buttons = Markup.inlineKeyboard([
      [
        Markup.button.url("查看 PR", pr.html_url),
        Markup.button.url("查看文件", `${pr.html_url}/files`)
      ]
    ]);
    
    app.log.info("Trying to send Telegram notification for new PR")
    await sendNotification(CHAT_ID, message, buttons);
  });

  app.on("push", async (context) => {
    app.log.info("Received push event")

    const { commits, repository, pusher, ref } = context.payload;
    const branch = ref.replace("refs/heads/", "");
    
    if (!commits || !repository || !pusher) {
        app.log.error("Missing push event data");
        return;
    }

    const message = `🚀 有新的提交推送！\n\n` +
      `📦 仓库: ${repository.full_name}\n` +
      `🌿 分支: ${branch}\n` +
      `👤 推送者: ${pusher.name}\n` +
      `📊 提交数: ${commits.length}\n` +
      `💬 最新提交: ${commits[0]?.message || "N/A"}`;
    
    const compareUrl = context.payload.compare;
    const buttons = Markup.inlineKeyboard([
      [
        Markup.button.url("查看提交", compareUrl),
      ]
    ]);
    
    await sendNotification(CHAT_ID, message, buttons);
  });
};