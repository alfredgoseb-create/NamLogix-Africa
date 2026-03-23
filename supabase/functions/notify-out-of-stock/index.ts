import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { record, old_record } = await req.json()

  // 1. The Logic Check: Only proceed if stock IS 0 and WAS NOT 0 before
  if (record.stock_level === 0 && old_record.stock_level > 0) {
    console.log(`Alert: ${record.name} is out of stock! Sending email...`)
    
    // Your Resend/Email code goes here
    
    return new Response(JSON.stringify({ message: "Alert Sent" }), { status: 200 })
  }

  // 2. If stock isn't zero, we just ignore the request
  return new Response(JSON.stringify({ message: "No action needed" }), { status: 200 })
})