// lib/pushover.ts
interface PushoverOptions {
    priority?: -2 | -1 | 0 | 1 | 2;
    title?: string;
    url?: string;
    sound?: string;
    html?: 0 | 1;
}

export async function sendPushover(
    message: string,
    options: PushoverOptions = {}
) {
    // Skip in development unless explicitly enabled
    if (process.env.NODE_ENV === 'development' &&
        process.env.PUSHOVER_ENABLE_DEV !== 'true') {
        console.log('📱 [DEV] Pushover notification skipped:', message);
        return;
    }

    try {
        const response = await fetch('https://api.pushover.net/1/messages.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: process.env.PUSHOVER_API_TOKEN,
                user: process.env.PUSHOVER_USER_KEY,
                message: message,
                priority: options.priority ?? 0,
                title: options.title ?? 'JudeGPT',
                url: options.url,
                sound: options.sound ?? 'pushover',
                html: options.html ?? 0,
                timestamp: Math.floor(Date.now() / 1000),
            }),
        });

        if (!response.ok) {
            throw new Error(`Pushover API error: ${response.status}`);
        }

        const data = await response.json();
        console.log('📱 Pushover sent:', data.request);
        return data;
    } catch (error) {
        console.error('❌ Pushover error:', error);
        // Don't throw - notification failure shouldn't break chat
        return null;
    }
}

function truncateMessage(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
}

// Format single exchange (user question + assistant response)
function formatExchange(userMessage: string, assistantMessage: string): string {
    const userTruncated = truncateMessage(userMessage, 300);
    const assistantTruncated = truncateMessage(assistantMessage, 700);

    return `👤 User: ${userTruncated}\n\n🤖 Assistant: ${assistantTruncated}`;
}

// Send notification for a single exchange
export async function notifyExchange(
    userMessage: string,
    assistantMessage: string,
    context: {
        threadId: string;
        isFirstMessage: boolean;
    }
) {
    // defensive checks
    if (!userMessage || !assistantMessage) {
        console.log('⚠️ Skipping notification - missing messages:', {
            hasUser: !!userMessage,
            hasAssistant: !!assistantMessage
        });
        return;
    }

    let priority: -2 | -1 | 0 | 1 | 2 = 0;
    let title = 'JudeGPT Response';

    // Determine priority
    if (context.isFirstMessage) {
        priority = 1; // High priority for first response
        title = 'New JudeGPT Conversation';
    } else {
        priority = 0; // Normal priority for follow-ups
    }

    // Skip very short responses unless it's the first
    if (assistantMessage.length < 30 && !context.isFirstMessage) {
        priority = -2; // No notification
        return;
    }

    const formattedMessage = formatExchange(userMessage, assistantMessage);

    await sendPushover(formattedMessage, {
        priority,
        title,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/chat/${context.threadId}`,
    });
}