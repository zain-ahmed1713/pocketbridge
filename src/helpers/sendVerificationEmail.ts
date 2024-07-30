import { Resend } from 'resend';
import VerificationEmail from "@/components/VerificationEmail";

export default async function sendVerificationEmail(email:string, code: string) {
    try {
        const resend = new Resend(process.env.RESEND_KEY);
        const { data, error } = await resend.emails.send({
          from: 'PocketBridge <onboarding@resend.dev>',
          to: `${email}`,
          subject: 'Verify Your Email',
          react: VerificationEmail({verificationCode: code})
        });
    
        if (error) {
          return Response.json({ error }, { status: 500 });
        }
    
        return Response.json(data);
      } catch (error) {
        return Response.json({ error }, { status: 500 });
      }
}