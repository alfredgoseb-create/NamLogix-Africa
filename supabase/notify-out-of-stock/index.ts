import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  try {
    const { record, old_record } = await req.json()

    // Trigger only if stock level drops to 0
    if (record.stock_level === 0 && old_record.stock_level > 0) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer re_YOUR_RESEND_KEY`, // Replace with your actual key
        },
        body: JSON.stringify({
          from: 'NamLogix Alerts <onboarding@resend.dev>',
          to: ['your-email@gmail.com'], // Replace with your actual email
          subject: `🚨 Stock Alert: ${record.name} is EMPTY`,
          html: `<h3>Inventory Alert</h3><p>The item <b>${record.name}</b> has run out of stock.</p>`,
        }),
      })
    }
    return new Response(JSON.stringify({ message: "Success" }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})