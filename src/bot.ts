import { Telegraf } from "telegraf";

let bot: Telegraf | null = null;

export const initTelegramBot = (): Telegraf | null => {
    if (!process.env.TG_BOT_TOKEN) {
        console.error("TG_BOT_TOKEN is not set");
        return null;
    }
    
    if (!bot) {
        bot = new Telegraf(process.env.TG_BOT_TOKEN, {
            telegram: {
                apiRoot: process.env.TG_BOT_API_URL || "https://api.telegram.org",
            },
        });
        bot.launch();
        console.log("Telegram bot launched");
    }
    
    return bot;
};

export const getTelegramBot = (): Telegraf | null => bot;

export const sendNotification = async (chatId: string, message: string, buttons?: any) => {
    if (!bot) {
        console.error("Bot not initialized");
        return;
    }
    
    // 验证消息不为空
    if (!message || message.trim().length === 0) {
        console.error("Message text is empty");
        return;
    }
    
    try {
        const options = buttons ? { ...buttons, parse_mode: 'HTML' } : { parse_mode: 'HTML' };
        await bot.telegram.sendMessage(chatId, message, options);
    } catch (error) {
        console.error("Failed to send message:", error);
        console.error("Chat ID:", chatId);
        console.error("Message:", message);
    }
};