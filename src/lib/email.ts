import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js";

function getGraphClient() {
  const credential = new ClientSecretCredential(
    process.env.MS_TENANT_ID!,
    process.env.MS_CLIENT_ID!,
    process.env.MS_CLIENT_SECRET!
  );
  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: ["https://graph.microsoft.com/.default"],
  });
  return Client.initWithMiddleware({ authProvider });
}

export async function sendCredentialsEmail(to: string, name: string, password: string) {
  const client = getGraphClient();
  const sender = process.env.MS_SENDER_EMAIL!;

  const message = {
    message: {
      subject: "Your FinSensor Connect Login Credentials",
      body: {
        contentType: "HTML",
        content: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f8fc; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <span style="font-size: 28px; font-weight: 900; color: #e97944;">FINSENSOR</span>
              <span style="font-size: 28px; font-weight: 900; color: #283c91;">.AI</span>
            </div>
            <h2 style="color: #1f2937; margin-bottom: 8px;">Welcome, ${name}!</h2>
            <p style="color: #6b7280; margin-bottom: 24px;">
              Your FinSensor Connect profile has been submitted successfully. Here are your login credentials:
            </p>
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 12px; color: #374151;"><strong>Login ID (Email):</strong> ${to}</p>
              <p style="margin: 0; color: #374151;"><strong>Password:</strong> ${password}</p>
            </div>
            <p style="color: #6b7280; margin-bottom: 16px;">
              You can login at <a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://finsensor.ai"}/login" style="color: #2563eb;">finsensor.ai/login</a> to view or update your profile anytime.
            </p>
            <p style="color: #9ca3af; font-size: 13px;">
              If you wish to change your password, login and update it from your profile settings.
            </p>
          </div>
        `,
      },
      toRecipients: [{ emailAddress: { address: to } }],
    },
    saveToSentItems: false,
  };

  await client.api(`/users/${sender}/sendMail`).post(message);
}

export async function sendUpdateEmail(to: string, name: string, subject: string, htmlContent: string) {
  const client = getGraphClient();
  const sender = process.env.MS_SENDER_EMAIL!;

  const message = {
    message: {
      subject,
      body: {
        contentType: "HTML",
        content: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f8fc; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <span style="font-size: 28px; font-weight: 900; color: #e97944;">FINSENSOR</span>
              <span style="font-size: 28px; font-weight: 900; color: #283c91;">.AI</span>
            </div>
            <p style="color: #374151; margin-bottom: 8px;">Dear ${name},</p>
            <div style="color: #374151; line-height: 1.7;">${htmlContent}</div>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />
            <p style="color: #9ca3af; font-size: 12px; text-align: center;">
              This message was sent by FinSensor.AI &nbsp;·&nbsp;
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://finsensor.ai"}" style="color: #6b7280;">finsensor.ai</a>
            </p>
          </div>
        `,
      },
      toRecipients: [{ emailAddress: { address: to } }],
    },
    saveToSentItems: true,
  };

  await client.api(`/users/${sender}/sendMail`).post(message);
}
